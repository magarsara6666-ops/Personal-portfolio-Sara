# MedStitch Cash on Delivery Funnel

A production-ready Next.js funnel for selling MedStitch scrub dresses with Cash on Delivery. It includes a responsive landing page, checkout, secure order API, Google Sheets storage, two HTML emails, and a thank-you page.

## Recommended stack

- **Next.js App Router + TypeScript** for the storefront and server-side API in one deployable application.
- **Tailwind CSS** for the responsive Burgundy & Blush interface.
- **Zod** for strict API validation.
- **Google Sheets API** with a service account for order storage.
- **Nodemailer + Gmail SMTP** for business and customer emails.
- **Vercel** for deployment.

The browser sends only customer details, quantity, and delivery area to `POST /api/order`. The API validates the fields and recalculates product price, bundle savings, delivery fee, and total on the server. This prevents edited browser values from changing the true price.

The order flow is:

1. A customer selects a quantity and opens `/checkout`.
2. Checkout calculates a preview and submits the form to `/api/order`.
3. The API validates the request and generates a unique order ID and Kathmandu date/time.
4. The API appends the order to Google Sheets.
5. It sends a styled notification email to the business.
6. It sends a styled confirmation email to the customer.
7. Only after those actions succeed does the API return success and redirect to `/thank-you`.

If an integration fails, the API returns an error and checkout does not redirect. The server logs the underlying integration error without exposing credentials to the customer.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and add:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production site URL, such as `https://medstitch.vercel.app` |
| `FRONTEND_URL` | Allowed request origin; normally the same production URL |
| `BUSINESS_EMAIL` | Address that receives new-order notifications |
| `EMAIL_FROM` | Verified sender address; for Gmail SMTP this is normally `SMTP_USER` |
| `BRAND_NAME` | `MedStitch` |
| `GOOGLE_SHEET_ID` | Spreadsheet ID from the Google Sheets URL |
| `GOOGLE_SHEET_TAB_NAME` | Tab name, recommended: `Orders` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google service-account email |
| `GOOGLE_PRIVATE_KEY` | Entire private key; keep escaped `\n` characters on Vercel |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` for secure Gmail SMTP |
| `SMTP_USER` | Gmail/Google Workspace address used to send mail |
| `SMTP_PASS` | Google App Password, not the normal Gmail password |
| `EMAIL_SERVICE_API_KEY` | Reserved for a future API-based email provider; unused by SMTP |

Never prefix private variables with `NEXT_PUBLIC_` and never commit `.env.local`.

## Google Spreadsheet setup

1. Create a Google Spreadsheet and rename the working tab to `Orders` (or use the exact name in `GOOGLE_SHEET_TAB_NAME`).
2. Add these headings in row 1, columns A–M, in this exact order:

   ```text
   Order ID | Date & Time | Customer Name | Phone Number | Email Address | Exact Location | Product Name | Quantity | Price Per Piece | Total Price | Payment Method | Order Status | Notes
   ```

3. Select row 1, make it bold, add a burgundy fill with white text, and freeze it using **View → Freeze → 1 row**.
4. Select the complete table and choose **Data → Create a filter**.
5. Select column L below the header, choose **Data → Data validation → Dropdown**, and add:
   - New Order
   - Order Confirmed
   - Order Ongoing
   - Delivered
   - Cancelled
6. The Sheet ID is the part between `/d/` and `/edit` in its URL:

   ```text
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

7. In Google Cloud, create or select a project, enable the **Google Sheets API**, create a service account, and generate a JSON key.
8. Put the JSON key's `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `private_key` into `GOOGLE_PRIVATE_KEY`.
9. Share the spreadsheet with the service-account email as **Editor**. Without this step, appending orders will fail.

The API writes delivery area, delivery fee, and product subtotal into Notes so the requested A–M structure remains unchanged.

## Gmail setup

1. Enable 2-Step Verification on the sending Google account.
2. Create a Google App Password for Mail.
3. Use the sending Gmail address for `SMTP_USER` and `EMAIL_FROM`.
4. Use the 16-character App Password for `SMTP_PASS`.
5. Set `BUSINESS_EMAIL=magarsara6666@gmail.com` or another inbox that should receive orders.

The SMTP credentials remain server-only. The customer email uses the sender address as its reply-to address, while the internal business email replies directly to the customer.

## Test the complete order flow

1. Create a separate test spreadsheet and use its ID while testing.
2. Use an email address you can check as the checkout customer.
3. Start the app with all `.env.local` values configured.
4. Submit one inside-Kathmandu order and confirm:
   - one new row appears in the correct sheet tab;
   - the business inbox receives the full order notification;
   - the customer inbox receives the order confirmation;
   - the browser reaches the thank-you page with the correct order ID and total.
5. Repeat with quantity 2 and outside-Kathmandu delivery. The product subtotal should be Rs 4,000, delivery Rs 120, and total Rs 4,120.
6. Temporarily use an invalid SMTP password to verify that checkout shows an error and does not redirect.

## Deploy to Vercel

1. Push the project to a Git repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel should detect Next.js automatically; no custom build settings are required.
4. Add every `.env.example` variable in **Project Settings → Environment Variables**. For `GOOGLE_PRIVATE_KEY`, paste the value with escaped `\n` newlines if necessary.
5. Deploy, then set both `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to the final HTTPS domain and redeploy.
6. Complete the two-order production test above.

## Pricing rules

- One set: Rs 2,200.
- Two sets: Rs 4,000.
- For larger orders, each complete pair uses the Rs 4,000 offer and an odd remaining set adds Rs 2,200.
- Delivery charge: Rs 100 inside Kathmandu Valley; Rs 120 outside Kathmandu Valley.

The source of truth is [`lib/product.ts`](./lib/product.ts). Update product pricing there; do not duplicate prices in the API.

## Important reliability note

The API waits for Sheets and both emails before reporting success. Google Sheets and SMTP cannot form a true atomic database transaction: if Sheets succeeds and a later email fails, the saved row remains and checkout reports the failure. The server logs the problem for diagnosis. For higher-volume use, move orders to a transactional database and send emails through a retry queue while using the client request ID as an idempotency key.
