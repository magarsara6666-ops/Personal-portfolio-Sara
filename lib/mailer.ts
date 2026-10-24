import nodemailer from "nodemailer";
import { businessEmail, customerEmail, type OrderRecord } from "@/lib/email-templates";

export async function sendOrderEmails(order: OrderRecord) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const businessEmailAddress = process.env.BUSINESS_EMAIL;
  const from = process.env.EMAIL_FROM || user;
  const brand = process.env.BRAND_NAME || "MedStitch";

  if (!host || !user || !pass || !businessEmailAddress || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.verify();
  const replyTo = from;
  await transporter.sendMail({
    from: `${brand} Orders <${from}>`,
    to: businessEmailAddress,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessEmail(order, brand),
  });
  await transporter.sendMail({
    from: `${brand} <${from}>`,
    to: order.email,
    replyTo,
    subject: `Your Order Has Been Received - ${brand}`,
    html: customerEmail(order, brand, replyTo),
  });
}
