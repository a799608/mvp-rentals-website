# -*- coding: utf-8 -*-
"""Bake per-property content from assets/config.js into static HTML.

Why: the property pages were JS-only shells — crawlers (and ALL AI crawlers,
which never execute JS) saw "Loading…" instead of content. This script writes
the title tag, meta description, hero (h1 + tagline), About section, and
amenity list directly into each <slug>/index.html, and guards the page's
inline JS so it doesn't duplicate what is already baked. Idempotent: safe to
re-run after any config.js text change.

Run: python tools/bake_static.py   (from repo root or tools/)
"""
import io
import json
import os
import re
import subprocess
import sys
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TITLES = {
    "trails":    "Trails — Secluded Pocono Cottage, Pet Friendly, Sleeps 10 | MVP Rentals",
    "wylie":     "Wylie — Rustic Pocono Cabin, Fenced Yard, Pet Friendly, Sleeps 10 | MVP Rentals",
    "pound":     "Pound — Cozy Pocono Cottage, Fenced Yard, Pet Friendly, Sleeps 8 | MVP Rentals",
    "milton":    "Milton — Pocono Family Retreat, Game Rooms, Fenced Yard, Sleeps 10 | MVP Rentals",
    "maccauley": "MacCauley — Pocono Retreat with Arcade, Theater & Game Rooms, Sleeps 12 | MVP Rentals",
    "petrarch":  "Petrarch — Mountain-Modern Couples Retreat, Poconos, Pet Friendly | MVP Rentals",
}
METAS = {
    "trails":    "Secluded pet-friendly Pocono cottage 10 min from Jim Thorpe — pool & beach access, sleeps 10. Book direct with the owner, no service fees.",
    "wylie":     "Rustic Pocono cabin in Albrightsville with fully fenced yard, lake & beach access. Sleeps 10, pet friendly. Book direct — no service fees.",
    "pound":     "Cozy Albrightsville cottage with fenced yard, pool & beach access. Sleeps 8, pet friendly, near Jim Thorpe. Book direct — no service fees.",
    "milton":    "Pocono family retreat with game rooms and fully fenced backyard. Sleeps 10, pet friendly, near Jim Thorpe & ski slopes. Book direct, no fees.",
    "maccauley": "Premier Pocono group retreat — arcade, theater room, 2 game rooms, fenced backyard. Sleeps 12. Book direct with the owner, no service fees.",
    "petrarch":  "Mountain-modern Pocono retreat for couples — pet friendly, fenced yard, lake & beach access. Sleeps 6. Book direct — no service fees.",
}
LANDING_TITLE = "MVP Rentals — Pocono Vacation Homes, Book Direct, No Service Fees"
LANDING_META = "Six Pocono vacation homes — fenced yards, pet friendly, book direct with the owner, no service fees. Pick your dates and see which homes are open."


def load_config():
    out = subprocess.check_output(
        ["node", "-e",
         "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));"
         "console.log(JSON.stringify(window.SITE_CONFIG.properties))",
         os.path.join(ROOT, "assets", "config.js")],
        text=True, encoding="utf-8")
    return {p["slug"]: p for p in json.loads(out)}


def amenity_li(item):
    m = re.match(r"^(.*?)\s*\((.+)\)\s*$", item)
    if m:
        return ('<li><span>%s</span><span class="amenity-note"> (%s)</span></li>'
                % (escape(m.group(1)), escape(m.group(2))))
    return "<li>%s</li>" % escape(item)


def amenities_html(included):
    if isinstance(included, list):  # backward compat, same as booking JS
        included = {"home": included}
    parts = []
    for label, key in (("Community", "community"), ("Home", "home")):
        items = included.get(key) or []
        if items:
            parts.append('<li class="included-section">%s</li>' % label)
            parts.extend(amenity_li(i) for i in items)
    return "\n".join(parts)


def sub_once(pattern, repl, text, name, page):
    new, n = re.subn(pattern, repl, text, count=1, flags=re.S)
    if n != 1:
        sys.exit("FAIL %s: pattern not found: %s" % (page, name))
    return new


def bake_property(slug, prop):
    path = os.path.join(ROOT, slug, "index.html")
    h = io.open(path, encoding="utf-8").read()

    tagline = prop.get("tagline") or prop.get("address") or ""
    if tagline.startswith("@"):
        tagline = prop.get("address") or ""

    h = sub_once(r"<title>.*?</title>",
                 "<title>%s</title>" % escape(TITLES[slug]), h, "title", slug)

    meta = '<meta name="description" content="%s">' % escape(METAS[slug], quote=True)
    if re.search(r'<meta name="description"', h):
        h = sub_once(r'<meta name="description"[^>]*>', meta, h, "meta swap", slug)
    else:
        h = sub_once(r'(<meta name="viewport"[^>]*>)', r"\1\n" + meta, h, "meta insert", slug)

    hero = ('<section class="hero" id="hero" style="background-image:url(\'%s\')">'
            '<div class="hero-overlay"><h1>%s</h1>'
            '<div class="tagline">%s</div></div></section>'
            % (prop["heroPhoto"], escape(prop["name"]), escape(tagline)))
    h = sub_once(r'<section class="hero" id="hero"[^>]*>.*?</section>', hero, h, "hero", slug)

    h = sub_once(r'<h2 id="hero-h2">.*?</h2>',
                 '<h2 id="hero-h2">About %s</h2>' % escape(prop["name"]), h, "hero-h2", slug)
    h = sub_once(r'<p id="prop-desc" class="lede">.*?</p>',
                 '<p id="prop-desc" class="lede">%s</p>' % escape(prop["description"]),
                 h, "prop-desc", slug)
    h = sub_once(r'<ul id="prop-included" class="included-list">.*?</ul>',
                 '<ul id="prop-included" class="included-list">\n%s\n</ul>'
                 % amenities_html(prop.get("included") or {}),
                 h, "prop-included", slug)

    # --- JS guards: baked content must not be duplicated or overwritten ---
    h = h.replace('  document.title = prop.name + " — MVP Rentals";\n', "")
    h = h.replace("hero.appendChild(overlay);",
                  'if (!hero.querySelector(".hero-overlay")) hero.appendChild(overlay);')
    h = h.replace('  __renderSection("Community", __inc.community);\n'
                  '  __renderSection("Home", __inc.home);',
                  '  if (!includedEl.children.length) {\n'
                  '    __renderSection("Community", __inc.community);\n'
                  '    __renderSection("Home", __inc.home);\n'
                  '  }')

    io.open(path, "w", encoding="utf-8", newline="").write(h)
    print("baked %-10s title+meta+hero+about+amenities" % slug)


def bake_landing():
    path = os.path.join(ROOT, "index.html")
    h = io.open(path, encoding="utf-8").read()
    h = sub_once(r"<title>.*?</title>",
                 "<title>%s</title>" % escape(LANDING_TITLE), h, "title", "landing")
    h = sub_once(r'<meta name="description"[^>]*>',
                 '<meta name="description" content="%s">' % escape(LANDING_META, quote=True),
                 h, "meta", "landing")
    io.open(path, "w", encoding="utf-8", newline="").write(h)
    print("baked landing    title+meta")


def main():
    props = load_config()
    for slug in TITLES:
        bake_property(slug, props[slug])
    bake_landing()
    print("done")


if __name__ == "__main__":
    main()
