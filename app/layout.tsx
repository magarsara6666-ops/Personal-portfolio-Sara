import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedStitch Scrub Dress | Comfort for every shift",
  description: "Premium scrub sets for nurses, doctors and healthcare professionals. Order with Cash on Delivery across Nepal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
