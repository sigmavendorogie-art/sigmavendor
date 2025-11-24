import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { buildMeta } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = buildMeta({
  title: "SigmaVendor | AI-Ready VA Agency Directory",
  description:
    "Find and certify the right virtual assistant and outsourcing agencies. Integrated with SigmaRemote for global payroll.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-transparent`}>
        <SiteHeader />
        <main className="min-h-screen bg-transparent">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

