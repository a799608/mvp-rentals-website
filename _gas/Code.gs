/**
 * MVP Rentals — direct-booking website backend.
 *
 * Two endpoints:
 *   GET  → returns availability JSON keyed by property name
 *   POST → receives a booking request, appends to the Booking Requests tab,
 *          emails the host, returns { ok: true }
 *
 * The site posts JSON with Content-Type: text/plain so the browser does not
 * send a CORS preflight.
 */

const SHEET_ID = '1Yvb0FBrGn_v-OqkEqllzMbhKGOsMi9Ad3skBZdivB0E';
const BOOKINGS_TAB = 'Sheet1';
const HEADER_ROW = 4;
const DATA_START_ROW = 5;

// Columns are found by their header NAME, never by a fixed number or letter
// (Will 2026-11-04). A missing or duplicated header stops with an error that
// names it; there is no position fallback.
// Sheet1 (header row 4):
const SHEET1_COLS = { PROPERTY: 'Property', CHECKIN: 'Check-In Date', CHECKOUT: 'Check-Out Date', CANCELLED: 'Cancelled Date' };

const REQUESTS_TAB = 'Booking Requests';
const NOTIFY_EMAIL = 'wm.m.morris@gmail.com';
// Booking Requests (header row 1):
const REQUEST_COLS = {
  SUBMITTED: 'Submitted At', PROPERTY: 'Property', CHECKIN: 'Check-In', CHECKOUT: 'Check-Out', NIGHTS: 'Nights',
  NAME: 'Name', EMAIL: 'Email', PHONE: 'Phone', PARTY: 'Party Size', PETS: 'Pets', PET_COUNT: 'Pet Count',
  MESSAGE: 'Message', SMS: 'SMS Consent', TOTAL: 'Estimated Total', SOURCE: 'Source',
};

// Read a tab's header row once and return {KEY: 1-based column} for every name in `names`.
function headerCols_(sh, headerRow, names) {
  const header = sh.getRange(headerRow, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
  const seen = Object.create(null), dup = Object.create(null);
  header.forEach(function (h, i) {
    const n = String(h == null ? '' : h).trim();
    if (!n) return;
    if (n in seen) dup[n] = true; else seen[n] = i + 1;
  });
  const out = {};
  Object.keys(names).forEach(function (k) {
    const n = names[k];
    if (dup[n]) throw new Error('Column "' + n + '" appears more than once in the header row of tab "' + sh.getName() + '"');
    if (!(n in seen)) throw new Error('Column "' + n + '" not found in the header row of tab "' + sh.getName() + '"');
    out[k] = seen[n];
  });
  return out;
}

// A row for appendRow with each value placed under its header.
function rowByHeader_(cols, values) {
  let width = 0;
  Object.keys(values).forEach(function (k) { width = Math.max(width, cols[k]); });
  const row = [];
  for (let i = 0; i < width; i++) row.push('');
  Object.keys(values).forEach(function (k) { row[cols[k] - 1] = values[k]; });
  return row;
}

function fmtYmd_(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone() || 'America/New_York', 'yyyy-MM-dd');
  }
  // Already a string — assume YYYY-MM-DD or close to it
  const s = String(value).trim();
  // Try to parse common formats
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return m[1] + '-' + m[2].padStart(2, '0') + '-' + m[3].padStart(2, '0');
  const m2 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m2) {
    const yy = m2[3];
    const mm = m2[1].padStart(2, '0');
    const dd = m2[2].padStart(2, '0');
    return yy + '-' + mm + '-' + dd;
  }
  // Fallback: try Date()
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return Utilities.formatDate(d, Session.getScriptTimeZone() || 'America/New_York', 'yyyy-MM-dd');
  }
  return '';
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET handler — returns availability JSON.
 * Shape:
 *   { "Trails": [["2026-04-30","2026-05-03"], ...], "Wylie": [...], ... }
 */
// Link-click log (Will 2026-10-26: "track access to the website so we could see if it drives traffic").
// poconomvp.com/go/ calls GET ?click=1&h=<house>&s=<sms|email>&g=<guest code>&k=<campaign> before opening the house page.
// ("c" cannot be used: Apps Script web apps reserve it and answer 400.)
const CLICKS_TAB = 'Link Clicks';
const CLICK_HOUSES = ['trails', 'maccauley', 'petrarch', 'wylie', 'pound', 'milton', 'flyer'];   // flyer = /halloween/ page opened
// Link Clicks (header row 1):
const CLICK_COLS = { TIME: 'Clicked (ET)', HOUSE: 'House', CHANNEL: 'Channel', GUEST: 'Guest code', CAMPAIGN: 'Campaign' };

function logClick_(p) {
  const h = String(p.h || '').toLowerCase();
  if (CLICK_HOUSES.indexOf(h) < 0) return;
  const clean = function (v) { return String(v || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 24); };
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let tab = ss.getSheetByName(CLICKS_TAB);
  if (!tab) {
    tab = ss.insertSheet(CLICKS_TAB);
    tab.appendRow(['Clicked (ET)', 'House', 'Channel', 'Guest code', 'Campaign']);
  }
  tab.appendRow(rowByHeader_(headerCols_(tab, 1, CLICK_COLS), {
    TIME: Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm:ss'),
    HOUSE: h, CHANNEL: clean(p.s), GUEST: clean(p.g), CAMPAIGN: clean(p.k),
  }));
}

function doGet(e) {
  if (e && e.parameter && e.parameter.click) {
    try { logClick_(e.parameter); } catch (err) { /* a failed log never blocks the visitor */ }
    return ContentService.createTextOutput('ok');
  }
  try {
    // 5-min CacheService ? most calls serve from cache (~50ms instead of 10-15s)
    const cache = CacheService.getScriptCache();
    const cached = cache.get('availability_v2');
    if (cached) {
      return ContentService
        .createTextOutput(cached)
        .setMimeType(ContentService.MimeType.JSON);
    }
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(BOOKINGS_TAB);
    if (!sh) throw new Error('Sheet not found: ' + BOOKINGS_TAB);
    const lastRow = sh.getLastRow();
    if (lastRow < DATA_START_ROW) return jsonResponse_({});
    const numRows = lastRow - DATA_START_ROW + 1;
    // Read only the columns we need (found by header name), one small range each,
    // rather than the whole sheet.
    const c = headerCols_(sh, HEADER_ROW, SHEET1_COLS);
    const colOf = function (col) { return sh.getRange(DATA_START_ROW, col, numRows, 1).getValues(); };
    const propCol = colOf(c.PROPERTY), inCol = colOf(c.CHECKIN), outCol = colOf(c.CHECKOUT);
    const cancelRange = colOf(c.CANCELLED);
    // Filter to future bookings only ? past stays are irrelevant for availability checks.
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'America/New_York', 'yyyy-MM-dd');
    const out = {};
    for (let i = 0; i < propCol.length; i++) {
      const property = propCol[i][0];
      if (!property) continue;
      if (cancelRange[i][0]) continue; // skip cancelled
      const checkIn = fmtYmd_(inCol[i][0]);
      const checkOut = fmtYmd_(outCol[i][0]);
      if (!checkIn || !checkOut) continue;
      if (checkOut < todayStr) continue; // past booking ? skip
      const key = String(property).trim();
      if (!out[key]) out[key] = [];
      out[key].push([checkIn, checkOut]);
    }
    const json = JSON.stringify(out);
    try { cache.put('availability_v2', json, 300); } catch (_) {} // 5-min TTL, ignore quota errors
    return ContentService
      .createTextOutput(json)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return jsonResponse_({ error: String(err && err.message || err) });
  }
}

/**
 * POST handler — accepts a JSON booking request, appends a row, emails Will.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ ok: false, error: 'No payload' });
    }
    const body = JSON.parse(e.postData.contents);
    const required = ['property', 'checkIn', 'checkOut', 'name', 'partySize'];
    for (let i = 0; i < required.length; i++) {
      if (!body[required[i]]) {
        return jsonResponse_({ ok: false, error: 'Missing field: ' + required[i] });
      }
    }
    if (!body.email && !body.phone) {
      return jsonResponse_({ ok: false, error: 'Please provide either an email or a phone number.' });
    }
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let tab = ss.getSheetByName(REQUESTS_TAB);
    if (!tab) {
      tab = ss.insertSheet(REQUESTS_TAB);
      tab.appendRow([
        'Submitted At', 'Property', 'Check-In', 'Check-Out', 'Nights',
        'Name', 'Email', 'Phone', 'Party Size', 'Pets', 'Pet Count',
        'Message', 'SMS Consent', 'Estimated Total', 'Source',
      ]);
      tab.setFrozenRows(1);
    }
    const now = new Date();
    tab.appendRow(rowByHeader_(headerCols_(tab, 1, REQUEST_COLS), {
      SUBMITTED: now,
      PROPERTY: body.property,
      CHECKIN: body.checkIn,
      CHECKOUT: body.checkOut,
      NIGHTS: Number(body.nights || 0),
      NAME: body.name,
      EMAIL: body.email,
      PHONE: body.phone,
      PARTY: Number(body.partySize || 0),
      PETS: body.pets ? 'Yes' : 'No',
      PET_COUNT: Number(body.petCount || 0),
      MESSAGE: body.message || '',
      SMS: body.smsConsent ? 'Yes' : 'No',
      TOTAL: body.total != null ? body.total : '',
      SOURCE: 'website',
    }));

    const subject = 'New booking request: ' + body.property + ' ' +
      body.checkIn + ' to ' + body.checkOut + ' from ' + body.name;
    const lines = [
      'Property:    ' + body.property,
      'Dates:       ' + body.checkIn + ' to ' + body.checkOut + '  (' + (body.nights || '?') + ' nights)',
      'Name:        ' + body.name,
      'Email:       ' + body.email,
      'Phone:       ' + body.phone,
      'Party size:  ' + body.partySize,
      'Pets:        ' + (body.pets ? 'Yes (' + (body.petCount || 1) + ')' : 'No'),
      'SMS consent: ' + (body.smsConsent ? 'Yes' : 'No'),
      'Est. total:  ' + (body.total != null ? '$' + body.total : 'n/a'),
      '',
      'Message:',
      body.message || '(none)',
      '',
      '--',
      'Logged to "' + REQUESTS_TAB + '" tab on mvp_bookings.',
      'Submitted: ' + now.toString(),
    ];
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: lines.join('\n'),
      replyTo: body.email,
    });

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err && err.message || err) });
  }
}

/**
 * Manual sanity check — run from the Apps Script editor while logged in as
 * Will to verify the sheet is accessible and the schema lines up. Logs the
 * count of active reservations per property.
 */
function devSelfCheck() {
  const result = doGet({});
  Logger.log(result.getContent());
}