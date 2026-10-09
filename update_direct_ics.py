"""Direct-booking calendar files for VRBO and Airbnb to import (built 2026-10-09 after the MacCauley double
booking: a website booking never reached the platform calendars).

For each of the six houses, writes ical/direct_<house>.ics holding every live Direct reservation on
mvp_bookings Sheet1 (platform starts with DIRECT, not cancelled, checkout today or later) as an all-day
busy block. SUMMARY is "Not available" -- never a guest name, never a note about a moved reservation.
Published by publish_availability.py on the 15-minute chain; each VRBO listing imports its file under
Calendar -> Settings -> Availability -> Calendar sync (one-time setup), and Airbnb receives the block
through its existing VRBO import. Output is deterministic so an unchanged calendar makes no commit."""
import os, sys
from datetime import date, datetime
sys.path.insert(0, r"H:/Claude/.claude/scripts")
from mvp_sheets_auth import get_sheets_service, MVP_BOOKINGS_SHEET_ID

REPO = r"H:/Claude/git/mvp-rentals-website"
OUT_DIR = os.path.join(REPO, "ical")
HOUSES = ["trails", "pound", "milton", "maccauley", "wylie", "petrarch"]

def parse_date(s):
    s = (s or "").strip()
    for fmt in ("%m/%d/%Y", "%m/%d/%y", "%Y-%m-%d"):
        try: return datetime.strptime(s, fmt).date()
        except Exception: pass
    return None

def ics(house, events):
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//MVP Rentals//direct bookings//EN", "CALSCALE:GREGORIAN",
             "METHOD:PUBLISH", f"X-WR-CALNAME:MVP direct bookings - {house}"]
    for rid, ci, co in sorted(events, key=lambda e: e[1]):
        lines += ["BEGIN:VEVENT", f"UID:{rid.lower().replace(' ', '')}@mvprentals.direct",
                  f"DTSTAMP:{ci.strftime('%Y%m%d')}T000000Z",
                  f"DTSTART;VALUE=DATE:{ci.strftime('%Y%m%d')}", f"DTEND;VALUE=DATE:{co.strftime('%Y%m%d')}",
                  "SUMMARY:Not available", "TRANSP:OPAQUE", "END:VEVENT"]
    lines.append("END:VCALENDAR")
    return "\r\n".join(lines) + "\r\n"

def main():
    svc = get_sheets_service()
    today = date.today()
    res = svc.spreadsheets().values().batchGet(spreadsheetId=MVP_BOOKINGS_SHEET_ID,
                                               ranges=["Sheet1!B5:F", "Sheet1!AU5:AU"]).execute()
    rows = res["valueRanges"][0].get("values", []); au = res["valueRanges"][1].get("values", [])
    by = {h: [] for h in HOUSES}; skipped = 0
    for i, r in enumerate(rows):
        while len(r) < 5: r.append("")
        platform, rid, prop, ci, co = (x.strip() for x in r[:5])
        if not platform.upper().startswith("DIRECT"): continue
        if i < len(au) and au[i] and str(au[i][0]).strip(): continue
        ci, co = parse_date(ci), parse_date(co)
        if not ci or not co or co <= ci or co < today: continue
        key = prop.lower().replace(" ", "")
        if key not in by: skipped += 1; print(f"[warn] unknown house '{prop}' on {rid}"); continue
        by[key].append((rid, ci, co))
    os.makedirs(OUT_DIR, exist_ok=True)
    for h in HOUSES:
        p = os.path.join(OUT_DIR, f"direct_{h}.ics")
        body = ics(h, by[h])
        old = open(p, encoding="utf-8").read() if os.path.exists(p) else None
        if old != body:
            with open(p, "w", encoding="utf-8", newline="") as f: f.write(body)
    total = sum(len(v) for v in by.values())
    print(f"[ok] ical/: {total} live direct bookings -> " + ", ".join(f"{h} {len(by[h])}" for h in HOUSES))
    return 0

if __name__ == "__main__":
    sys.exit(main())
