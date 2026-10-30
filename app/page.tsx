import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Compass,
  Layers3,
  Mail,
  Megaphone,
  MousePointerClick,
  PenTool,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

const emailHref =
  "mailto:magarsara6666@gmail.com?subject=Let%27s%20grow%20my%20brand%20with%20MAGARSARA";

const services = [
  { icon: Compass, number: "01", title: "Brand strategy", text: "Clear positioning, audience direction, and messaging that gives every campaign a stronger starting point." },
  { icon: Megaphone, number: "02", title: "Social media marketing", text: "A practical content system built around your voice, your audience, and the platforms that matter." },
  { icon: Target, number: "03", title: "Paid campaigns", text: "Focused campaign concepts, creative direction, and thoughtful optimisation across the customer journey." },
  { icon: PenTool, number: "04", title: "Content & creative", text: "Scroll-stopping ideas, campaign copy, and visual direction designed to keep your brand recognisable." },
  { icon: Search, number: "05", title: "SEO & discoverability", text: "A clearer search foundation that helps the right people understand and find your business online." },
  { icon: MousePointerClick, number: "06", title: "Landing pages", text: "Focused digital experiences that connect your campaign message to a simple, confident next step." },
];

const process = [
  ["01", "Discover", "I learn what you sell, who you serve, and what is getting in the way of growth."],
  ["02", "Define", "I shape a focused strategy, message, and channel plan around your real priorities."],
  ["03", "Create", "I turn the plan into a distinct campaign system that feels unmistakably yours."],
  ["04", "Improve", "I review what is working, learn from the signals, and sharpen the next move."],
];

const faqs = [
  { question: "What kind of businesses do you work with?", answer: "I work with growing brands, founders, and service businesses that want clearer positioning and a more consistent digital presence." },
  { question: "Can you manage one campaign or support us longer term?", answer: "Both. I can shape a focused launch or campaign, or build an ongoing marketing rhythm around your goals and capacity." },
  { question: "Where does a project begin?", answer: "It begins with a short discovery conversation. I clarify the challenge, the audience, and the most valuable next step before recommending a scope." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5fff9] text-[#183328]">
      <div className="bg-gradient-to-r from-[#145c3c] via-[#258f5b] to-[#76c98f] px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white">
        Freelance digital marketing · Strategy · Content · Campaigns
      </div>

      <header className="sticky top-0 z-50 border-b border-wine/15 bg-[#f5fff9]/90 backdrop-blur-xl">
        <div className="container-page flex h-[88px] items-center justify-between gap-5">
          <a href="#top" aria-label="MAGARSARA home" className="shrink-0">
            <Image src="/images/magarsara-digital-marketing-logo.png" alt="MAGARSARA Digital Marketing" width={70} height={70} className="size-[70px] rounded-xl object-cover shadow-md" priority />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#4d6c5d] lg:flex" aria-label="Primary navigation">
            <a className="transition hover:text-wine" href="#services">Services</a>
            <a className="transition hover:text-wine" href="#approach">Approach</a>
            <a className="transition hover:text-wine" href="#about">About</a>
            <a className="transition hover:text-wine" href="#faq">FAQ</a>
          </nav>
          <a href={emailHref} className="btn-primary !min-h-10 !px-4 sm:!px-5">Start a project <ArrowRight size={15} /></a>
        </div>
      </header>

      <section id="top" className="relative border-b border-wine/10">
        <div aria-hidden="true" className="absolute -right-48 top-10 size-[34rem] rounded-full bg-[#86dca4]/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-40 bottom-0 size-96 rounded-full bg-[#b7efca]/45 blur-3xl" />
        <div className="container-page relative grid min-h-[calc(100vh-126px)] items-center gap-14 py-16 lg:grid-cols-[1.06fr_.94fr] lg:py-20">
          <div className="fade-up max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-wine/15 bg-white/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-wine shadow-sm backdrop-blur"><Sparkles size={15} /> Freelance digital marketing</div>
            <h1 className="mt-7 max-w-4xl font-serif text-[3.7rem] font-semibold leading-[0.9] tracking-[-0.055em] text-merlot sm:text-7xl lg:text-[5.8rem]">Turn attention into <span className="italic text-wine">meaningful growth.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4d6c5d] sm:text-xl">I help ambitious brands find the right message, show up with confidence, and build digital campaigns with a clear purpose.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={emailHref} className="btn-primary !min-h-14 !px-7">Tell me about your brand <ArrowRight size={17} /></a>
              <a href="#services" className="btn-secondary !min-h-14 !px-7">Explore our services</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-[#4d6c5d]">
              {["Clear strategy", "Distinct creative", "Thoughtful execution"].map((item) => <span key={item} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-wine text-white"><Check size={12} /></span>{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px] lg:mr-0">
            <div className="absolute -inset-5 rotate-3 rounded-[2.5rem] border border-wine/10 bg-blush/70" />
            <div className="relative overflow-hidden rounded-[2.3rem] bg-gradient-to-br from-[#174d35] via-[#258f5b] to-[#79cb94] p-5 text-white shadow-[0_30px_80px_rgba(23,77,53,.24)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#dff9e9]">A clearer way forward</p><p className="mt-1 font-serif text-2xl font-semibold">Your growth system</p></div>
                <span className="grid size-11 place-items-center rounded-full bg-white/10"><BarChart3 size={20} /></span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#f9fffb] p-5 text-ink sm:col-span-2">
                  <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-wine">From idea to impact</p><p className="mt-2 max-w-xs font-serif text-3xl font-semibold leading-tight text-merlot">One message. Every touchpoint.</p></div><Sparkles className="text-wine" size={24} /></div>
                  <div className="mt-7 flex h-24 items-end gap-2" aria-hidden="true">{[36, 48, 42, 64, 57, 76, 88].map((height, index) => <span key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-[#18734a] via-[#35a56a] to-[#91dfa9]" style={{ height: `${height}%` }} />)}</div>
                </div>
                <div className="rounded-3xl bg-[#123c2a]/90 p-5 ring-1 ring-white/15"><Layers3 className="text-[#bcefd0]" size={22} /><p className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-white/60">Content system</p><p className="mt-1 font-serif text-xl font-semibold">Recognisable & consistent</p></div>
                <div className="rounded-3xl bg-[#c9f3d9] p-5 text-[#174d35]"><Target size={22} /><p className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-[#174d35]/65">Campaign focus</p><p className="mt-1 font-serif text-xl font-semibold">Built around the next move</p></div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-wine/10 bg-white px-5 py-4 shadow-xl sm:-left-10"><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-wine">MAGARSARA method</p><p className="mt-1 font-serif text-lg font-semibold text-merlot">Think clearly. Create boldly.</p></div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">How I can help</p><h2 className="section-title mt-4">Marketing built to make sense.</h2></div><p className="max-w-2xl text-lg leading-8 text-[#4d6c5d] lg:ml-auto">No disconnected tactics. I connect strategy, creative, and distribution so your brand feels clear wherever people find it.</p></div>
          <div className="mt-14 grid border-l border-t border-wine/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, number, title, text }, index) => <article key={title} className={`group min-h-[310px] border-b border-r border-wine/10 p-7 transition duration-300 hover:-translate-y-1 sm:p-8 ${index % 2 === 0 ? "bg-white hover:bg-blush/45" : "bg-[#effbf4] hover:bg-mint"}`}><div className="flex items-center justify-between"><span className={`grid size-12 place-items-center rounded-2xl transition group-hover:text-white ${index % 2 === 0 ? "bg-blush text-wine group-hover:bg-wine" : "bg-mint text-leaf group-hover:bg-leaf"}`}><Icon size={21} /></span><span className={`font-serif text-lg italic ${index % 2 === 0 ? "text-wine/45" : "text-leaf/55"}`}>{number}</span></div><h3 className="mt-16 font-serif text-3xl font-semibold text-merlot">{title}</h3><p className="mt-4 text-sm leading-7 text-[#4d6c5d]">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-gradient-to-br from-[#0f3d2a] via-[#176344] to-[#3f9f69] py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute -right-48 -top-48 size-[34rem] rounded-full border-[90px] border-[#bcefd0]/15" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#d8f7e4]">The MAGARSARA point of view</p><h2 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[.98] tracking-[-.04em] sm:text-6xl">The best marketing feels clear before it feels loud.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/[.08] p-7 sm:row-span-2 sm:flex sm:flex-col sm:justify-end"><Sparkles className="text-[#d6f7e2]" size={27} /><p className="mt-14 font-serif text-3xl font-semibold">Less noise.<br />More meaning.</p><p className="mt-4 text-sm leading-7 text-white/70">I look for the idea your audience can understand, remember, and act on.</p></div>
            <div className="rounded-3xl bg-[#c9f3d9] p-7 text-[#174d35]"><p className="text-xs font-bold uppercase tracking-[.18em]">Built around you</p><p className="mt-10 font-serif text-2xl font-semibold">Your voice leads the work—not a generic template.</p></div>
            <div className="rounded-3xl bg-[#e8f9ee] p-7 text-ink"><p className="text-xs font-bold uppercase tracking-[.18em] text-wine">Made to connect</p><p className="mt-10 font-serif text-2xl font-semibold text-merlot">Every piece supports one coherent customer journey.</p></div>
          </div>
        </div>
      </section>

      <section id="approach" className="py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">How we work together</p><h2 className="section-title mt-4">A thoughtful process, minus the mystery.</h2><p className="mt-5 text-lg leading-8 text-[#4d6c5d]">You always know what I am solving, what comes next, and why it matters.</p></div>
          <div className="relative mt-16 grid gap-4 lg:grid-cols-4"><div aria-hidden="true" className="absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-wine/20 lg:block" />{process.map(([number, title, text], index) => <article key={title} className={`relative rounded-3xl border p-7 shadow-[0_14px_45px_rgba(23,77,53,.07)] ${index % 2 === 0 ? "border-wine/10 bg-white" : "border-leaf/15 bg-[#effbf4]"}`}><span className={`relative z-10 grid size-16 place-items-center rounded-full font-serif text-xl font-semibold text-white ring-8 ring-[#f5fff9] ${index % 2 === 0 ? "bg-wine" : "bg-leaf"}`}>{number}</span><h3 className="mt-9 font-serif text-3xl font-semibold text-merlot">{title}</h3><p className="mt-4 text-sm leading-7 text-[#4d6c5d]">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="container-page overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#d8f6e4] via-[#f8fffa] to-[#bcefd0] px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div><p className="eyebrow">The right first move</p><h2 className="section-title mt-4 max-w-3xl">Not sure what your marketing needs next?</h2><p className="mt-5 max-w-xl text-lg leading-8 text-[#4d6c5d]">Start with the challenge. I’ll help you turn it into a practical, focused direction for your brand.</p><a href={emailHref} className="btn-primary mt-8 !min-h-14 !px-7">Start the conversation <Mail size={17} /></a></div>
            <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-wine">A good fit if you are…</p><ul className="mt-6 space-y-4">{["Launching something new", "Ready to clarify your brand", "Posting without a clear system", "Looking for a stronger campaign idea"].map((item) => <li key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-wine/10 bg-white px-5 py-4 font-semibold text-merlot"><span>{item}</span><ChevronRight size={17} className="shrink-0 text-wine" /></li>)}</ul></div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-wine/10 bg-white py-24 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div><p className="eyebrow">Good questions</p><h2 className="section-title mt-4">Before we begin.</h2></div>
          <div className="divide-y divide-wine/10 border-t border-wine/10">{faqs.map((faq) => <details key={faq.question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl font-semibold text-merlot"><span>{faq.question}</span><span className="grid size-9 shrink-0 place-items-center rounded-full border border-wine/15 text-wine transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pt-4 leading-8 text-[#4d6c5d]">{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#123f2c] via-[#1f7a53] to-[#54b978] py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute -left-32 top-1/2 size-80 -translate-y-1/2 rounded-full border-[70px] border-white/[.04]" />
          <div className="container-page relative text-center"><p className="text-xs font-extrabold uppercase tracking-[.24em] text-[#d9f8e5]">Your next chapter can start here</p><h2 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[.95] tracking-[-.04em] sm:text-7xl">Let’s make your brand impossible to overlook.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">Tell me what you are building and where you want to go. I’ll help you find the clearest path forward.</p><a href={emailHref} className="mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-extrabold text-merlot transition hover:-translate-y-1 hover:bg-[#dff7e7]">Email MAGARSARA <ArrowRight size={17} /></a><p className="mt-5 text-sm text-white/60">magarsara6666@gmail.com</p></div>
      </section>

      <footer className="bg-[#173f2f] py-8 text-white/65">
        <div className="container-page flex flex-col items-center justify-between gap-5 text-center text-sm sm:flex-row sm:text-left"><Image src="/images/magarsara-digital-marketing-logo.png" alt="MAGARSARA Digital Marketing" width={92} height={92} className="size-[92px] rounded-2xl object-cover" /><p>Freelance digital marketing · Nepal</p><a href={emailHref} className="font-semibold text-white transition hover:text-[#d6f7e2]">Start a project →</a></div>
      </footer>
    </main>
  );
}
