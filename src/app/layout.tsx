import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoHarvester | See What Cars Actually Sold For",
  description: "The largest database of sold car prices in Australia. Unlike Carsales that removes prices once sold, we preserve price history, track market trends, and show depreciation curves. Make smarter car buying and selling decisions.",
  keywords: ["car prices", "sold cars", "price history", "Australia", "used cars", "market trends", "depreciation", "car valuation"],
  authors: [{ name: "AutoHarvester" }],
  icons: {
    icon: '/logo/favicon.svg',
  },
  openGraph: {
    title: "AutoHarvester | See What Cars Actually Sold For",
    description: "The largest database of sold car prices in Australia. Track price history, market trends, and make smarter decisions.",
    type: "website",
    locale: "en_AU",
    siteName: "AutoHarvester",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoHarvester | See What Cars Actually Sold For",
    description: "The largest database of sold car prices in Australia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://autoharvester.com.au",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-[#f5f5f0]`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
