This script is used to auto generate an invoice PDF when Google Form is submitted for purchasing goods. 

  How it works

    1. User submit the Google Form

    2. Google Form transmitted responce data onto Google Sheet and trigger the script

    3. Script read the response row (last row)

    4. Process the data and calculate the total price

    5. Using a template invoice and subsitute the data

    6. Invoice exported as PDF and send the email to the user

  Setup

    1. Prepare invoice template with placeholders, using {{1}}, {{2}}... for item placeholders, and {{email}}, etc for other replacements. Sample: https://docs.google.com/spreadsheets/d/11jXrAmasxktuydFv1HeA7_uF5a9DRsMV-FGdUXKYu24/edit?gid=790763898#gid=790763898

      The Google Sheet ID is the naunce between /d/ ... /edit

    2. Create Google Form, must include:

      a. Email Address - where the invoice email will be sent to

      b. At least 1 active item

    3. Publish the form, and in the Responce tab above, select Link To Sheets -> create a new Google Sheet Response

    4. In the Google Sheet Responce, select Extensions -> Apps Script, a new tap would be opened

    5. Reneame the project and delete all the default code

    6. Copy and past the main.js in

    7. Accoding to the form questions, adjust and copy and paste the code in the modulus.js

    8. Save the code

    9. On the left bar, select Triggers -> (bottom right) Add Trigger -> change "Select event type to "On form submit" -> save and verify this trigger

  Note

    1. Ensure the access permission of the tempalte file

    2. Ensure both Google Sheet only has 1 active tab, if not, move the requirerd tab to the first

    Video Tutorial COMING SOON...


