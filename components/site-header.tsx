import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-wine/10 bg-[#fffdfc]/90 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="MedStitch home">
          <Image src="/images/medstitch-logo.png" alt="MedStitch — Wear Care, Work Better" width={72} height={72} className="size-[68px] rounded-xl object-contain" priority />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold text-[#69575e] md:flex" aria-label="Primary navigation">
          <Link href="/#shop" className="hover:text-wine">Shop</Link>
          <Link href="/#benefits" className="hover:text-wine">Why MedStitch</Link>
          <Link href="/#reviews" className="hover:text-wine">Reviews</Link>
          <Link href="/#faq" className="hover:text-wine">FAQ</Link>
        </nav>
        <Link href="/checkout" className="btn-primary !min-h-10 !px-4"><Phone size={15} /> Order now</Link>
      </div>
    </header>
  );
}
