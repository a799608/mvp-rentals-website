"""Write prices.json for the booking site from the one price list (Will 2026-10-23).

Source: H:/Claude/airbnb_performance/data/price_ledger.csv -- every night, every house, the Airbnb and VRBO listed
price, rebuilt after every saved price change (platform_pace.record_price). Each night's base direct price is the
AIRBNB listed price (Will 2026-10-23: 'MVP is 15% less than Airbnb'); the site takes DISCOUNT % off it.

To change the direct discount (Will says the %): edit DISCOUNT below, then run publish_availability.py; the site
uses it about a minute later. Otherwise publish_availability.py runs this every 15-minute cycle and commits
prices.json only when it changes."""
import csv, json, os, sys, datetime as dt

LEDGER = r"H:/Claude/airbnb_performance/data/price_ledger.csv"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prices.json")
SLUG = {"Trails": "trails", "Pound": "pound", "Milton": "milton", "MacCauley": "maccauley", "Wylie": "wylie", "Petrarch": "petrarch"}
CLEANING = {"trails": 180, "pound": 180, "wylie": 180, "milton": 200, "maccauley": 225, "petrarch": 150}   # platform cleaning fees, set 2026-10-14
DISCOUNT = 15   # direct discount % off the Airbnb listed price (Will 2026-10-23)
# Base nightly prices that replace the price list on the site (before DISCOUNT). Halloween 2026 (Will 2026-10-26:
# "modify the prices on our site so they are higher than what we are offering"): past guests are offered $600 all in
# (Trails, Petrarch) and $900 (MacCauley) by text, so the site's weekend total is set above that:
# Trails $650, Petrarch $700, MacCauley $1,000 (2 nights after the 15% + cleaning).
OVERRIDES = {
    "trails": {"2026-10-30": 276, "2026-10-31": 276},
    "petrarch": {"2026-10-30": 324, "2026-10-31": 324},
    "maccauley": {"2026-10-30": 456, "2026-10-31": 455},
}


def main():
    today = dt.date.today().isoformat()
    nights = {s: {} for s in SLUG.values()}
    with open(LEDGER, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["date"] < today or r["house"] not in SLUG: continue
            if r.get("airbnb") not in (None, ""): nights[SLUG[r["house"]]][r["date"]] = int(float(r["airbnb"]))   # Will 2026-10-23: Airbnb rate x 0.85
    for slug, days in OVERRIDES.items():
        for d, p in days.items():
            if d >= today:
                nights[slug][d] = p
    data = {"source": "price_ledger.csv: Airbnb listed price per night", "discount": DISCOUNT,
            "cleaning": CLEANING, "nights": nights}
    new = json.dumps(data, indent=0, sort_keys=True)
    old = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
    if new != old:
        with open(OUT, "w", encoding="utf-8") as f: f.write(new)
    print("prices.json: %s, %d house-nights from %s" % ("updated" if new != old else "unchanged", sum(len(v) for v in nights.values()), today))
    return 0


if __name__ == "__main__":
    sys.exit(main())
