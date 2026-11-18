"""Write prices.json for the booking site from the one price list (Will 2026-10-23).

Source: H:/Claude/airbnb_performance/data/price_ledger.csv -- every night, every house, the Airbnb and VRBO listed
price, rebuilt after every saved price change (platform_pace.record_price). Each night's base direct price is the
HIGHER of the Airbnb and VRBO listed prices (Will 2026-10-23 08:58: "use the highest of the two night rates and then
Airbnb or VRBO that's being charged. And then a 15% reduction from there."); the site takes DISCOUNT % off it.
A night with only one platform price uses that price.

To change the direct discount (Will says the %): edit DISCOUNT below, then run publish_availability.py; the site
uses it about a minute later. Otherwise publish_availability.py runs this every 15-minute cycle and commits
prices.json only when it changes."""
import csv, json, os, sys, datetime as dt

LEDGER = r"H:/Claude/airbnb_performance/data/price_ledger.csv"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prices.json")
SLUG = {"Trails": "trails", "Pound": "pound", "Milton": "milton", "MacCauley": "maccauley", "Wylie": "wylie", "Petrarch": "petrarch"}
CLEANING = {"trails": 180, "pound": 180, "wylie": 180, "milton": 200, "maccauley": 225, "petrarch": 150}   # platform cleaning fees, set 2026-10-14
DISCOUNT = 15   # direct discount % off the higher of the Airbnb / VRBO listed price (Will 2026-10-23)
# Base nightly prices that replace the price list on the site (before DISCOUNT). Halloween 2026 (Will 2026-10-26:
# "modify the prices on our site so they are higher than what we are offering"): past guests are offered $600 all in
# (Trails, Petrarch) and $900 (MacCauley) by text, so the site's weekend total is set above that:
# Trails $650, Petrarch $700, MacCauley $1,000 (2 nights after the 15% + cleaning).
OVERRIDES = {
    "trails": {"2026-10-30": 276, "2026-10-31": 276},
    "petrarch": {"2026-10-30": 324, "2026-10-31": 324},
    "maccauley": {"2026-10-30": 456, "2026-10-31": 455},
}


# Weekly (7+ night) discounts the platforms apply (Will 2026-11-18: "if the platform applys a weekly discount you need
# to do that to the direct pricing too"). Source = the file the platform loaders set them from (change_log.csv
# 2026-11-04 rows): Airbnb one % per listing, all dates; VRBO one % per month, loaded Jan-Sep 2027 only (VRBO weekly
# set to 0% on every date 2026-10-12, so other months stay 0). VRBO holiday ranges were left untouched by that load
# and are not modelled here.
WEEKLY_FILE = r"H:/Claude/pricing_comps/step1/load/weekly_targets.json"
VRBO_WEEKLY_YEAR = "2027"


def load_weekly():
    try:
        w = json.load(open(WEEKLY_FILE, encoding="utf-8"))
        return w.get("airbnb", {}), w.get("vrbo", {})
    except Exception as e:
        print("WARN weekly discounts not loaded (%s); 7+ night stays priced like short stays" % e)
        return {}, {}


def main():
    today = dt.date.today().isoformat()
    abnb_wk, vrbo_wk = load_weekly()
    nights = {s: {} for s in SLUG.values()}
    weekly = {s: {} for s in SLUG.values()}
    with open(LEDGER, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["date"] < today or r["house"] not in SLUG: continue
            h, d = r["house"], r["date"]
            ab = int(float(r["airbnb"])) if r.get("airbnb") not in (None, "") else None
            vr = int(float(r["vrbo"])) if r.get("vrbo") not in (None, "") else None
            listed = [p for p in (ab, vr) if p is not None]
            if not listed: continue
            nights[SLUG[h]][d] = max(listed)   # Will 2026-10-23: higher of Airbnb / VRBO, x 0.85
            # 7+ nights: each platform's price after its weekly discount, then the higher of the two (before DISCOUNT).
            a_pct = float(abnb_wk.get(h, 0) or 0)
            v_pct = float((vrbo_wk.get(h) or {}).get(str(int(d[5:7])), 0) or 0) if d[:4] == VRBO_WEEKLY_YEAR else 0.0
            wk = [p * (1 - pct / 100) for p, pct in ((ab, a_pct), (vr, v_pct)) if p is not None]
            weekly[SLUG[h]][d] = round(max(wk), 2)
    for slug, days in OVERRIDES.items():
        for d, p in days.items():
            if d >= today:
                nights[slug][d] = p
                weekly[slug][d] = p
    data = {"source": "price_ledger.csv: higher of Airbnb / VRBO listed price per night", "discount": DISCOUNT,
            "cleaning": CLEANING, "nights": nights,
            "weekly_min_nights": 7,
            "weekly_source": "weekly_targets.json: higher of Airbnb / VRBO listed price after each platform's 7+ night discount",
            "weekly": weekly}
    new = json.dumps(data, indent=0, sort_keys=True)
    old = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
    if new != old:
        with open(OUT, "w", encoding="utf-8") as f: f.write(new)
    print("prices.json: %s, %d house-nights from %s" % ("updated" if new != old else "unchanged", sum(len(v) for v in nights.values()), today))
    return 0


if __name__ == "__main__":
    sys.exit(main())
