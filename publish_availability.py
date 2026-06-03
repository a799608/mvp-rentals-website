"""Auto-publish availability.json to the live booking site.

Wired as the LAST step of the 15-minute MVP refresh (mvp_gmail_refresh.bat ->
task_runner.py). Each cycle it regenerates availability.json from the live
mvp_bookings sheet and commits + pushes ONLY that file -- but only when its
content actually changed (git itself is the diff, so no commit spam).

Design guarantees:
  * Commits ONLY availability.json (never `git add -A`) so it can never sweep
    up unrelated working-tree edits.
  * No change -> no commit, no push (most 15-min cycles add zero bookings).
  * Never fails the parent pipeline: returns 0 even on git/push errors, so a
    transient GitHub hiccup cannot flip the booking task to "failed". A locally
    committed-but-unpushed change simply retries on the next cycle.

Auth: update_availability.py reads mvp_bookings via mvp_sheets_auth (read-only,
spreadsheets scope, same sheet ID as the rest of the pipeline). No OAuth change.
"""
import os
import sys
import subprocess
import datetime

REPO = os.path.dirname(os.path.abspath(__file__))


def log(msg):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # stdout is captured into Data/.logs/mvp-gmail-refresh.log by task_runner.py
    print("[publish_availability %s] %s" % (ts, msg))


def git(args, check=True):
    return subprocess.run(["git", "-C", REPO] + args,
                          capture_output=True, text=True, check=check)


def main():
    # 1. Sync with remote first so we never diverge from manual pushes.
    try:
        git(["pull", "--rebase", "--quiet", "origin", "master"])
    except subprocess.CalledProcessError as e:
        log("WARN pull --rebase failed (continuing): %s" % (e.stderr or "").strip())

    # 2. Regenerate availability.json from live mvp_bookings.
    gen = subprocess.run([sys.executable, os.path.join(REPO, "update_availability.py")],
                         capture_output=True, text=True)
    if gen.returncode != 0:
        log("WARN update_availability.py failed; skipping publish: %s" % (gen.stderr or "").strip()[:500])
        return 0
    summary = (gen.stdout.strip().splitlines() or ["(no output)"])[0]
    log("regenerated -- %s" % summary)

    # 3. Stage ONLY availability.json (explicit path, never -A).
    try:
        git(["add", "availability.json"])
    except subprocess.CalledProcessError as e:
        log("WARN git add failed: %s" % (e.stderr or "").strip())
        return 0

    # 4. Gate: only commit/push when the file actually changed vs HEAD.
    diff = git(["diff", "--cached", "--quiet", "availability.json"], check=False)
    if diff.returncode == 0:
        log("no change -- nothing to publish")
        return 0

    # 5. Commit (only availability.json) + push. Never fail the parent.
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        git(["commit", "-m", "auto: refresh availability.json %s" % ts, "--", "availability.json"])
    except subprocess.CalledProcessError as e:
        log("WARN commit failed: %s" % (e.stderr or "").strip())
        return 0
    try:
        git(["push", "origin", "master"])
        log("published -- pushed availability.json to origin/master")
    except subprocess.CalledProcessError as e:
        log("WARN push failed (committed locally, retries next cycle): %s" % (e.stderr or "").strip())
    return 0


if __name__ == "__main__":
    sys.exit(main())
