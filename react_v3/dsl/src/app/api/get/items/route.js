// src/app/api/get/items.js
import { google } from "googleapis";
import { JWT } from "google-auth-library";

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const CLIENT_EMAIL = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY.split(String.raw`\n`).join('\n');

const auth = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET(req, res) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Items",
    });
    res.status(200).json(response.data.values);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}