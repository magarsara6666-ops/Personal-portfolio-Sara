import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Headphones, PackageCheck, ShieldCheck } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata = { title: "Checkout | MedStitch" };

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-rosewater py-7 sm:py-12">
      <div className="container-page">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-wine"><ArrowLeft size={16} /> Back to MedStitch</Link>
          <Link href="/" aria-label="MedStitch home"><Image src="/images/medstitch-logo.png" alt="MedStitch — Wear Care, Work Better" width={88} height={88} className="size-20 rounded-2xl object-contain shadow-sm" priority /></Link>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_.72fr]">
          <Suspense fallback={<div className="h-[700px] animate-pulse rounded-[2rem] bg-white" />}><CheckoutForm /></Suspense>
          <aside className="space-y-5 lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-[2rem] bg-merlot text-white shadow-soft"><div className="relative aspect-[1.5] bg-white"><Image src="/images/medstitch-scrub-burgundy.png" alt="MedStitch scrub dresses" fill className="object-contain p-3" sizes="(max-width: 1024px) 100vw, 38vw" /></div><div className="p-7"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#eeb8c5]">Your MedStitch order</p><h2 className="mt-3 font-serif text-3xl font-bold">Made in your style, color, and size.</h2><p className="mt-3 text-sm leading-7 text-white/70">Our representative will call soon after your order to confirm your preferences and delivery details.</p></div></div>
            <div className="grid gap-3 rounded-3xl border border-wine/10 bg-white p-6 text-sm font-bold text-[#69575e]"><p className="flex items-center gap-3"><BadgeCheck className="text-wine" size={19} /> Cash on Delivery</p><p className="flex items-center gap-3"><PackageCheck className="text-wine" size={19} /> Fast delivery across Nepal</p><p className="flex items-center gap-3"><Headphones className="text-wine" size={19} /> Phone confirmation and support</p><p className="flex items-center gap-3"><ShieldCheck className="text-wine" size={19} /> Secure server-side order processing</p></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
