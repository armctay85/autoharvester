import type { Metadata } from "next";
import { Check, FileText, HeartHandshake, Building2, Plug, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | AutoHarvester",
  description:
    "Four ways to use AutoHarvester: a $19 Vehicle Intelligence Report, a $9/mo watchlist, a fixed-fee buying concierge, and a B2B dealer dashboard from $499/mo.",
};

// ─────────────────────────────────────────────────────────────────────────────
//  Four-surface pricing — see AUDIT_AND_UPLIFT.md §3.2
//  1. Consumer Reports + Watchlist  (acquisition + low-friction monetisation)
//  2. Concierge "DriveMate"          (high-margin per-deal)
//  3. Dealer SaaS                    (recurring B2B, the moat)
//  4. Partner / API                  (passive)
// ─────────────────────────────────────────────────────────────────────────────

const consumerSkus = [
  {
    name: "Vehicle Intelligence Report",
    price: "$19",
    period: "one-off",
    bestFor: "Anyone about to buy a used car",
    features: [
      "PPSR encumbrance + write-off + stolen check",
      "Registration history (NEVDIS)",
      "Market value range vs ask",
      "Negotiation hint and recommended action",
      "Branded PDF you can show the seller",
    ],
    cta: { label: "Run a report", href: "/vehicle-history-report" },
    highlight: true,
  },
  {
    name: "Watchlist Lite",
    price: "$9",
    period: "/month",
    bestFor: "Active buyers tracking a shortlist",
    features: [
      "Unlimited price-drop alerts",
      "Sold-price exact reveal on saved cars",
      "Market trend dashboard",
      "Includes 1 report/mo (worth $19)",
      "Cancel anytime",
    ],
    cta: { label: "Start watching", href: "/subscribe/watchlist" },
    highlight: false,
  },
  {
    name: "Free",
    price: "$0",
    period: "forever",
    bestFor: "Browsing the market",
    features: [
      "Search federated dealer + auction inventory",
      "See sold-price ranges (not exact)",
      "Depreciation calculator",
      "Save up to 3 cars",
    ],
    cta: { label: "Browse cars", href: "/cars" },
    highlight: false,
  },
];

const conciergeSku = {
  name: "DriveMate Concierge",
  price: "$499",
  period: "+ 1% of saving",
  bestFor: "Busy buyers who don't want to haggle",
  features: [
    "Brief us on what you want — make, year, price, deadline",
    "We search 24/7 across dealer feeds + auctions + listings",
    "AI-assisted negotiation handled by AH on your behalf",
    "Inspection + roadworthy + PPSR booked + paid",
    "Average client saves $2k–$8k vs ask",
  ],
  cta: { label: "Hire a concierge", href: "/concierge" },
};

const dealerSkus = [
  {
    name: "Dealer Edge",
    price: "$499",
    period: "/month",
    bestFor: "Single-location used-car dealers",
    features: [
      "Real-time market dashboard for every car in stock",
      "\"You're $X over market\" alerts",
      "Days-to-sell forecast per vehicle",
      "Restock recommendations from auction inventory",
      "Up to 100 vehicles tracked",
    ],
    cta: { label: "Start trial", href: "/subscribe/dealer-edge" },
  },
  {
    name: "Inventory IQ",
    price: "$1,499",
    period: "/month",
    bestFor: "Multi-brand dealers running 100–400 cars",
    features: [
      "Everything in Dealer Edge",
      "Bulk PPSR + batch valuation",
      "Dealer-to-dealer trade matching",
      "Lead routing from the consumer surface",
      "Up to 500 vehicles tracked",
    ],
    cta: { label: "Start trial", href: "/subscribe/inventory-iq" },
    popular: true,
  },
  {
    name: "Group",
    price: "$2,999",
    period: "/month",
    bestFor: "Dealer groups + franchises",
    features: [
      "Everything in Inventory IQ",
      "Multi-location consolidation",
      "Branded consumer microsite",
      "Full API access (50k calls/mo)",
      "Dedicated account manager",
    ],
    cta: { label: "Talk to sales", href: "/contact?topic=group" },
  },
];

const partnerSku = {
  name: "Partner & API",
  price: "Usage-based",
  period: "$0.01–$0.10 per query",
  bestFor: "Insurers, lenders, comparison sites, novated lease providers",
  features: [
    "Vehicle history + market value REST API",
    "Lead-routing on car-purchase intent signals",
    "Fixed CPA referral commercials available",
    "Volume discounts from 10k queries/mo",
  ],
  cta: { label: "Talk to partnerships", href: "/contact?topic=partner" },
};

function SkuCard({
  name,
  price,
  period,
  bestFor,
  features,
  cta,
  highlight,
  popular,
}: {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  popular?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 border transition-all ${
        highlight || popular
          ? "border-[#b8956e]/50 bg-gradient-to-b from-[#b8956e]/[0.06] to-transparent shadow-[0_0_60px_-20px_rgba(184,149,110,0.4)]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      {(highlight || popular) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e] text-[#0a0a0a]">
          {highlight ? "Most popular" : "Most dealers pick this"}
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#f5f5f0] mb-1">{name}</h3>
      <p className="text-sm text-[#666666] mb-4">{bestFor}</p>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold text-[#f5f5f0]">{price}</span>
        <span className="text-sm text-[#a0a0a0]">{period}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#a0a0a0]">
            <Check className="w-4 h-4 text-[#b8956e] mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className={`group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-sm transition-all ${
          highlight || popular
            ? "bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
            : "border border-white/[0.15] text-[#f5f5f0] hover:bg-white/5"
        }`}
      >
        {cta.label}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#b8956e]/10 border border-[#b8956e]/20 text-[#b8956e] mb-4">
            FOUR WAYS TO USE AUTOHARVESTER
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Pick the surface that fits.
          </h1>
          <p className="text-lg text-[#a0a0a0] max-w-2xl mx-auto">
            We don&apos;t do bloated bundles. Each surface is priced where the value is —
            consumers, dealers, and partners pay for what they actually use.
          </p>
        </div>

        {/* 1. Consumer */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[#b8956e]" />
            <div>
              <h2 className="text-2xl font-semibold">1. Consumer</h2>
              <p className="text-sm text-[#666666]">Reports, watchlist, free browsing.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {consumerSkus.map((s) => <SkuCard key={s.name} {...s} />)}
          </div>
        </section>

        {/* 2. Concierge */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <HeartHandshake className="w-6 h-6 text-[#b8956e]" />
            <div>
              <h2 className="text-2xl font-semibold">2. DriveMate concierge</h2>
              <p className="text-sm text-[#666666]">
                We do the searching, the haggling, the inspections. You drive away.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SkuCard {...conciergeSku} highlight />
            </div>
            <div className="md:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold mb-3">How it works</h3>
              <ol className="space-y-3 text-sm text-[#a0a0a0]">
                <li><span className="text-[#b8956e] font-semibold">1.</span> 5-minute brief — tell us the make, the budget, the deadline.</li>
                <li><span className="text-[#b8956e] font-semibold">2.</span> We search every legitimate source 24/7 and shortlist within 48h.</li>
                <li><span className="text-[#b8956e] font-semibold">3.</span> We negotiate. (Dealers know us. They sharpen their pencil.)</li>
                <li><span className="text-[#b8956e] font-semibold">4.</span> Inspection + PPSR + roadworthy booked and paid through escrow.</li>
                <li><span className="text-[#b8956e] font-semibold">5.</span> You collect the keys. We invoice $499 + 1% of what we saved you off ask.</li>
              </ol>
              <p className="text-xs text-[#666666] mt-4">
                Average client saves $2,000–$8,000. If we don&apos;t save you at least our fee back, the success fee is waived.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Dealer */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-[#b8956e]" />
            <div>
              <h2 className="text-2xl font-semibold">3. Dealer SaaS</h2>
              <p className="text-sm text-[#666666]">
                Glass&apos;s Guide replaced. Floorplan cost cut. Days-to-sell forecast.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {dealerSkus.map((s) => <SkuCard key={s.name} {...s} />)}
          </div>
        </section>

        {/* 4. Partner / API */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Plug className="w-6 h-6 text-[#b8956e]" />
            <div>
              <h2 className="text-2xl font-semibold">4. Partner &amp; API</h2>
              <p className="text-sm text-[#666666]">
                Insurance, finance, comparison, novated lease — buy our intent + history data.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-1">{partnerSku.name}</h3>
                <p className="text-sm text-[#666666] mb-4">{partnerSku.bestFor}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{partnerSku.price}</span>
                </div>
                <span className="text-xs text-[#a0a0a0]">{partnerSku.period}</span>
              </div>
              <ul className="space-y-2 md:col-span-2">
                {partnerSku.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                    <Check className="w-4 h-4 text-[#b8956e] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={partnerSku.cta.href}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl border border-white/[0.15] text-sm font-medium hover:bg-white/5 transition-colors"
            >
              {partnerSku.cta.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Quick answers</h2>
          <div className="space-y-4">
            {[
              {
                q: "Where does your data come from?",
                a: "PPSR (government), NEVDIS (state RTA), Pickles + Manheim auctions, dealer feeds from our SaaS customers, user-contributed sold prices, and partner data feeds. We don't scrape Carsales, Gumtree, or Facebook Marketplace — see our notes on legitimate sourcing.",
              },
              {
                q: "Why $19 for a single report?",
                a: "Because PPSR alone costs us ~$3.40, NEVDIS another few dollars, and we add the market valuation, history, and negotiation guidance. Carfax in the US costs $40 USD. We're priced for AU.",
              },
              {
                q: "Is the dealer dashboard worth it?",
                a: "Floorplan finance costs a dealer $40–$120 per car per month. If we cut even 5 days off your average days-in-stock across 50 cars, the platform pays for itself by week 2. We'll prove it on your data in a 14-day free trial.",
              },
              {
                q: "Can you actually negotiate for me as a concierge?",
                a: "Yes — but the buying agent role triggers MVDA (Motor Vehicle Dealers Act) considerations in some states. We hold the right licences in QLD, VIC, and NSW. WA and SA pilots are friends-and-family only while we get cover.",
              },
            ].map((f) => (
              <details key={f.q} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 group">
                <summary className="cursor-pointer flex items-center justify-between font-medium">
                  {f.q}
                  <span className="text-[#b8956e] group-open:rotate-90 transition-transform">›</span>
                </summary>
                <p className="text-sm text-[#a0a0a0] mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
