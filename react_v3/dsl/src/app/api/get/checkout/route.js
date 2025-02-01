// src/app/api/get/checkout.js
export async function GET(req, res) {
    try {
      const { searchParams } = new URL(req.url);
      const itemId = searchParams.get("itemId");
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "Items",
      });
  
      const rows = response.data.values;
      const headers = rows[0];
      const items = rows.slice(1).map(row => Object.fromEntries(row.map((cell, index) => [headers[index], cell])));
      
      const item = items.find(i => i["Item ID"] === itemId);
  
      res.status(200).json(item || {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  