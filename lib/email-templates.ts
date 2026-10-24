import { formatNpr } from "@/lib/product";

export type OrderRecord = {
  orderId: string;
  dateTime: string;
  customerName: string;
  phone: string;
  email: string;
  location: string;
  deliveryArea: string;
  productName: string;
  size: "S" | "M" | "L";
  color: string;
  customInstructions: string;
  quantity: number;
  pricePerPiece: number;
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:9px 0;color:#7b6670;font-size:14px;vertical-align:top">${label}</td>
    <td style="padding:9px 0;color:#231a1d;font-size:14px;font-weight:700;text-align:right;vertical-align:top">${value}</td>
  </tr>`;

const shell = (brand: string, title: string, preview: string, body: string) => `<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>${title}</title></head>
<body style="margin:0;background:#f8eff1;font-family:Arial,sans-serif;color:#231a1d">
  <div style="display:none;max-height:0;overflow:hidden">${preview}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8eff1"><tr><td style="padding:28px 12px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto;background:#fff;border-radius:18px;overflow:hidden">
      <tr><td style="background:#701f3a;padding:25px 30px;color:#fff;font-family:Georgia,serif;font-size:28px">${brand}</td></tr>
      <tr><td style="padding:32px 30px">${body}</td></tr>
      <tr><td style="padding:20px 30px;background:#fcf5f4;color:#7b6670;font-size:12px;text-align:center">© ${new Date().getFullYear()} ${brand} · Care in every stitch.</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

export function businessEmail(order: OrderRecord, brand: string) {
  const body = `
    <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#f7e5e8;color:#701f3a;font-size:12px;font-weight:700">NEW ORDER</div>
    <h1 style="margin:18px 0 8px;font:700 30px Georgia,serif;color:#531328">A new order has arrived</h1>
    <p style="margin:0 0 26px;color:#7b6670;line-height:1.6">Order <strong style="color:#231a1d">${order.orderId}</strong> was received on ${order.dateTime}.</p>
    <div style="border:1px solid #eedce1;border-radius:14px;padding:18px 20px;margin-bottom:18px">
      <h2 style="margin:0 0 8px;font:700 18px Georgia,serif;color:#531328">Customer details</h2>
      <table role="presentation" width="100%">${row("Name", escapeHtml(order.customerName))}${row("Phone", escapeHtml(order.phone))}${row("Email", escapeHtml(order.email))}${row("Location", escapeHtml(order.location))}${row("Delivery area", escapeHtml(order.deliveryArea))}</table>
    </div>
    <div style="border:1px solid #eedce1;border-radius:14px;padding:18px 20px;margin-bottom:18px">
      <h2 style="margin:0 0 8px;font:700 18px Georgia,serif;color:#531328">Order details</h2>
      <table role="presentation" width="100%">${row("Product", escapeHtml(order.productName))}${row("Size", escapeHtml(order.size))}${row("Color", escapeHtml(order.color))}${row("Quantity", String(order.quantity))}${row("Price per piece", formatNpr(order.pricePerPiece))}${row("Subtotal", formatNpr(order.subtotal))}${row("Delivery charge", formatNpr(order.deliveryFee))}${row("Total", `<span style="font-size:18px;color:#701f3a">${formatNpr(order.totalPrice)}</span>`)}${order.customInstructions ? row("Custom instructions", escapeHtml(order.customInstructions)) : ""}</table>
    </div>
    <table role="presentation" width="100%"><tr><td style="padding:16px 18px;border-radius:12px;background:#fff7df;color:#6e5110;font-size:14px;line-height:1.5"><strong>Please call the customer soon to confirm this order.</strong><br>Payment: Cash On Delivery · Status: New Order</td></tr></table>`;
  return shell(escapeHtml(brand), "New order received", `New order ${order.orderId}`, body);
}

export function customerEmail(order: OrderRecord, brand: string, supportEmail: string) {
  const body = `
    <div style="font-size:46px;line-height:1">✓</div>
    <h1 style="margin:14px 0 10px;font:700 30px Georgia,serif;color:#531328">Thank you for your order!</h1>
    <p style="margin:0 0 24px;color:#5f5056;line-height:1.7">Hi ${escapeHtml(order.customerName)},<br>We have received your order successfully. Our sales representative will call you soon to confirm your order.</p>
    <div style="border:1px solid #eedce1;border-radius:14px;padding:18px 20px;margin-bottom:20px">
      <div style="font-size:12px;color:#7b6670;text-transform:uppercase;letter-spacing:1px">Order ID</div>
      <div style="font-size:20px;font-weight:700;color:#531328;margin:5px 0 14px">${order.orderId}</div>
      <table role="presentation" width="100%">${row("Product", escapeHtml(order.productName))}${row("Size", escapeHtml(order.size))}${row("Color", escapeHtml(order.color))}${row("Quantity", String(order.quantity))}${row("Delivery charge", formatNpr(order.deliveryFee))}${row("Total", `<span style="font-size:18px;color:#701f3a">${formatNpr(order.totalPrice)}</span>`)}${order.customInstructions ? row("Your instructions", escapeHtml(order.customInstructions)) : ""}${row("Payment", "Cash On Delivery")}</table>
    </div>
    <p style="margin:0;color:#7b6670;font-size:14px;line-height:1.6">Need help? Reply to this email or contact <a href="mailto:${escapeHtml(supportEmail)}" style="color:#701f3a">${escapeHtml(supportEmail)}</a>.</p>
    <p style="margin:22px 0 0;color:#231a1d">Thank you,<br><strong>${escapeHtml(brand)}</strong></p>`;
  return shell(escapeHtml(brand), "Your order has been received", `We received your ${brand} order.`, body);
}
