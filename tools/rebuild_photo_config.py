"""Point assets/config.js at the site's own photo copies, in Airbnb's order and rooms.

Run AFTER tools/self_host_photos.py, which downloads the photos and writes
tools/photo_manifest.json. Together the two scripts are the whole refresh:

    python tools/self_host_photos.py      # copy today's Airbnb photo tours into <house>/photos/
    python tools/rebuild_photo_config.py  # rewrite photos + photosByRoom in assets/config.js

Never point the site at a0.muscache.com (Airbnb's image server) again: the site
loses every photo if Airbnb blocks outside use, and the photos are then invisible
to Google Images and to AI crawlers. See SESSION_NOTES_2026-09-22_self_hosted_photos.md.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(ROOT, "assets", "config.js")
MANIFEST = os.path.join(ROOT, "tools", "photo_manifest.json")
FALLBACK_COUNT = 8  # the short `photos` list each page uses if photosByRoom is empty


def js(s):
    return json.dumps(s, ensure_ascii=False)


def main():
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    src = open(CONFIG, encoding="utf-8").read()
    report = {}

    for house, v in manifest.items():
        by_id = {e["photo_id"]: e for e in v["photos"]}
        placed, rooms_out = set(), []
        for room in v["rooms"]:
            files = []
            for pid in room["ids"]:
                if pid in by_id and pid not in placed:
                    files.append("/" + by_id[pid]["file"])
                    placed.add(pid)
            if files:
                rooms_out.append((room["title"], files))
        leftover = ["/" + e["file"] for e in v["photos"] if e["photo_id"] not in placed]
        if leftover:
            for i, (title, files) in enumerate(rooms_out):
                if title == "Additional photos":
                    rooms_out[i] = (title, files + leftover)
                    break
            else:
                rooms_out.append(("Additional photos", leftover))

        photos_txt = "      photos: [\n" + ",\n".join(
            "      " + js("/" + e["file"]) for e in v["photos"][:FALLBACK_COUNT]) + "\n      ],\n"
        pbr_txt = "      photosByRoom: {\n" + ",\n".join(
            "        " + js(title) + ": [\n" + ",\n".join("          " + js(u) for u in files) + "\n        ]"
            for title, files in rooms_out) + "\n      },\n"

        start = src.index(f'slug: "{house}"')
        ps = src.index("      photos: [", start)
        pe = src.index("      ],\n", ps) + len("      ],\n")
        src = src[:ps] + photos_txt + src[pe:]
        bs = src.index("      photosByRoom: {", start)
        be = src.index("      platformUrls:", bs)
        assert src[bs:be].rstrip().endswith("},"), f"unexpected shape around photosByRoom for {house}"
        src = src[:bs] + pbr_txt + src[be:]
        report[house] = {"rooms": len(rooms_out), "photos": sum(len(f) for _, f in rooms_out)}

    if "muscache" in src:
        print("REFUSED: config.js still contains Airbnb image addresses", file=sys.stderr)
        return 1
    open(CONFIG, "w", encoding="utf-8", newline="\n").write(src)
    for house, r in report.items():
        print(f"{house}: {r['photos']} photos in {r['rooms']} rooms")
    print("assets/config.js rewritten, 0 Airbnb image addresses")
    print("Now check every page before deploying: serve the site locally and confirm each room's photos load.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
