"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, LoaderCircle, Minus, Plus, ShieldCheck } from "lucide-react";
import { DeliveryArea, formatNpr, orderPricing, PRODUCT } from "@/lib/product";

type Errors = Record<string, string[] | undefined>;

const colors = ["Burgundy", "Navy Blue", "Sky Blue", "Black", "Grey", "Pink", "Purple", "Green", "Other"] as const;

export function CheckoutForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuantity = Math.min(20, Math.max(1, Number(params.get("quantity")) || 1));
  const [quantity, setQuantity] = useState(initialQuantity);
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>("inside-ktm");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const pricing = useMemo(() => orderPricing(quantity, deliveryArea), [quantity, deliveryArea]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true); setError(""); setFieldErrors({});
    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: form.get("fullName"), phone: form.get("phone"), email: form.get("email"), location: form.get("location"),
      deliveryArea, size: form.get("size"), color: form.get("color"), customInstructions: form.get("customInstructions"),
      quantity, productName: PRODUCT.name, clientRequestId: crypto.randomUUID(),
    };
    try {
      const response = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) {
        setFieldErrors(data.fieldErrors || {});
        throw new Error(data.message || "Order submission failed.");
      }
      const successParams = new URLSearchParams({ orderId: data.order.orderId, product: data.order.productName, quantity: String(data.order.quantity), total: String(data.order.totalPrice) });
      router.push(`/thank-you?${successParams.toString()}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not place your order. Please try again.");
      setSubmitting(false);
    }
  }

  const fieldError = (name: string) => fieldErrors[name]?.[0];
  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-wine/10 bg-white p-6 shadow-soft sm:p-9" noValidate>
      <div className="mb-8"><p className="eyebrow">Delivery details</p><h1 className="mt-3 font-serif text-4xl font-bold text-merlot">Complete your order</h1><p className="mt-3 text-sm leading-6 text-[#69575e]">Enter your details below. You’ll pay when your order arrives.</p></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Full Name</span><input name="fullName" className="field" autoComplete="name" placeholder="Your full name" aria-invalid={!!fieldError("fullName")} />{fieldError("fullName") && <span className="mt-1 block text-xs text-red-700">{fieldError("fullName")}</span>}</label>
        <label><span className="field-label">Phone Number</span><input name="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" aria-invalid={!!fieldError("phone")} />{fieldError("phone") && <span className="mt-1 block text-xs text-red-700">{fieldError("phone")}</span>}</label>
        <label className="sm:col-span-2"><span className="field-label">Email Address</span><input name="email" className="field" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!fieldError("email")} />{fieldError("email") && <span className="mt-1 block text-xs text-red-700">{fieldError("email")}</span>}</label>
        <label className="sm:col-span-2"><span className="field-label">Exact Location</span><textarea name="location" className="field min-h-24 resize-y" autoComplete="street-address" placeholder="Kindly share your exact location" aria-invalid={!!fieldError("location")} />{fieldError("location") && <span className="mt-1 block text-xs text-red-700">{fieldError("location")}</span>}</label>
        <fieldset className="sm:col-span-2"><legend className="field-label">Delivery Area</legend><div className="grid gap-3 sm:grid-cols-2">{(["inside-ktm", "outside-ktm"] as DeliveryArea[]).map((area) => <label key={area} className={`cursor-pointer rounded-2xl border p-4 transition ${deliveryArea === area ? "border-wine bg-blush/50 ring-2 ring-wine/10" : "border-[#dfcfd4]"}`}><input type="radio" name="deliveryArea" value={area} checked={deliveryArea === area} onChange={() => setDeliveryArea(area)} className="sr-only" /><span className="flex items-center justify-between gap-3 text-sm font-bold"><span>{area === "inside-ktm" ? "Inside Kathmandu Valley" : "Outside Kathmandu Valley"}</span><span className="text-wine">{area === "inside-ktm" ? "Rs 100" : "Rs 120"}</span></span></label>)}</div></fieldset>
        <fieldset className="sm:col-span-2"><legend className="field-label">Choose Size</legend><div className="grid grid-cols-3 gap-3">{(["S", "M", "L"] as const).map((size) => <label key={size} className="cursor-pointer"><input type="radio" name="size" value={size} className="peer sr-only" /><span className="grid min-h-12 place-items-center rounded-2xl border border-[#dfcfd4] bg-white text-sm font-extrabold transition peer-checked:border-wine peer-checked:bg-blush/60 peer-checked:text-wine peer-checked:ring-2 peer-checked:ring-wine/10">{size}</span></label>)}</div>{fieldError("size") && <span className="mt-2 block text-xs text-red-700">{fieldError("size")}</span>}</fieldset>
        <fieldset className="sm:col-span-2"><legend className="field-label">Choose Color</legend><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{colors.map((color) => <label key={color} className="cursor-pointer"><input type="radio" name="color" value={color} className="peer sr-only" /><span className="flex min-h-12 items-center justify-center rounded-2xl border border-[#dfcfd4] bg-white px-3 text-center text-sm font-bold transition peer-checked:border-wine peer-checked:bg-blush/60 peer-checked:text-wine peer-checked:ring-2 peer-checked:ring-wine/10">{color}</span></label>)}</div>{fieldError("color") && <span className="mt-2 block text-xs text-red-700">{fieldError("color")}</span>}</fieldset>
        <label className="sm:col-span-2"><span className="field-label">Custom Style or Order Instructions <span className="font-normal text-[#7b6670]">(optional)</span></span><textarea name="customInstructions" className="field min-h-28 resize-y" maxLength={500} placeholder="Write how you would like your order—for example, preferred style, special color, fit, measurements, or other requests." aria-invalid={!!fieldError("customInstructions")} />{fieldError("customInstructions") && <span className="mt-1 block text-xs text-red-700">{fieldError("customInstructions")}</span>}</label>
      </div>

      <div className="my-8 h-px bg-wine/10" />
      <div className="rounded-3xl bg-rosewater p-5">
        <div className="flex items-start justify-between gap-4"><div><p className="font-serif text-xl font-bold text-merlot">{PRODUCT.name}</p><p className="mt-1 text-xs text-[#7b6670]">We will confirm your selected size, color, and custom instructions by phone</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-wine">COD</span></div>
        <div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">Quantity</span><div className="flex items-center rounded-full border border-wine/15 bg-white p-1"><button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid size-8 place-items-center rounded-full hover:bg-blush" aria-label="Decrease quantity"><Minus size={15} /></button><span className="w-9 text-center text-sm font-bold">{quantity}</span><button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="grid size-8 place-items-center rounded-full hover:bg-blush" aria-label="Increase quantity"><Plus size={15} /></button></div></div>
        <dl className="mt-5 space-y-3 border-t border-wine/10 pt-5 text-sm"><div className="flex justify-between"><dt className="text-[#69575e]">Price per piece</dt><dd className="font-bold">{formatNpr(pricing.pricePerPiece)}</dd></div><div className="flex justify-between"><dt className="text-[#69575e]">Product subtotal</dt><dd className="font-bold">{formatNpr(pricing.subtotal)}</dd></div><div className="flex justify-between"><dt className="text-[#69575e]">Delivery charge</dt><dd className="font-bold">{formatNpr(pricing.shipping)}</dd></div><div className="flex justify-between border-t border-wine/10 pt-4 text-base"><dt className="font-extrabold">Total price</dt><dd className="font-serif text-2xl font-bold text-wine">{formatNpr(pricing.total)}</dd></div></dl>
      </div>

      {error && <div role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">{error}</div>}
      <button disabled={submitting} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><LoaderCircle size={18} className="animate-spin" /> Submitting Order...</> : <><CheckCircle2 size={18} /> Order Now · {formatNpr(pricing.total)}</>}</button>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#7b6670]"><ShieldCheck size={15} /> Your details are securely submitted to MedStitch.</p>
    </form>
  );
}
