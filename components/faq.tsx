"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  ["What sizes are available?", "We can make your scrub in your preferred size. Our representative will confirm your measurements and help you choose the best fit after you order."],
  ["Are the scrubs easy to wash and maintain?", "Yes. The scrubs are designed for regular washing and everyday use. For the best results, follow the washing instructions on the garment label."],
  ["Can I choose different colors and styles?", "Yes. We can make your scrub in your preferred style, color, and size to suit your taste or workplace requirements. Our representative will confirm your choices after you order."],
  ["How much is delivery?", "Delivery is Rs 100 inside Kathmandu Valley and Rs 120 outside Kathmandu Valley."],
  ["How do I pay?", "You pay with Cash on Delivery. No online payment is required when placing your order."],
  ["What happens after I order?", "You will receive an order confirmation email, and our sales representative will call you soon to confirm your preferred style, color, size, and delivery details."],
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-10 divide-y divide-wine/10 border-y border-wine/10">
      {faqs.map(([question, answer], index) => (
        <div key={question}>
          <button className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            <span>{question}</span><ChevronDown className={`shrink-0 text-wine transition ${open === index ? "rotate-180" : ""}`} size={20} />
          </button>
          {open === index && <p className="max-w-3xl pb-5 pr-10 text-sm leading-7 text-[#69575e]">{answer}</p>}
        </div>
      ))}
    </div>
  );
}
