// src/app/api/post/requestItem.js
export async function POST(req, res) {
    try {
      const { itemId, memberId } = req.body;
      const today = new Date().toISOString().split("T")[0];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      const formattedDueDate = dueDate.toISOString().split("T")[0];
  
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Items",
        valueInputOption: "RAW",
        insertDataOption: "OVERWRITE",
        requestBody: {
          values: [[itemId, memberId, today, formattedDueDate]],
        },
      });
  
      res.status(200).json({ message: "Item requested successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  