import Link from "next/link";
import { Check, Home, PhoneCall } from "lucide-react";
import { formatNpr } from "@/lib/product";

export const metadata = { title: "Thank You | MedStitch" };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const orderId = typeof params.orderId === "string" ? params.orderId : "Confirmed";
  const product = typeof params.product === "string" ? params.product : "MedStitch Scrub Dress";
  const quantity = typeof params.quantity === "string" ? params.quantity : "1";
  const total = typeof params.total === "string" && Number.isFinite(Number(params.total)) ? Number(params.total) : 0;
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,#f3d7de,transparent_45%),#fcf5f4] px-5 py-12">
      <section className="w-full max-w-2xl rounded-[2.5rem] border border-white bg-white p-7 text-center shadow-soft sm:p-12">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-wine text-white shadow-lg shadow-wine/20"><Check size={38} strokeWidth={3} /></div>
        <p className="eyebrow mt-7">Order {orderId}</p><h1 className="mt-3 font-serif text-5xl font-bold leading-none tracking-tight text-merlot">Thank you for your order!</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-[#69575e]">We have received your order successfully. A confirmation email is on its way to your inbox.</p>
        <dl className="mx-auto mt-8 max-w-lg divide-y divide-wine/10 rounded-3xl bg-rosewater px-6 py-2 text-left text-sm"><div className="flex justify-between gap-5 py-4"><dt className="text-[#7b6670]">Product ordered</dt><dd className="text-right font-bold">{product}</dd></div><div className="flex justify-between gap-5 py-4"><dt className="text-[#7b6670]">Quantity</dt><dd className="font-bold">{quantity}</dd></div><div className="flex justify-between gap-5 py-4"><dt className="text-[#7b6670]">Total price</dt><dd className="font-serif text-xl font-bold text-wine">{total ? formatNpr(total) : "Confirmed by email"}</dd></div><div className="flex justify-between gap-5 py-4"><dt className="text-[#7b6670]">Payment method</dt><dd className="font-bold">Cash On Delivery</dd></div></dl>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#eed79a] bg-[#fff9e8] p-4 text-left text-sm leading-6 text-[#6e5110]"><PhoneCall className="mt-0.5 shrink-0" size={19} /><p>Our sales representative will call you soon to confirm your order.</p></div>
        <Link href="/" className="btn-primary mt-8"><Home size={17} /> Back to Home</Link>
      </section>
    </main>
  );
}
