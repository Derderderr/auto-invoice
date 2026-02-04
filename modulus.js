// // // // // SINGLE ITEM// // // // //
var HEADER_NAME  = "item header name";
var ITEM_COST    = 5;
var DISPLAY_NAME = "item display name";

var exists = formData[HEADER_NAME];
if (exists) {
  totalPrice += ITEM_COST;
  placeholderMap["{{" + curIndex + "}}"] = DISPLAY_NAME;
  curIndex++;
}

// // // // // QUANTITY ITEM // // // // //
var HEADER_QUANTITY_NAME = "item quantity header name";
var ITEM_COST            = 5;
var DISPLAY_NAME         = "item display name";

var quantity = formData[HEADER_QUANTITY_NAME];

if (exists && Number.isInteger(quantity) && quantity > 0) {
  totalPrice += ITEM_COST * quantity;
  placeholderMap["{{" + curIndex + "}}"] = DISPLAY_NAME + " × " + quantity;
  curIndex++;
}


// // // // // MULTIPLE ITEMS (CURRENCY) // // // // //
var START_HEADER = "Addon Start";
var END_HEADER   = "Addon End";

// Supports: RM1200 | RM 1,200 | RM 1,200.00
// change corresponded for other currencies: $, CNY,
var CURRENCY_REGEX = /RM\s?([\d,]+(?:\.\d{1,2})?)/;

var startIndex = headers.indexOf(START_HEADER);
var endIndex   = headers.indexOf(END_HEADER);

if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {

  for (var col = startIndex; col <= endIndex; col++) {
    var cellValue = lastRowData[col];
    if (!cellValue || typeof cellValue !== "string") continue;

    var items = cellValue.split(",").map(function (i) {
      return i.trim();
    });

    items.forEach(function (item) {
      var match = item.match(CURRENCY_REGEX);
      if (!match) return;

      var price = Number(match[1].replace(/,/g, ""));
      totalPrice += price;

      placeholderMap["{{" + curIndex + "}}"] = item;
      curIndex++;
    });
  }
}
