import { google } from "googleapis";
import type { OrderRecord } from "@/lib/email-templates";

export async function appendOrderToSheet(order: OrderRecord) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Orders";

  if (!sheetId || !serviceAccountEmail || !privateKey) {
    throw new Error("Google Sheets is not configured.");
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${tabName.replace(/'/g, "''")}'!A:M`,
    valueInputOption: "USER_ENTERED",
    // Write into the next available preformatted row instead of inserting a new
    // row that inherits the burgundy header styling.
    insertDataOption: "OVERWRITE",
    requestBody: {
      values: [[
        order.orderId,
        order.dateTime,
        order.customerName,
        order.phone,
        order.email,
        order.location,
        order.productName,
        order.quantity,
        order.pricePerPiece,
        order.totalPrice,
        order.paymentMethod,
        order.orderStatus,
        `Size: ${order.size}; Color: ${order.color}; Custom instructions: ${order.customInstructions || "None"}; Delivery area: ${order.deliveryArea}; delivery charge: ${order.deliveryFee}; subtotal: ${order.subtotal}`,
      ]],
    },
  });
}
