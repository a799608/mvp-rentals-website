"""Generates availability.json for the static-serve booking page."""
import os, sys, json
from datetime import date

# Use the shared auth helper
sys.path.insert(0, r"H:/Claude/.claude/scripts")
from mvp_sheets_auth import get_sheets_service, MVP_BOOKINGS_SHEET_ID

OUT_PATH = r"H:/Claude/git/mvp-rentals-website/availability.json"

def parse_date(s):
    if not s or not str(s).strip(): return None
    s = str(s).strip()
    for fmt in ("%m/%d/%Y", "%m/%d/%y", "%Y-%m-%d"):
        try:
            from datetime import datetime
            return datetime.strptime(s, fmt).date()
        except Exception:
            pass
    return None

def main():
    svc = get_sheets_service()
    today = date.today()
    # Read D=property, E=checkin, F=checkout, AU=cancelled (cols 4,5,6,47)
    # Easier: read D:F and AU separately
    res = svc.spreadsheets().values().batchGet(
        spreadsheetId=MVP_BOOKINGS_SHEET_ID,
        ranges=["Sheet1!D5:F", "Sheet1!AU5:AU"],
    ).execute()
    df_rows = res["valueRanges"][0].get("values", [])
    au_rows = res["valueRanges"][1].get("values", [])
    out = {}
    skipped_past = 0
    skipped_cancelled = 0
    invalid = []
    for i, row in enumerate(df_rows):
        while len(row) < 3: row.append("")
        prop = (row[0] or "").strip()
        if not prop: continue
        # AU may be shorter than D:F
        cancelled = (au_rows[i][0] if i < len(au_rows) and au_rows[i] else "")
        if str(cancelled).strip():
            skipped_cancelled += 1
            continue
        ci = parse_date(row[1])
        co = parse_date(row[2])
        if not ci or not co: continue
        if co < today:
            skipped_past += 1
            continue
        if co <= ci:
            invalid.append((i + 5, prop, str(row[1]), str(row[2])))
            continue
        out.setdefault(prop, []).append([ci.isoformat(), co.isoformat()])
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, separators=(",", ":"))
    sz = os.path.getsize(OUT_PATH)
    total = sum(len(v) for v in out.values())
    print(f"[ok] wrote {OUT_PATH} ({sz} bytes) -- {total} future bookings across {len(out)} properties, skipped {skipped_past} past + {skipped_cancelled} cancelled")
    for p, v in sorted(out.items()): print(f"   {p:12s} {len(v)} bookings")
    if invalid:
        print(f"[warn] skipped {len(invalid)} invalid range(s) (checkout <= checkin) -- fix these rows in mvp_bookings:")
        for r in invalid: print(f"   row {r[0]:>4}  {r[1]:12s} checkin={r[2]} checkout={r[3]}")

if __name__ == "__main__":
    main()
