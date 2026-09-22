# 2026-09-22 — House photos moved onto this site, off Airbnb's image server

## What changed

Every house photo on poconomvp.com is now a file in this repository, under `<house>/photos/`.
Before this, all 514 photo addresses in `assets/config.js` pointed at `a0.muscache.com`,
Airbnb's image server, so a direct-booking site depended on Airbnb to show its own houses.

- Commit: `Host all house photos on the site; remove Airbnb image dependency`, merged to master 2026-09-22.
- 471 photos, 116 MB, copied from the six public Airbnb photo tours at 1440 px wide.
- Each house page shows the same photos as that house's Airbnb photo tour, in Airbnb's order and room grouping.
- Airbnb image addresses left in `assets/config.js`: 0.

## How it got that way

| Date | Commit | What happened |
|---|---|---|
| 2026-04-27 | 279470a | The six house pages were filled from the Airbnb and VRBO listings, photos included |
| 2026-04-28 morning | 07aee5a | 48 photos, 8 per house, were saved into the repository as files |
| 2026-04-28 14:42 | cddef47 | Those files were deleted and the pages pointed at Airbnb's image server, reason given: "always-current, no drift" |
| 2026-05-10 | ae3519c, 5cd4011 | More Airbnb addresses added, reaching 514 |
| 2026-09-22 | this change | Photos hosted here again, Airbnb dependency removed |

No record of Will approving the 2026-04-28 switch exists. Session logs from April are not on
either drive, the oldest kept log is 2026-08-07, and the backup of the old C: drive Claude folder
named in the 2026-07-16 cleanup note is not at that path. Will stated he did not approve it.

## How to refresh after photos change on Airbnb

```
python tools/self_host_photos.py      # copies today's Airbnb photo tours into <house>/photos/
python tools/rebuild_photo_config.py  # rewrites photos + photosByRoom in assets/config.js
```

Then serve the repository locally and load all six house pages before deploying. `rebuild_photo_config.py`
refuses to write if any Airbnb image address remains.

`tools/photo_manifest.json` records, per photo: position in the tour, Airbnb photo id, room,
local file, original Airbnb address, size, and an image fingerprint.

## What was verified before and after go-live

- All six pages, locally and then on poconomvp.com: every photo file returns an image, room count
  and order match the Airbnb tour, and no request goes to Airbnb.
- Clicked through a room's arrows by hand on MacCauley; each photo came from this site.
- Every room's first photo draws within about three seconds on the live site.
- `availability.json` and the booking form are untouched and still work.

## Photo counts, 2026-09-22

| House | Photos on Airbnb | Rooms | Pictures unique to this house |
|---|---|---|---|
| MacCauley | 114 | 16 | 82 |
| Milton | 96 | 13 | 61 |
| Trails | 74 | 11 | 43 |
| Pound | 66 | 12 | 35 |
| Petrarch | 65 | 9 | 36 |
| Wylie | 56 | 12 | 24 |

The six listings hold 471 photos but only 318 different pictures: 37 area and community pictures
are on several listings at once, and 4 pictures repeat inside one house. A picture sheet of every
repeat is at `H:\Claude\mvp-keyword-research\2026-09-21_visibility_research\repeated_pictures_2026-09-22.jpg`.

## Rule

The website must never depend on Airbnb or VRBO to serve its own content. The site exists to take
direct bookings.
