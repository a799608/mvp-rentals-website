#!/usr/bin/env python3
"""
Regenerate og-cover.jpg — the link-preview (Open Graph) image for the site.

Captures a 1200x630 screenshot of the LIVE landing page (the branded booking
card over the property collage) and writes it to ../og-cover.jpg in the repo
root, which index.html references as og:image.

Run this whenever the landing page's look changes, then commit og-cover.jpg
AND bump the ?v=N cache-buster on the og:image / twitter:image URLs in
index.html so messaging apps re-fetch.

    python tools/regenerate_og_cover.py
    git add og-cover.jpg && git commit -m "refresh og-cover" && git push

Requires: python -m playwright install chromium
"""
import os
from playwright.sync_api import sync_playwright

URL = "https://a799608.github.io/mvp-rentals-website/"
OUT = os.path.join(os.path.dirname(__file__), "..", "og-cover.jpg")

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1200x630 is the Open Graph recommended size (1.91:1).
    c = b.new_context(viewport={"width": 1200, "height": 630}, device_scale_factor=2)
    pg = c.new_page()
    pg.goto(URL, wait_until="networkidle", timeout=30000)
    pg.wait_for_timeout(1500)
    pg.screenshot(path=os.path.abspath(OUT), full_page=False, type="jpeg", quality=88)
    print("saved", os.path.abspath(OUT))
    b.close()
