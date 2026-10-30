import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAGARSARA | Freelance Digital Marketing",
  description: "Freelance digital strategy, content, campaigns, SEO, and landing pages for ambitious brands ready to grow with clarity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
