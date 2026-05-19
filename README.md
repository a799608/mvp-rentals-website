# MVP Rentals ??? Direct-Booking Website

Live: https://a799608.github.io/mvp-rentals-website/

Static site (HTML/CSS/vanilla JS) + Google Apps Script backend. Hosted on
GitHub Pages. Property data, rates, and payment handles all live in
`assets/config.js` ??? edit that file to update content.

## What's here

```
index.html                          Landing page + 6-property grid
privacy.html                        Privacy Policy (TCR-compliant)
terms.html                          Terms of Service (TCR-compliant)
booking-request-received.html       Confirmation page after form submit
trails/index.html                   Per-property page (one per slug)
wylie/index.html
pound/index.html
maccauley/index.html
milton/index.html
petrarch/index.html
assets/
  config.js                         Property data, rates, payment-method flags
  style.css                         Shared stylesheet (design tokens at top)
  calendar.js                       Live-availability month-grid widget
  booking.js                        Form submission + total calculation
_gas/                               Google Apps Script project (clasp)
  Code.gs                           availability GET + booking-request POST
  appsscript.json                   manifest (web app config + OAuth scopes)
  .clasp.json                       links to the script project
```

## How a booking happens

1. Guest opens a property page.
2. JS in `calendar.js` calls the GAS GET endpoint for `availability` data.
3. Booked dates are greyed; weekday/weekend prices show on each open cell.
4. Guest picks check-in + check-out, fills in the form, submits.
5. JS POSTs the request to the GAS endpoint.
6. GAS appends a row to the **Booking Requests** tab on the `mvp_bookings`
   sheet and emails Will at wm.m.morris@gmail.com.
7. Guest sees the confirmation page.
8. Will replies and arranges payment (Venmo / Zelle for v1).

## Placeholders to fill in

Open `assets/config.js` and search for `@` to find every placeholder. They are
tagged like `@TRAILS_WEEKDAY_RATE_HERE`. Categories:

### Per-property (??6: Trails, Wylie, Pound, MacCauley, Milton, Petrarch)
- `@<NAME>_TAGLINE_HERE` ??? short subtitle under the property name
- `@<NAME>_MAX_GUESTS_HERE`, `@<NAME>_BEDROOMS_HERE`, `@<NAME>_BATHROOMS_HERE`
- `@<NAME>_DESCRIPTION_HERE` ??? about 80 words
- `@<NAME>_WEEKDAY_RATE_HERE` ??? number, e.g. 295
- `@<NAME>_WEEKEND_RATE_HERE` ??? number, e.g. 365
- `@<NAME>_CLEANING_FEE_HERE` ??? number, e.g. 150
- `@<NAME>_PET_FEE_HERE` ??? number; pet fee structure controlled by `petFeeType`
  (`per-stay` default, or `per-pet`, or `per-night`)

### Payments
- `@VENMO_HANDLE_HERE` ??? e.g. `@properties-bymorris` (your @handle exactly)
- `@ZELLE_EMAIL_OR_PHONE_HERE` ??? the email or phone Zelle is registered to

The Venmo + Zelle blocks are live (`enabled: true`). PayPal, Stripe, Apple Pay,
Google Pay, and ACH are scaffolded with `enabled: false` ??? flip them on later.

## Updating rates / handles / copy

1. Edit `assets/config.js`.
2. Commit + push to master. GitHub Pages redeploys in 30-60 seconds.
3. Hard-refresh the live page to see the change.

No build step. No framework. No deploy pipeline.

## How availability stays in sync

The GAS GET endpoint reads `mvp_bookings` Sheet1 (the same sheet your daily-ops
pipeline writes to). Active reservations = rows where Property (col D) is
non-blank AND Cancelled Date (col AU) is blank. So the calendar is always in
sync with whatever the existing pipeline is doing ??? no separate iCal,
no manual block-out, nothing to remember.

## GAS endpoint URL

Both GET (availability) and POST (booking-request) live on the same web app:

```
https://script.google.com/macros/s/AKfycbxSb0ZFe_XbDMviK9BKrXz64gBbv7WE3oylP4LyVjZ1MpOcy5Z8sdkhe_t7BGrKxDt6qQ/exec
```

If that URL ever rotates (re-deploy creates a new versioned URL), update both
`endpoints.availability` and `endpoints.submitBooking` in `assets/config.js`.

## Updating GAS code

```bash
cd _gas
clasp push      # uploads Code.gs + appsscript.json to the script project
clasp deploy    # creates a new versioned web-app URL (the old @1 keeps working)
```

For most code changes you can just `clasp push` without re-deploying ??? the
existing deployment uses HEAD when set up that way, but the safest pattern is
to deploy a new version and update the URL in `config.js`.

## Brand / legal

MVP Rentals is a doing-business-as name of Proper TTs LLC (Pennsylvania,
EIN 39-4982848). 502 W 7th St Ste 100, Erie, PA 16502.

Privacy and Terms include the TCR-required SMS consent language used to clear
the Twilio A2P 10DLC campaign.

## Roadmap / TODO

- [ ] **Cycle property photos on cards** ??? only `hero.jpg` exists per property right now. To enable rotating photos on the landing-page tiles and the `available.html` cards, drop additional images into the `mvp-guest-guides` repo at `<slug>/photo1.jpg`, `<slug>/photo2.jpg`, etc. Then update `assets/config.js` (add a `gallery: []` array per property) and the cycling JS (cross-fade every 4-5s) on both `index.html` and `available.html`.

## Rate methodology (v1.1+)

All six properties use Airbnb Smart Pricing (no fixed weekday/weekend rate). For the website:
- `weekday` rate = Smart Pricing floor (lowest configured rate)
- `weekend` rate = floor + $50 (a placeholder uplift)
- `cleaningFee` and `petFee` = verified from the VRBO host fees-settings page

The `smartPricingNote` field on each property holds the disclaimer the property page can show: "From $X/night via Smart Pricing ??? final rate confirmed when we reply." Edit `assets/config.js` to swap in fixed rates whenever you want.

## Downstream: where the booking request goes after submission (2026-05-19)

The `Booking Requests` tab on `mvp_bookings` (written by `_gas/Code.gs` doPost above) is now the entry point for an end-to-end reservation pipeline. The lifecycle dashboard, the GV gateway webhook, and the guest-facing payment-request page are all hooked into it.

### End-to-end flow

```
[Guest on per-property page]
   ? fills in dates, name, email/phone, party, pets, message, clicks Start Your Trip
   ? POST to GAS doPost endpoint (this repo's _gas/Code.gs)
   ? row appended to mvp_bookings spreadsheet, "Booking Requests" tab
   ? email sent to wm.m.morris@gmail.com
   ? guest sees booking-request-received.html confirmation page

[Will on Reservation Lifecycle dashboard]
   ? "PENDING REQUEST" card appears at top of 30 Days Upcoming column
   ? click card ? review modal opens with all fields editable
   ? Will edits as needed, picks 1- or 2-payment plan, clicks Approve & Send
   ?
[Modal Approve handler]
   ? builds payment URL pointing to /payment-request.html on this repo with
   ?   reservation params as query string
   ? builds SMS body: "Hi {first}, your {prop} reservation {ci}-{co} is
   ?   approved! ${pay1} due now. Pay here: <url> -- Will, MVP Rentals"
   ? POST http://127.0.0.1:8765/send-direct-booking-approval
   ?   (existing GV gateway webhook in MVP Rentals repo, Data/mvp_sms_webhook.py)
   ? guest receives SMS on their phone
   ? server-side function writes Status="Approved" + timestamp + edited values
   ?   back to the Booking Requests row (cols B-L, P-U)

[Guest on phone]
   ? taps SMS link
   ? opens /payment-request.html?resid=...&prop=...&total=... (this repo)
   ? sees reservation summary + 3 pay buttons (Venmo / Zelle / check)
   ? taps Pay with Venmo
   ? Venmo opens (mobile app via Universal Links on venmo.com domain,
     OR browser sign-in on desktop)
   ? guest confirms payment in Venmo, money lands in Will's account

[Not yet built]
   ? Will marks the row paid (manual click in Lifecycle, TODO)
   ? row promoted to mvp_bookings Sheet1 as Direct-NN (TODO)
   ? enters normal lifecycle classification (30 Days Upcoming, TTPOA, etc.)
```

### Sister documentation
- **`mvp-kanban-lifecycle` README** ? modal layout, Approve handler internals, Sheet column writes, known bugs
- **`mvp-rentals` repo** `Data/mvp_sms_webhook.py` ? `/send-direct-booking-approval` endpoint (added 2026-05-19)
- **`Data/GV_GATEWAY_README.md`** in the mvp-rentals repo ? overall GV gateway architecture (port 9333 Chrome, port 8765 Flask webhook, send-via-GV path)

### What this repo owns
- The guest-facing booking-request form (per-property pages + landing page)
- The GAS doPost that lands rows in the `Booking Requests` tab and emails Will
- The new `payment-request.html` page that the guest lands on after Will approves
- The `booking-request-received.html` confirmation page (post-submit)

### What this repo does NOT own
- Lifecycle dashboard (separate repo: `mvp-kanban-lifecycle`)
- SMS sending infrastructure (separate repo: `mvp-rentals`, GV gateway + webhook)
- mvp_bookings spreadsheet schema (separate doc in `mvp-rentals` repo)

