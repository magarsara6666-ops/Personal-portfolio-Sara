"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Minus, Plus, Sparkles, Truck } from "lucide-react";
import { formatNpr, productSubtotal, PRODUCT } from "@/lib/product";
import { OrderLink } from "@/components/order-link";

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const subtotal = productSubtotal(quantity);

  const move = (direction: number) => setActive((current) => (current + direction + PRODUCT.images.length) % PRODUCT.images.length);

  return (
    <section id="shop" className="bg-rosewater py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <div className="relative aspect-[1.05] overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <Image src={PRODUCT.images[active]} alt={`MedStitch scrub dress view ${active + 1}`} fill className="object-contain p-3" sizes="(max-width: 1024px) 100vw, 52vw" priority={active === 0} />
            <button onClick={() => move(-1)} className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-wine shadow-md backdrop-blur" aria-label="Previous product image"><ChevronLeft /></button>
            <button onClick={() => move(1)} className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-wine shadow-md backdrop-blur" aria-label="Next product image"><ChevronRight /></button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 p-2 shadow backdrop-blur">
              {PRODUCT.images.map((image, index) => <button key={image} onClick={() => setActive(index)} aria-label={`View image ${index + 1}`} className={`h-2 rounded-full transition-all ${index === active ? "w-7 bg-wine" : "w-2 bg-wine/25"}`} />)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {PRODUCT.images.map((image, index) => (
              <button key={image} onClick={() => setActive(index)} className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-white transition ${index === active ? "border-wine" : "border-transparent"}`} aria-label={`Select product image ${index + 1}`}>
                <Image src={image} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Made for healthcare heroes</p>
          <h2 className="section-title mt-4">The scrub set that works as hard as you do.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#69575e]">A polished, easy-care scrub dress for nurses, doctors and healthcare professionals—designed for comfort, movement and a confident look through every shift.</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Soft, breathable comfort", "Easy movement", "Multiple useful pockets", "Durable and easy to maintain"].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-bold"><span className="grid size-6 place-items-center rounded-full bg-blush text-wine"><Check size={14} /></span>{item}</li>)}
          </ul>

          <div className="mt-8 rounded-3xl border border-wine/10 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#7b6670]">Single set</p>
                <p className="font-serif text-4xl font-bold text-merlot">Rs 2,200</p>
              </div>
              <div className="rounded-2xl bg-blush px-4 py-3 text-right">
                <p className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wide text-wine"><Sparkles size={13} /> Best value</p>
                <p className="mt-1 font-bold text-merlot">2 sets for Rs 4,000</p>
              </div>
            </div>

            <div className="my-6 h-px bg-wine/10" />
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-bold">Quantity</p><p className="text-xs text-[#7b6670]">Bundle saving applies automatically</p></div>
              <div className="flex items-center rounded-full border border-wine/15 p-1">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid size-9 place-items-center rounded-full hover:bg-blush" aria-label="Decrease quantity"><Minus size={16} /></button>
                <span className="w-10 text-center text-sm font-extrabold">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="grid size-9 place-items-center rounded-full hover:bg-blush" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-rosewater p-4">
              <span className="text-sm font-bold">Product subtotal</span><span className="font-serif text-2xl font-bold text-wine">{formatNpr(subtotal)}</span>
            </div>
            <OrderLink quantity={quantity} className="mt-4 w-full">Order with Cash on Delivery</OrderLink>
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[#7b6670]"><Truck size={14} /> Delivery charge: Rs 100 inside KTM · Rs 120 outside KTM</p>
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-[#7b6670]">We can make your scrub in your preferred style, color, and size. Our representative will confirm your choices after ordering.</p>
        </div>
      </div>
    </section>
  );
}
