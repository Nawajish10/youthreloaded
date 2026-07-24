# Google Sheets Live Integration Guide

Follow these simple steps to link your landing page directly to a Google Sheet so every registration automatically appends as a new row:

---

## Step 1: Open Google Sheets
1. Create a new Google Sheet (e.g., named **Youth Gym Registrations**).
2. Add column headers in Row 1:
   - **Column A**: `Registration ID`
   - **Column B**: `Full Name`
   - **Column C**: `Mobile`
   - **Column D**: `Email`
   - **Column E**: `Age Group`
   - **Column F**: `Gender`
   - **Column G**: `Fitness Goal`
   - **Column H**: `Preferred Workout Time`
   - **Column I**: `Membership Plan`
   - **Column J**: `Submitted At`

---

## Step 2: Paste Google Apps Script
1. Click **Extensions** > **Apps Script** in the Google Sheets top menu.
2. Delete any default code and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.id || '',
      data.fullName || '',
      data.mobile || '',
      data.email || '',
      data.age || '',
      data.gender || '',
      data.fitnessGoal || '',
      data.preferredTime || '',
      data.membershipPlan || '',
      data.createdAt || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Set the properties:
   - **Description**: Gym Lead Webhook
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**, authorize permissions, and copy the **Web App URL** (e.g., `https://script.google.com/macros/s/.../exec`).

---

## Step 4: Add Webhook URL to Project
In your project `.env.local` file, set:

```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

Every submission will now instantly write to **Supabase**, **Local Database (`data/leads.json`)**, and **Google Sheets**!
