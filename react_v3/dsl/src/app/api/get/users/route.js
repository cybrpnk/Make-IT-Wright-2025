// src/app/api/get/user.js
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

export async function GET() {
  try {
    console.log("Fetching users from Google Sheets...");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Users!A:I",
    });

    console.log("Raw API response:", response.data);

    if (!response.data.values || response.data.values.length === 0) {
      console.error("No data found in the Users sheet.");
      return new Response(JSON.stringify([]), { status: 200 }); // Return empty array
    }

    const rows = response.data.values;
    const headers = rows[0]; // Extract headers (first row)

    if (!headers) {
      console.error("Headers missing in Users sheet.");
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const users = rows.slice(1).map((row) => {
      // Ensure row has all values
      return Object.fromEntries(
        headers.map((header, index) => [header, row[index] ?? ""]) // Use `?? ""` to avoid `undefined`
      );
    });

    console.log("Parsed users:", users);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

/* old
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");
    
    const range = "Users!A:I"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: range,
    });

    //const rows = response.data.values;
    
    


    const [headers, ...rows] = response.data.values || []; // Extract headers + rows

    console.log("\nRows:\n");
    console.log(rows);

    // Convert rows into structured objects
    const users = rows.map(row =>
      Object.fromEntries(headers.map((header, index) => {header, row[index] || ""}))
    );

    console.log("\nUsers:\n")
    console.log(users)

    //const headers = rows[0];
    //const users = rows.slice(1).map(row => Object.fromEntries(row.map((cell, index) => [headers[index], cell])));
    
    const user = users.find(u => u["Member ID"] === memberId);

    //console.log("user:")
    //console.log(user);

    return Response.json({ headers, users });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/*
    res.status(200).json(user || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
*/