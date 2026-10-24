"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OrderLink({ quantity = 1, children, secondary = false, className = "" }: { quantity?: number; children: React.ReactNode; secondary?: boolean; className?: string }) {
  return (
    <Link href={`/checkout?quantity=${quantity}`} className={`${secondary ? "btn-secondary" : "btn-primary"} ${className}`}>
      {children}<ArrowRight size={17} />
    </Link>
  );
}
