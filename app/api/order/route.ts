import { NextRequest, NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/google-sheets";
import { sendOrderEmails } from "@/lib/mailer";
import { orderSchema } from "@/lib/order-schema";
import { orderPricing, PRODUCT } from "@/lib/product";
import type { OrderRecord } from "@/lib/email-templates";

export const runtime = "nodejs";

function makeOrderId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `MS-${stamp}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const expectedOrigin = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_SITE_URL;
    const origin = request.headers.get("origin");
    if (expectedOrigin && origin && new URL(origin).origin !== new URL(expectedOrigin).origin) {
      return NextResponse.json({ success: false, message: "Request origin is not allowed." }, { status: 403 });
    }

    const parsed = orderSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Please check your order details.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const input = parsed.data;
    if (input.productName !== PRODUCT.name) {
      return NextResponse.json({ success: false, message: "Invalid product selection." }, { status: 400 });
    }

    const price = orderPricing(input.quantity, input.deliveryArea);
    const now = new Date();
    const order: OrderRecord = {
      orderId: makeOrderId(),
      dateTime: new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kathmandu",
      }).format(now),
      customerName: input.fullName,
      phone: input.phone,
      email: input.email,
      location: input.location,
      deliveryArea: input.deliveryArea === "inside-ktm" ? "Inside Kathmandu Valley" : "Outside Kathmandu Valley",
      productName: PRODUCT.name,
      size: input.size,
      color: input.color,
      customInstructions: input.customInstructions,
      quantity: input.quantity,
      pricePerPiece: price.pricePerPiece,
      subtotal: price.subtotal,
      deliveryFee: price.shipping,
      totalPrice: price.total,
      paymentMethod: "Cash On Delivery",
      orderStatus: "New Order",
    };

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        productName: order.productName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
      },
    });
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json(
      { success: false, message: "We could not place your order right now. Please try again or contact us for help." },
      { status: 500 },
    );
  }
}
