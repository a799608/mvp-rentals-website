"""Write prices.json for the booking site from the one price list (Will 2026-10-23).

Source: H:/Claude/airbnb_performance/data/price_ledger.csv -- every night, every house, the Airbnb and VRBO listed
price, rebuilt after every saved price change (platform_pace.record_price). Each night's base direct price is the
HIGHER of the two listed prices; the site takes DISCOUNT % off that in the browser.

To change the direct discount (Will says the %): edit DISCOUNT below, then run publish_availability.py; the site
uses it about a minute later. Otherwise publish_availability.py runs this every 15-minute cycle and commits
prices.json only when it changes."""
import csv, json, os, sys, datetime as dt

LEDGER = r"H:/Claude/airbnb_performance/data/price_ledger.csv"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prices.json")
SLUG = {"Trails": "trails", "Pound": "pound", "Milton": "milton", "MacCauley": "maccauley", "Wylie": "wylie", "Petrarch": "petrarch"}
CLEANING = {"trails": 180, "pound": 180, "wylie": 180, "milton": 200, "maccauley": 225, "petrarch": 150}   # platform cleaning fees, set 2026-10-14
DISCOUNT = 15   # direct discount % off the higher listed price (Will 2026-10-23)


def main():
    today = dt.date.today().isoformat()
    nights = {s: {} for s in SLUG.values()}
    with open(LEDGER, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["date"] < today or r["house"] not in SLUG: continue
            vals = [int(float(v)) for v in (r.get("airbnb"), r.get("vrbo")) if v not in (None, "")]
            if vals: nights[SLUG[r["house"]]][r["date"]] = max(vals)
    data = {"source": "price_ledger.csv: higher of Airbnb / VRBO listed price per night", "discount": DISCOUNT,
            "cleaning": CLEANING, "nights": nights}
    new = json.dumps(data, indent=0, sort_keys=True)
    old = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
    if new != old:
        with open(OUT, "w", encoding="utf-8") as f: f.write(new)
    print("prices.json: %s, %d house-nights from %s" % ("updated" if new != old else "unchanged", sum(len(v) for v in nights.values()), today))
    return 0


if __name__ == "__main__":
    sys.exit(main())
