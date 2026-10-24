import nextEnv from "@next/env";
import { google } from "googleapis";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Orders";
const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!spreadsheetId || !email || !key) {
  throw new Error("Google Sheets environment variables are incomplete.");
}

const auth = new google.auth.JWT({
  email,
  key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const headers = [
  "Order ID",
  "Date & Time",
  "Customer Name",
  "Phone Number",
  "Email Address",
  "Exact Location",
  "Product Name",
  "Quantity",
  "Price Per Piece",
  "Total Price",
  "Payment Method",
  "Order Status",
  "Notes",
];

const metadata = await sheets.spreadsheets.get({
  spreadsheetId,
  fields:
    "properties.title,sheets(properties,bandedRanges.bandedRangeId,conditionalFormats)",
});
const sheet = metadata.data.sheets?.find(
  (candidate) => candidate.properties?.title === tabName,
);

if (!sheet?.properties?.sheetId && sheet?.properties?.sheetId !== 0) {
  throw new Error(`Worksheet \"${tabName}\" was not found.`);
}

const sheetId = sheet.properties.sheetId;
const existing = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `'${tabName.replaceAll("'", "''")}'!A1:M2`,
});
const rows = existing.data.values || [];

if (rows.length > 0 && rows[0]?.some(Boolean)) {
  const matches = headers.every((header, index) => rows[0]?.[index] === header);
  if (!matches) {
    throw new Error(
      "The first row already contains different data, so formatting stopped to avoid overwriting it.",
    );
  }
} else {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${tabName.replaceAll("'", "''")}'!A1:M1`,
    valueInputOption: "RAW",
    requestBody: { values: [headers] },
  });
}

const requests = [];

for (let index = (sheet.conditionalFormats?.length || 0) - 1; index >= 0; index -= 1) {
  requests.push({ deleteConditionalFormatRule: { sheetId, index } });
}
for (const range of sheet.bandedRanges || []) {
  if (range.bandedRangeId != null) {
    requests.push({ deleteBanding: { bandedRangeId: range.bandedRangeId } });
  }
}

requests.push(
  {
    updateSheetProperties: {
      properties: {
        sheetId,
        tabColorStyle: { rgbColor: { red: 0.44, green: 0.12, blue: 0.23 } },
        gridProperties: { frozenRowCount: 1 },
      },
      fields: "tabColorStyle,gridProperties.frozenRowCount",
    },
  },
  {
    setBasicFilter: {
      filter: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1000,
          startColumnIndex: 0,
          endColumnIndex: 13,
        },
      },
    },
  },
  {
    addBanding: {
      bandedRange: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1000,
          startColumnIndex: 0,
          endColumnIndex: 13,
        },
        rowProperties: {
          firstBandColorStyle: {
            rgbColor: { red: 1, green: 0.98, blue: 0.98 },
          },
          secondBandColorStyle: {
            rgbColor: { red: 0.99, green: 0.93, blue: 0.95 },
          },
        },
      },
    },
  },
  {
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 13,
      },
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: {
            rgbColor: { red: 0.44, green: 0.12, blue: 0.23 },
          },
          textFormat: {
            foregroundColorStyle: {
              rgbColor: { red: 1, green: 1, blue: 1 },
            },
            bold: true,
            fontSize: 11,
          },
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          wrapStrategy: "WRAP",
          borders: {
            bottom: {
              style: "SOLID_THICK",
              colorStyle: { rgbColor: { red: 0.91, green: 0.53, blue: 0.6 } },
            },
          },
        },
      },
      fields: "userEnteredFormat",
    },
  },
  {
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 40 },
      fields: "pixelSize",
    },
  },
  {
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 1,
        endRowIndex: 1000,
        startColumnIndex: 0,
        endColumnIndex: 13,
      },
      cell: {
        userEnteredFormat: {
          verticalAlignment: "MIDDLE",
          textFormat: {
            foregroundColorStyle: {
              rgbColor: { red: 0.18, green: 0.12, blue: 0.15 },
            },
            fontSize: 10,
          },
        },
      },
      fields: "userEnteredFormat.verticalAlignment,userEnteredFormat.textFormat",
    },
  },
  {
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 1, endColumnIndex: 2 },
      cell: { userEnteredFormat: { numberFormat: { type: "DATE_TIME", pattern: "dd mmm yyyy, hh:mm" } } },
      fields: "userEnteredFormat.numberFormat",
    },
  },
  {
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 7, endColumnIndex: 8 },
      cell: { userEnteredFormat: { numberFormat: { type: "NUMBER", pattern: "0" }, horizontalAlignment: "CENTER" } },
      fields: "userEnteredFormat.numberFormat,userEnteredFormat.horizontalAlignment",
    },
  },
  {
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 8, endColumnIndex: 10 },
      cell: { userEnteredFormat: { numberFormat: { type: "CURRENCY", pattern: '"Rs" #,##0' } } },
      fields: "userEnteredFormat.numberFormat",
    },
  },
  {
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 5, endColumnIndex: 6 },
      cell: { userEnteredFormat: { wrapStrategy: "WRAP" } },
      fields: "userEnteredFormat.wrapStrategy",
    },
  },
  {
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 12, endColumnIndex: 13 },
      cell: { userEnteredFormat: { wrapStrategy: "WRAP" } },
      fields: "userEnteredFormat.wrapStrategy",
    },
  },
  {
    setDataValidation: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 11, endColumnIndex: 12 },
      rule: {
        condition: {
          type: "ONE_OF_LIST",
          values: ["New Order", "Order Confirmed", "Order Ongoing", "Delivered", "Cancelled"].map((userEnteredValue) => ({ userEnteredValue })),
        },
        strict: true,
        showCustomUi: true,
      },
    },
  },
);

const widths = [180, 160, 170, 130, 210, 240, 190, 85, 125, 125, 145, 150, 340];
widths.forEach((pixelSize, index) => {
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "COLUMNS", startIndex: index, endIndex: index + 1 },
      properties: { pixelSize },
      fields: "pixelSize",
    },
  });
});

const statuses = [
  ["New Order", { red: 1, green: 0.9, blue: 0.65 }],
  ["Order Confirmed", { red: 0.78, green: 0.9, blue: 1 }],
  ["Order Ongoing", { red: 0.9, green: 0.82, blue: 1 }],
  ["Delivered", { red: 0.76, green: 0.93, blue: 0.78 }],
  ["Cancelled", { red: 0.96, green: 0.77, blue: 0.77 }],
];

for (const [status, color] of statuses) {
  requests.push({
    addConditionalFormatRule: {
      index: 0,
      rule: {
        ranges: [{ sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 11, endColumnIndex: 12 }],
        booleanRule: {
          condition: { type: "CUSTOM_FORMULA", values: [{ userEnteredValue: `=$L2=\"${status}\"` }] },
          format: { backgroundColorStyle: { rgbColor: color }, textFormat: { bold: true } },
        },
      },
    },
  });
}

await sheets.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: { requests },
});

console.log(
  JSON.stringify({
    ok: true,
    spreadsheet: metadata.data.properties?.title,
    worksheet: tabName,
    columns: headers.length,
  }),
);
