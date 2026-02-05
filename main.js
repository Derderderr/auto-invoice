// ======================================================
// MAIN CONFIG
// ======================================================

// Invoice template
var TEMPLATE_SHEET_ID = "1234abcd";
var TEMPLATE_NUM_PLACEHOLDERS = 36; // according to the number of products expected, overflow items won't be shown on the invoice, but total price will still be correct
var OUTPUT_PDF_NAME = "Invoice";

// Submitter headers
var HEADER_SUBMITTER_EMAIL = "Email Address";
var HEADER_SUBMITTER_NAME  = "Name";

// Email config
var EMAIL_SENDER_NAME = "xxx_company";
var EMAIL_SUBJECT = "Invoice for your order";
var EMAIL_BODY =  `Thank you for your order! Please find your invoice attached.\n\n` +
                  `Best regards`

// ======================================================
// MAIN TRIGGER
// ======================================================

function onFormSubmit(e) {

  // ----- Load form response row -----
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // first sheet
  
  var lastRow = sheet.getLastRow();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var lastRowData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Map headers → values
  var formData = {};
  headers.forEach(function (header, index) {
    formData[header] = lastRowData[index];
  });

  // ----- Invoice state -----
  var totalPrice = 0;
  var placeholderMap = {};
  var curIndex = 1;

  // ==================================================
  // ========== START OF MODULUS SECTION ===============
  // ==================================================





  // ==================================================
  // =========== END OF MODULUS SECTION ================
  // ==================================================
  

  // ----- Static placeholders -----
  placeholderMap["{{Timestamp}}"]   = formData["Timestamp"];
  placeholderMap["{{Submitter}}"]   = formData[HEADER_SUBMITTER_NAME];
  placeholderMap["{{Total Price}}"] = totalPrice;

  // ----- Fill unused placeholders -----
  for (var i = curIndex; i <= TEMPLATE_NUM_PLACEHOLDERS; i++) {
    placeholderMap["{{" + i + "}}"] = "";
  }

  // ----- Create invoice copy -----
  var templateSheet = SpreadsheetApp.openById(TEMPLATE_SHEET_ID);
  var tempCopy = templateSheet.copy(OUTPUT_PDF_NAME);
  var tempSheet = SpreadsheetApp.openById(tempCopy.getId()).getSheets()[0];

  // ----- Replace placeholders -----
  var range = tempSheet.getDataRange();
  var values = range.getValues();

  for (var row = 0; row < values.length; row++) {
    for (var col = 0; col < values[row].length; col++) {
      if (typeof values[row][col] === "string") {
        for (var key in placeholderMap) {
          values[row][col] = values[row][col].replace(key, placeholderMap[key]);
        }
      }
    }
  }

  range.setValues(values);
  SpreadsheetApp.flush();

  // ----- Export PDF -----
  var pdf = DriveApp.getFileById(tempCopy.getId())
    .getAs("application/pdf");

  tempCopy.setTrashed(true);

  // ----- Send email -----
  var submitterEmail = formData[HEADER_SUBMITTER_EMAIL];
  var submitterName  = formData[HEADER_SUBMITTER_NAME];

  var emailBody =
    `Dear ${submitterName},\n\n` + EMAIL_BODY;

  MailApp.sendEmail({
    name: EMAIL_SENDER_NAME,
    to: submitterEmail,
    subject: EMAIL_SUBJECT,
    body: emailBody,
    attachments: [pdf]
  });
}
