"""Copy every photo in each house's Airbnb photo tour onto the site, and find repeated pictures.

Reads the public listing page, takes the photo tour in Airbnb's order and room grouping,
saves each photo to <house>/photos/, and writes tools/photo_manifest.json.
"""
import concurrent.futures as cf
import hashlib
import io
import json
import os
import re
import sys
import time

import requests
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOUSES = {
    "trails": "1273155947919003993",
    "wylie": "16612729",
    "pound": "40229320",
    "maccauley": "776227061200723382",
    "milton": "15973534",
    "petrarch": "1100977895146044046",
}
WIDTH = 1440
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9"}
UUID = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", re.I)


def find_tour(o):
    if isinstance(o, dict):
        if o.get("sectionComponentType") == "PHOTO_TOUR_SCROLLABLE" and o.get("section"):
            return o["section"]
        for v in o.values():
            r = find_tour(v)
            if r:
                return r
    elif isinstance(o, list):
        for v in o:
            r = find_tour(v)
            if r:
                return r
    return None


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def read_tour(listing_id):
    html = requests.get(f"https://www.airbnb.com/rooms/{listing_id}", headers=UA, timeout=40).text
    m = re.search(r'<script id="data-deferred-state-0"[^>]*>(.*?)</script>', html, re.S)
    if not m:
        raise RuntimeError("photo tour data not found on page")
    sec = find_tour(json.loads(m.group(1)))
    media = {str(x["id"]): {"url": x["baseUrl"], "label": x.get("accessibilityLabel"),
                           "caption": (x.get("imageMetadata") or {}).get("caption")} for x in sec["mediaItems"]}
    order = [str(x["id"]) for x in sec["mediaItems"]]
    rooms = []
    for layout in sec.get("roomTourLayoutInfos") or []:
        for item in layout.get("roomTourItems") or []:
            rooms.append({"title": item["title"], "ids": [str(i) for i in item.get("imageIds") or []]})
    return order, media, rooms


def dhash(img, size=8):
    g = img.convert("L").resize((size + 1, size), Image.LANCZOS)
    px = list(g.getdata())
    bits = 0
    for r in range(size):
        for c in range(size):
            bits = (bits << 1) | (px[r * (size + 1) + c] > px[r * (size + 1) + c + 1])
    return bits


def fetch(job):
    url, dest = job
    for attempt in range(3):
        try:
            r = requests.get(f"{url}?im_w={WIDTH}", headers=UA, timeout=60)
            r.raise_for_status()
            data = r.content
            img = Image.open(io.BytesIO(data))
            img.load()
            if img.format != "JPEG":
                buf = io.BytesIO()
                img.convert("RGB").save(buf, "JPEG", quality=85, optimize=True)
                data = buf.getvalue()
                img = Image.open(io.BytesIO(data))
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as fh:
                fh.write(data)
            return {"ok": True, "bytes": len(data), "w": img.width, "h": img.height,
                    "sha256": hashlib.sha256(data).hexdigest(), "dhash": dhash(img)}
        except Exception as e:
            err = str(e)
            time.sleep(2 * (attempt + 1))
    return {"ok": False, "error": err}


def main():
    manifest = {}
    jobs = []
    for house, lid in HOUSES.items():
        order, media, rooms = read_tour(lid)
        seen = set()
        entries = []
        n = 0
        room_of = {}
        for r in rooms:
            for pid in r["ids"]:
                room_of.setdefault(pid, r["title"])
        for pid in order:
            if pid in seen:
                continue
            seen.add(pid)
            n += 1
            room = room_of.get(pid, "Additional photos")
            fname = f"{n:03d}-{slug(room)}.jpg"
            e = {"n": n, "photo_id": pid, "room": room, "file": f"{house}/photos/{fname}",
                 "airbnb_url": media[pid]["url"], "uuid": (UUID.search(media[pid]["url"]) or [None])[0],
                 "label": media[pid]["label"], "caption": media[pid]["caption"]}
            entries.append(e)
            jobs.append((e, os.path.join(ROOT, house, "photos", fname)))
        manifest[house] = {"listing_id": lid, "tour_count": len(order), "rooms": rooms, "photos": entries}
        print(f"{house}: {len(order)} in tour, {len(entries)} distinct, {len(rooms)} rooms", flush=True)

    t0 = time.time()
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(fetch, (e["airbnb_url"], dest)): e for e, dest in jobs}
        done = 0
        for f in cf.as_completed(futs):
            futs[f].update(f.result())
            done += 1
            if done % 50 == 0:
                print(f"  copied {done}/{len(jobs)} in {time.time() - t0:.0f}s", flush=True)

    with open(os.path.join(ROOT, "tools", "photo_manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1)
    bad = [e for h in manifest.values() for e in h["photos"] if not e.get("ok")]
    total = sum(len(h["photos"]) for h in manifest.values())
    mb = sum(e.get("bytes", 0) for h in manifest.values() for e in h["photos"]) / 1e6
    print(f"DONE copied {total - len(bad)}/{total} photos, {mb:.1f} MB, failures {len(bad)}")
    for e in bad:
        print("  FAILED", e["file"], e.get("error"))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
