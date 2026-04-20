import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SubscribeCheckoutForm } from "@/components/checkout/SubscribeCheckoutForm";
import type { SubscriptionTier } from "@/lib/api";

// ─────────────────────────────────────────────────────────────────────────────
//  Dynamic subscribe page — /subscribe/[tier]
//
//  Mirrors the canonical 5-SKU catalogue from
//  autoharvester-backend/src/config/stripe.ts. Edit in lockstep with the
//  backend + pricing page to avoid drift.
// ─────────────────────────────────────────────────────────────────────────────

interface TierCopy {
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySaving: string;
  trialCopy: string;
  features: string[];
}

const TIER_COPY: Record<SubscriptionTier, TierCopy> = {
  watchlist: {
    tier: "watchlist",
    name: "Watchlist Lite",
    tagline: "Active buyers tracking a shortlist",
    monthlyPrice: "$9/mo",
    yearlyPrice: "$90/yr",
    yearlySaving: "save $18",
    trialCopy: "7-day free trial, then $9/month. Cancel anytime.",
    features: [
      "Unlimited price-drop alerts",
      "Sold-price exact reveal on saved cars",
      "Market trend dashboard",
      "1 Vehicle Intelligence Report per month included",
      "Cancel anytime",
    ],
  },
  dealer_edge: {
    tier: "dealer_edge",
    name: "Dealer Edge",
    tagline: "Single-location used-car dealers",
    monthlyPrice: "$499/mo",
    yearlyPrice: "$4,990/yr",
    yearlySaving: "save $998",
    trialCopy: "14-day free trial, then $499/month. Cancel anytime.",
    features: [
      "Real-time market dashboard for every car in stock",
      '"You\'re $X over market" alerts',
      "Days-to-sell forecast per vehicle",
      "Restock recommendations from auction inventory",
      "Up to 100 vehicles tracked",
    ],
  },
  inventory_iq: {
    tier: "inventory_iq",
    name: "Inventory IQ",
    tagline: "Multi-brand dealers running 100–400 cars",
    monthlyPrice: "$1,499/mo",
    yearlyPrice: "$14,990/yr",
    yearlySaving: "save $2,998",
    trialCopy: "14-day free trial, then $1,499/month. Cancel anytime.",
    features: [
      "Everything in Dealer Edge",
      "Bulk PPSR + batch valuation",
      "Dealer-to-dealer trade matching",
      "Lead routing from the consumer surface",
      "Up to 500 vehicles tracked",
    ],
  },
  group: {
    tier: "group",
    name: "Group",
    tagline: "Dealer groups + franchises",
    monthlyPrice: "$2,999/mo",
    yearlyPrice: "$29,990/yr",
    yearlySaving: "save $5,998",
    trialCopy: "Invoiced billing available. Contact sales for POC setup.",
    features: [
      "Everything in Inventory IQ",
      "Multi-location consolidation",
      "Branded consumer microsite",
      "Full API access (50k calls/mo)",
      "Dedicated account manager",
    ],
  },
};

// Accept both canonical ("watchlist") and URL-friendly ("dealer-edge") slugs.
function resolveTier(slug: string): SubscriptionTier | null {
  const normalised = slug.toLowerCase().replace(/-/g, "_");
  if (normalised in TIER_COPY) return normalised as SubscriptionTier;
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = resolveTier(slug);
  if (!tier) return { title: "Subscribe | AutoHarvester" };
  const copy = TIER_COPY[tier];
  return {
    title: `${copy.name} — ${copy.monthlyPrice} | AutoHarvester`,
    description: copy.tagline,
  };
}

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: slug } = await params;
  const tier = resolveTier(slug);
  if (!tier) notFound();
  const copy = TIER_COPY[tier];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#f5f5f0] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to pricing
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/10 border border-[#b8956e]/20 text-[#b8956e] mb-4">
              SUBSCRIBE
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{copy.name}</h1>
            <p className="text-lg text-[#a0a0a0] mb-6">{copy.tagline}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold">{copy.monthlyPrice}</span>
              <span className="text-sm text-[#666666]">
                or {copy.yearlyPrice} ({copy.yearlySaving})
              </span>
            </div>

            <ul className="space-y-3 mb-6">
              {copy.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#d0d0c8]">
                  <Check className="w-4 h-4 text-[#b8956e] mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-[#666666]">{copy.trialCopy}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-2">Start your subscription</h2>
            <p className="text-sm text-[#a0a0a0] mb-6">
              Enter your email — we&apos;ll hand you off to Stripe to complete
              payment securely. You&apos;ll land back on AutoHarvester with your
              subscription active.
            </p>
            <SubscribeCheckoutForm
              tier={copy.tier}
              planLabel={copy.name}
              monthlyPrice={copy.monthlyPrice}
              yearlyPrice={copy.yearlyPrice}
              yearlySaving={copy.yearlySaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
