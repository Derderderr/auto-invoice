This script is used to auto generate invoice PDF when Google Form is submitted. The script reads the last row from the response sheet, calculate the total price based on selected items, then replace placeholders inside the invoice template. After that, it export the invoice as PDF and send to the submitter email.

  How it works

    1. User submit the Google Form

    2. Script read the last response row

    3. Modulus section calculate item price

    4. Placeholders in template is replaced

    5. Invoice exported as PDF and email send

  Setup

    1. Create Google Form and link to Sheet

    2. Prepare invoice template with placeholders

    3. Paste script into Apps Script editor

    4. Set onFormSubmit trigger
