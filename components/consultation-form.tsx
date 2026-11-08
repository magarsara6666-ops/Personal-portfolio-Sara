"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const contactEmail = "digitalmarketing@magarsara.com";

export default function ConsultationForm() {
  const [sent, setSent] = useState(false);

  function submitConsultation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Free consultation request from ${form.get("name") || "a potential client"}`);
    const body = encodeURIComponent(
      [
        `Full name: ${form.get("name") || ""}`,
        `Email: ${form.get("email") || ""}`,
        `WhatsApp: ${form.get("whatsapp") || ""}`,
        `Business name: ${form.get("business") || ""}`,
        `Website or social page: ${form.get("website") || "Not provided"}`,
        `What they need help with: ${form.get("help") || ""}`,
        "",
        "Message:",
        `${form.get("message") || "Not provided"}`,
      ].join("\n"),
    );

    setSent(true);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submitConsultation} className="rounded-[2rem] bg-white p-5 text-ink shadow-[16px_18px_0_rgba(83,185,120,.16)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Full name
          <input className="field mt-2" name="name" autoComplete="name" placeholder="Enter your full name" required />
        </label>
        <label className="field-label">
          Active email
          <input className="field mt-2" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required />
        </label>
        <label className="field-label">
          WhatsApp number
          <input className="field mt-2" name="whatsapp" type="tel" autoComplete="tel" placeholder="Enter your WhatsApp number" required />
        </label>
        <label className="field-label">
          Business name
          <input className="field mt-2" name="business" autoComplete="organization" placeholder="Enter your business name" required />
        </label>
      </div>

      <label className="field-label mt-5">
        What do you need help with?
        <select className="field mt-2" name="help" defaultValue="" required>
          <option value="" disabled>Choose the closest option</option>
          <option>I need a consultation but don&apos;t know where to start</option>
          <option>I&apos;m not sure which marketing service I need</option>
          <option>I need help getting more customers</option>
          <option>I need a social media and content strategy</option>
          <option>I need help with paid advertising</option>
          <option>I need a website or landing page</option>
          <option>I need a complete digital marketing plan</option>
          <option>Something else</option>
        </select>
      </label>

      <label className="field-label mt-5">
        Website or Facebook/Instagram URL <span className="float-right font-normal text-[#789083]">Optional</span>
        <input className="field mt-2" name="website" type="url" placeholder="https://" />
      </label>

      <label className="field-label mt-5">
        Anything you want to say <span className="float-right font-normal text-[#789083]">Optional</span>
        <textarea className="field mt-2 min-h-32 resize-y" name="message" placeholder="Tell me about your business, goals, or marketing challenges" />
      </label>

      <button className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#67c98b] px-6 py-3 text-sm font-extrabold text-[#123f2c] shadow-lg shadow-[#67c98b]/25 transition hover:-translate-y-0.5 hover:bg-[#7cda9d] focus:outline-none focus:ring-4 focus:ring-[#67c98b]/30" type="submit">
        Book my free consultation <ArrowRight size={17} />
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-[#789083]">
        Submitting opens your email app with these details ready to send. Your information is not stored on this website.
      </p>
      {sent ? <p role="status" className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-leaf"><CheckCircle2 size={16} /> Your consultation email is ready to send.</p> : null}
    </form>
  );
}
