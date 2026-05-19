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

// 1-indexed columns on Sheet1
const COL_PROPERTY = 4;   // D
const COL_CHECKIN = 5;    // E
const COL_CHECKOUT = 6;   // F
const COL_CANCELLED = 47; // AU

const REQUESTS_TAB = 'Booking Requests';
const NOTIFY_EMAIL = 'wm.m.morris@gmail.com';

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
function doGet(e) {
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
    // Read only the columns we need rather than all 47.
    // D = property (col 4), E = checkin (5), F = checkout (6), AU = cancelled (47)
    // Two small ranges = much faster than one giant range.
    const propRange = sh.getRange(DATA_START_ROW, COL_PROPERTY, numRows, 3).getValues(); // D-F
    const cancelRange = sh.getRange(DATA_START_ROW, COL_CANCELLED, numRows, 1).getValues(); // AU
    // Filter to future bookings only ? past stays are irrelevant for availability checks.
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'America/New_York', 'yyyy-MM-dd');
    const out = {};
    for (let i = 0; i < propRange.length; i++) {
      const property = propRange[i][0];
      if (!property) continue;
      if (cancelRange[i][0]) continue; // skip cancelled
      const checkIn = fmtYmd_(propRange[i][1]);
      const checkOut = fmtYmd_(propRange[i][2]);
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
    const required = ['property', 'checkIn', 'checkOut', 'name', 'email', 'phone', 'partySize'];
    for (let i = 0; i < required.length; i++) {
      if (!body[required[i]]) {
        return jsonResponse_({ ok: false, error: 'Missing field: ' + required[i] });
      }
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
    tab.appendRow([
      now,
      body.property,
      body.checkIn,
      body.checkOut,
      Number(body.nights || 0),
      body.name,
      body.email,
      body.phone,
      Number(body.partySize || 0),
      body.pets ? 'Yes' : 'No',
      Number(body.petCount || 0),
      body.message || '',
      body.smsConsent ? 'Yes' : 'No',
      body.total != null ? body.total : '',
      'website',
    ]);

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