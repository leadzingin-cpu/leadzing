/**
 * ============================================================================
 * LeadZing Booking Backend — Code.gs
 * ============================================================================
 * Receives "Book Discovery Call" submissions from the LeadZing Next.js
 * website and appends each one as a new row in the "LeadZing Leads"
 * spreadsheet. Deployed as a Web App (see DEPLOYMENT-GUIDE.md).
 *
 * Entry points Apps Script calls automatically:
 *   doPost(e)  — handles the booking submission (POST from the website)
 *   doGet(e)   — a friendly "is this alive?" response, useful for testing
 *                the deployment URL directly in a browser
 *
 * Everything else below is a private helper (trailing underscore is the
 * standard Apps Script convention for "internal, not an entry point").
 * ============================================================================
 */

/**
 * Handles POST requests from the website's booking modal.
 *
 * Expected request body (JSON, sent as a `text/plain` fetch body — see the
 * CORS note above submitBooking() on the frontend for why):
 * {
 *   "bookingDate": "2026-07-18",
 *   "bookingTime": "8:00 PM",
 *   "fullName": "Farhat Khan",
 *   "businessName": "",
 *   "email": "owwzraza@gmail.com",
 *   "phone": "09874743024",
 *   "website": "",
 *   "purpose": "Other",
 *   "goals": ""
 * }
 */
function doPost(e) {
  try {
    const data = parseRequestBody_(e);
    validateBooking_(data);

    const sheet = getOrCreateSheet_();
    ensureHeaderRow_(sheet);
    appendBookingRow_(sheet, data);

    // Future integrations (email, calendar, WhatsApp, CRM, analytics) hook
    // in here. All currently no-ops — see the "FUTURE READY" section below.
    runPostBookingHooks_(data);

    return jsonResponse_({
      success: true,
      message: 'Booking received. We will confirm your meeting shortly.',
    });
  } catch (err) {
    // Any thrown error (bad JSON, missing fields, sheet write failure, etc.)
    // lands here and is reported back as a structured JSON error instead of
    // a raw Apps Script stack trace, which fetch() on the frontend can't do
    // anything useful with.
    return jsonResponse_({
      success: false,
      error: err && err.message ? err.message : 'Unexpected server error.',
    });
  }
}

/**
 * Lets you sanity-check the deployment by opening the Web App URL directly
 * in a browser. Does not touch the sheet.
 */
function doGet(e) {
  return jsonResponse_({
    success: true,
    message: 'LeadZing booking endpoint is live. Submit bookings via POST.',
  });
}

/* ============================================================================
 * REQUEST PARSING + VALIDATION
 * ========================================================================== */

/**
 * Reads and JSON-parses the raw POST body. Throws a clear error if the
 * request has no body or the body isn't valid JSON, instead of letting a
 * cryptic native error escape.
 */
function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body.');
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('Request body is not valid JSON.');
  }
}

/**
 * Confirms every field in CONFIG.REQUIRED_FIELDS is present and non-empty
 * after trimming whitespace. Collects ALL missing fields into one error
 * message rather than failing on the first one, so the caller can see
 * everything wrong in a single response.
 */
function validateBooking_(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Request body must be a JSON object.');
  }

  const missing = CONFIG.REQUIRED_FIELDS.filter(function (field) {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missing.length > 0) {
    throw new Error('Missing required field(s): ' + missing.join(', '));
  }

  // Defense in depth: the website already validates email format client-side,
  // but a request could reach this endpoint from anywhere, not just the
  // booking modal, so it's re-checked here too.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(data.email).trim())) {
    throw new Error('Invalid email address.');
  }
}

/**
 * Trims a field to a plain string and caps its length, so one oversized or
 * malformed value can't blow up a sheet cell (or be used to abuse the
 * endpoint). Missing optional fields become an empty string, never
 * "undefined".
 */
function sanitizeField_(value) {
  if (value === undefined || value === null) return '';
  const str = String(value).trim();
  return str.length > CONFIG.MAX_FIELD_LENGTH ? str.slice(0, CONFIG.MAX_FIELD_LENGTH) : str;
}

/* ============================================================================
 * SPREADSHEET ACCESS
 * ========================================================================== */

/**
 * Resolves the target spreadsheet — either the one this script is bound to
 * (recommended setup), or a specific spreadsheet by ID if CONFIG.SPREADSHEET_ID
 * is set (for a standalone script) — and returns the working tab, creating
 * it if it doesn't exist yet.
 */
function getOrCreateSheet_() {
  const spreadsheet = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error(
      'No spreadsheet found. Either bind this script to "LeadZing Leads" (Extensions > Apps Script), ' +
        'or set CONFIG.SPREADSHEET_ID in Config.gs.'
    );
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_TAB_NAME);
  }
  return sheet;
}

/**
 * Writes the header row (and applies light formatting) the first time the
 * sheet is used. Safe to call on every request — it's a no-op once headers
 * already exist.
 */
function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.getRange(1, 1, 1, CONFIG.COLUMN_HEADERS.length).setValues([CONFIG.COLUMN_HEADERS]);
  sheet.getRange(1, 1, 1, CONFIG.COLUMN_HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, CONFIG.COLUMN_HEADERS.length);
}

/**
 * Builds one row in CONFIG.COLUMN_ORDER order, adds the server-generated
 * timestamp as the final column, and appends it to the sheet.
 */
function appendBookingRow_(sheet, data) {
  const row = CONFIG.COLUMN_ORDER.map(function (field) {
    return sanitizeField_(data[field]);
  });

  // Submission timestamp is generated here, server-side, on purpose — never
  // trust a client-supplied timestamp for an audit record.
  row.push(formatTimestamp_(new Date()));

  sheet.appendRow(row);
}

function formatTimestamp_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

/* ============================================================================
 * RESPONSE HELPERS
 * ========================================================================== */

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

/* ============================================================================
 * FUTURE READY — integration hooks
 * ============================================================================
 * `runPostBookingHooks_` is called once per successful booking, after the
 * row is safely written to the sheet. Every hook below is a stub: none of
 * them run any code yet (`runPostBookingHooks_` doesn't call any of them),
 * but the shape is here so each feature can be turned on independently
 * later just by (1) implementing the body and (2) uncommenting its call
 * below. Each is wrapped in its own try/catch when enabled, so — for
 * example — a Gmail quota error can never cause a booking to fail to save.
 * ========================================================================== */

function runPostBookingHooks_(data) {
  // --- Gmail confirmation email to the customer ---
  // try { sendConfirmationEmail_(data); } catch (err) { logHookError_('sendConfirmationEmail_', err); }

  // --- Gmail notification to the LeadZing team ---
  // try { notifyAdminEmail_(data); } catch (err) { logHookError_('notifyAdminEmail_', err); }

  // --- Google Calendar event + Meet link ---
  // try { createCalendarEvent_(data); } catch (err) { logHookError_('createCalendarEvent_', err); }

  // --- WhatsApp notification (via a provider like Twilio or WATI) ---
  // try { sendWhatsAppNotification_(data); } catch (err) { logHookError_('sendWhatsAppNotification_', err); }

  // --- CRM sync (e.g. HubSpot, Notion, a custom backend) ---
  // try { syncToCrm_(data); } catch (err) { logHookError_('syncToCrm_', err); }

  // --- Analytics / logging ---
  // try { logAnalyticsEvent_(data); } catch (err) { logHookError_('logAnalyticsEvent_', err); }
}

function logHookError_(hookName, err) {
  Logger.log('Hook "%s" failed: %s', hookName, err && err.message ? err.message : err);
}

/**
 * --- Example implementation (disabled) ---
 * Sends the customer a confirmation email. Requires no extra setup beyond
 * the script's default Gmail scope (Apps Script will prompt for
 * authorization the first time GmailApp is used).
 */
function sendConfirmationEmail_(data) {
  GmailApp.sendEmail(data.email, 'We received your discovery call request — LeadZing', [
    'Hi ' + data.fullName + ',',
    '',
    'Thanks for booking a discovery call with LeadZing.',
    'Requested: ' + data.bookingDate + ' at ' + data.bookingTime + ' (Asia/Kolkata)',
    '',
    "We'll confirm your meeting shortly.",
    '',
    '— LeadZing',
  ].join('\n'));
}

/**
 * --- Example implementation (disabled) ---
 * Notifies the internal team of a new lead. Replace the address below with
 * the real inbox that should receive bookings.
 */
function notifyAdminEmail_(data) {
  const ADMIN_EMAIL = 'hello@leadzing.in';
  GmailApp.sendEmail(ADMIN_EMAIL, 'New Discovery Call Booking — ' + data.fullName, [
    'New booking received:',
    '',
    'Name: ' + data.fullName,
    'Business: ' + data.businessName,
    'Email: ' + data.email,
    'Phone: ' + data.phone,
    'Date/Time: ' + data.bookingDate + ' ' + data.bookingTime,
    'Purpose: ' + data.purpose,
    'Goals: ' + data.goals,
  ].join('\n'));
}

/**
 * --- Example implementation (disabled) ---
 * Creates a Calendar event with a Google Meet link and invites the
 * customer. Requires the Calendar advanced service or CalendarApp (built
 * in, no extra setup needed for a basic event).
 */
function createCalendarEvent_(data) {
  const start = new Date(data.bookingDate + ' ' + data.bookingTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30-minute call

  CalendarApp.getDefaultCalendar().createEvent(
    'LeadZing Discovery Call — ' + data.fullName,
    start,
    end,
    { guests: data.email, description: 'Purpose: ' + data.purpose + '\n\nGoals: ' + data.goals }
  );
}

/**
 * --- Placeholder (disabled) ---
 * WhatsApp has no native Apps Script service — this would call an external
 * provider's REST API (Twilio, WATI, Gupshup, etc.) via UrlFetchApp.
 */
function sendWhatsAppNotification_(data) {
  // UrlFetchApp.fetch('https://api.<provider>.com/messages', { method: 'post', payload: {...} });
}

/**
 * --- Placeholder (disabled) ---
 * Push the lead into a CRM. Shape depends entirely on which CRM — this is
 * intentionally left as a stub for that decision.
 */
function syncToCrm_(data) {
  // UrlFetchApp.fetch('https://<your-crm>/api/leads', { method: 'post', payload: {...} });
}

/**
 * --- Placeholder (disabled) ---
 * Send a booking event to an analytics endpoint (GA4 Measurement Protocol,
 * a custom dashboard, etc.).
 */
function logAnalyticsEvent_(data) {
  // UrlFetchApp.fetch('https://<your-analytics-endpoint>', { method: 'post', payload: {...} });
}

/* ============================================================================
 * ONE-TIME MANUAL SETUP HELPER
 * ============================================================================
 * Not called automatically. Run this once from the Apps Script editor
 * (select `setupSheet` in the function dropdown, click Run) if you want to
 * create the "Leads" tab and header row ahead of time, before the first
 * real booking comes in. Entirely optional — doPost() creates everything
 * on its own the first time it runs.
 * ========================================================================== */
function setupSheet() {
  const sheet = getOrCreateSheet_();
  ensureHeaderRow_(sheet);
  Logger.log('Sheet "%s" is ready with headers.', CONFIG.SHEET_TAB_NAME);
}
