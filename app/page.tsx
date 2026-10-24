import Image from "next/image";
import { ArrowDown, BadgeCheck, Clock3, HeartHandshake, PackageCheck, ShieldCheck, Sparkles, Stethoscope, WashingMachine } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { OrderLink } from "@/components/order-link";
import { ProductShowcase } from "@/components/product-showcase";
import { FAQ } from "@/components/faq";

const benefits = [
  { icon: Clock3, title: "All-shift comfort", text: "Soft, breathable fabric helps you stay comfortable through long hospital hours." },
  { icon: Sparkles, title: "Easy movement", text: "A practical fit designed to let you bend, walk and work without restriction." },
  { icon: PackageCheck, title: "Pockets that work", text: "Multiple pockets keep your everyday essentials close and easy to reach." },
  { icon: WashingMachine, title: "Made for repeat wear", text: "Durable, easy-maintenance scrubs built for regular washing and daily use." },
  { icon: Stethoscope, title: "Professional polish", text: "A neat silhouette that helps you look confident, clean and work-ready." },
  { icon: HeartHandshake, title: "Made your way", text: "We can make your scrub in your preferred style, color, and size." },
];

const reviews = [
  { quote: "The fabric is soft and breathable, making it comfortable to wear during long hospital shifts. I can move freely while caring for my patients.", title: "Very Comfortable for Long Shifts", name: "RN Seema Subedi" },
  { quote: "I love the quality of these scrubs. They maintain their appearance after washing and are perfect for everyday use.", title: "Great Quality and Durability", name: "RN Gita Gurung" },
  { quote: "The color and fit look great. These scrubs help me feel confident and professional at work.", title: "Stylish and Professional", name: "HA Subash KC" },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <SiteHeader />

      <section className="relative min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_80%_20%,#f3d7de_0,transparent_30%),linear-gradient(135deg,#fffdfc_0%,#fcf5f4_62%,#f7e5e8_100%)]">
        <div className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_.98fr] lg:py-16">
          <div className="fade-up relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-wine/15 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-wine backdrop-blur"><BadgeCheck size={16} /> Cash on Delivery across Nepal</div>
            <h1 className="display-title mt-7 max-w-3xl text-[3.2rem] sm:text-6xl lg:text-7xl">Comfort that keeps up with your calling.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#69575e]">MedStitch scrub dresses bring together breathable comfort, useful pockets and a polished professional fit—for nurses, doctors and healthcare teams.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderLink>Purchase now</OrderLink>
              <a href="#shop" className="btn-secondary">Explore the scrub <ArrowDown size={17} /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-[#69575e]">
              <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-wine" /> Easy order process</span>
              <span className="flex items-center gap-2"><PackageCheck size={18} className="text-wine" /> Fast delivery</span>
              <span className="flex items-center gap-2"><HeartHandshake size={18} className="text-wine" /> Customer support</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-8 rounded-full bg-blush/60 blur-3xl" />
            <div className="relative aspect-[.98] overflow-hidden rounded-[2.5rem] border border-white bg-white p-4 shadow-soft">
              <Image src="/images/medstitch-scrub-burgundy.png" alt="MedStitch scrub dresses in burgundy and blush colors" fill className="object-contain p-3" priority sizes="(max-width: 1024px) 100vw, 48vw" />
              <div className="absolute bottom-7 left-7 rounded-2xl bg-merlot px-5 py-4 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">Special bundle</p><p className="mt-1 font-serif text-2xl font-bold">2 sets · Rs 4,000</p><p className="mt-2 text-xs font-semibold text-white/75">Delivery charge: Rs 100 inside KTM · Rs 120 outside KTM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />

      <section id="benefits" className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Designed for the real workday</p><h2 className="section-title mt-4">Every detail earns its place.</h2><p className="mt-5 leading-7 text-[#69575e]">From morning rounds to the last chart update, MedStitch is designed to help you feel comfortable, capable and put together.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }, index) => <article key={title} className={`rounded-3xl border border-wine/10 p-7 transition hover:-translate-y-1 hover:shadow-soft ${index === 0 || index === 5 ? "bg-blush/50" : "bg-white"}`}><span className="grid size-12 place-items-center rounded-2xl bg-wine text-white"><Icon size={22} /></span><h3 className="mt-5 font-serif text-2xl font-bold text-merlot">{title}</h3><p className="mt-3 text-sm leading-7 text-[#69575e]">{text}</p></article>)}
          </div>
          <div className="mt-10 text-center"><OrderLink>Choose your set</OrderLink></div>
        </div>
      </section>

      <section id="reviews" className="bg-merlot py-20 text-white sm:py-28">
        <div className="container-page">
          <div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#eeb8c5]">Worn with confidence</p><h2 className="mt-4 font-serif text-4xl font-semibold leading-none tracking-tight sm:text-5xl">Healthcare professionals feel the difference.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => <figure key={review.title} className="flex flex-col rounded-3xl bg-white/10 p-7 ring-1 ring-white/15"><div className="text-[#ffd277]" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-5 flex-1 text-base leading-8 text-white/85">“{review.quote}”</blockquote><figcaption className="mt-7 border-t border-white/15 pt-5"><p className="font-serif text-xl font-bold">{review.title}</p><p className="mt-1 text-sm text-white/60">— {review.name}</p></figcaption></figure>)}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 sm:py-28"><div className="container-page max-w-4xl"><p className="eyebrow">Questions, answered</p><h2 className="section-title mt-4">Before your first shift in MedStitch.</h2><FAQ /></div></section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28"><div className="container-page relative overflow-hidden rounded-[2.5rem] bg-blush px-6 py-14 text-center sm:px-12 sm:py-20"><div className="absolute -right-16 -top-16 size-56 rounded-full bg-wine/10" /><p className="eyebrow">Ready when you are</p><h2 className="section-title mx-auto mt-4 max-w-3xl">Step into your next shift with comfort and confidence.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-[#69575e]">We can make your scrub in your preferred style, color, and size. Order today with Cash on Delivery, and our representative will call to confirm every detail.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><OrderLink>Buy now</OrderLink><OrderLink quantity={2} secondary>Get 2 for Rs 4,000</OrderLink></div></div></section>

      <footer className="border-t border-wine/10 py-8"><div className="container-page flex flex-col items-center justify-between gap-3 text-center text-sm text-[#7b6670] sm:flex-row sm:text-left"><p><strong className="font-serif text-lg text-merlot">MedStitch</strong> · Care in every stitch.</p><p>Cash on Delivery · Support: magarsara6666@gmail.com</p></div></footer>
    </main>
  );
}
