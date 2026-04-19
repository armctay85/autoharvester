import type { Metadata } from "next";
import Link from "next/link";
import { Building2, TrendingDown, Clock, Database, BellRing, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Dealer SaaS — Inventory IQ | AutoHarvester",
  description:
    "Cut floorplan cost. Forecast days-to-sell. Auto-spot over-market stock. The market intelligence layer for AU used-car dealers — from $499/mo. Replaces Glass's Guide and pays for itself.",
};

const features = [
  { icon: TrendingDown, title: "\"You're $X over market\" alerts", body: "Live re-pricing nudges on every car the moment competing inventory shifts. No more $4k-too-high cars sitting on the floor." },
  { icon: Clock, title: "Days-to-sell forecasts", body: "Bayesian model trained on dealer + auction sold history. Tells you which cars will move in 14 days and which will sit 90." },
  { icon: Database, title: "Restock from auctions", body: "Live Pickles + Manheim feed, scored against your sell-through history. Bid only on stock the model says you'll move at the margin you need." },
  { icon: BellRing, title: "Lead routing from consumers", body: "Watchlist + Vehicle Report users browsing your stock get warm-routed to you with full context. Real intent, not tyre-kickers." },
];

const proofPoints = [
  { stat: "$40–$120", label: "floorplan cost per car per month — what you stop bleeding on aged stock" },
  { stat: "5 days", label: "average reduction in days-in-stock our pilot dealers achieve in month 1" },
  { stat: "14 days", label: "free trial on your real inventory before you pay a cent" },
];

const integrations = ["Auto-IT", "Pentana DMS", "Eclipse", "Titan DMS", "EasyCars", "RevolutionParts", "Manual CSV"];

export default function DealerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/10 border border-[#b8956e]/20 text-[#b8956e] mb-5">
              <Building2 className="w-3.5 h-3.5" /> FOR USED-CAR DEALERS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The market intelligence layer
              <span className="block text-[#b8956e]">your DMS doesn&apos;t give you.</span>
            </h1>
            <p className="text-lg text-[#a0a0a0] mb-8">
              Stop pricing on gut. Stop bleeding floorplan cost on aged stock. Stop
              losing leads to the dealer who saw the price drop first. AutoHarvester gives you
              real-time market position on every car you sell — and the next 200 you should buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dealer/demo"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold transition-colors"
              >
                Book a 14-day free trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact?topic=dealer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 font-medium transition-colors"
              >
                Talk to dealer sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-[#666666]">
              <span>✓ No credit card for trial</span>
              <span>✓ 30-min onboarding</span>
              <span>✓ Cancel any time, no contract</span>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-wider text-[#666666]">Inventory IQ snapshot</p>
              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">LIVE</span>
            </div>
            <div className="space-y-3">
              {[
                { car: "2022 Hilux SR5 (DC, auto)", price: "$58,990", warn: "+$2,100 vs market", days: "47", status: "warn" },
                { car: "2020 Ranger Wildtrak", price: "$54,500", warn: "On market", days: "12", status: "ok" },
                { car: "2019 RAV4 Cruiser Hyb", price: "$32,990", warn: "+$1,300", days: "63", status: "warn" },
                { car: "2023 Outlander PHEV", price: "$48,990", warn: "−$800 (under)", days: "8", status: "good" },
              ].map((row) => (
                <div key={row.car} className="flex items-center justify-between text-xs gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex-1 min-w-0">
                    <div className="text-[#f5f5f0] font-medium truncate">{row.car}</div>
                    <div className="text-[#666666] mt-0.5">{row.days} days in stock</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#f5f5f0] font-semibold">{row.price}</div>
                    <div className={
                      row.status === "warn"
                        ? "text-amber-400"
                        : row.status === "good"
                          ? "text-emerald-400"
                          : "text-[#a0a0a0]"
                    }>{row.warn}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dealer/demo" className="block mt-4 text-center text-xs text-[#b8956e] hover:text-[#c9a67f] underline">
              See it on your own inventory →
            </Link>
          </div>
        </div>

        {/* Proof points */}
        <section className="grid md:grid-cols-3 gap-5 mb-20">
          {proofPoints.map((p) => (
            <div key={p.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="text-3xl font-bold text-[#b8956e]">{p.stat}</div>
              <p className="text-sm text-[#a0a0a0] mt-2">{p.label}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">What you get</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <f.icon className="w-7 h-7 text-[#b8956e] mb-3" />
                <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-[#a0a0a0]">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing strip */}
        <section className="mb-20 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8">
          <h2 className="text-2xl font-bold mb-6">Plans</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Dealer Edge", price: "$499", scope: "Up to 100 cars · single location" },
              { name: "Inventory IQ", price: "$1,499", scope: "Up to 500 cars · trade matching · bulk PPSR", popular: true },
              { name: "Group", price: "$2,999", scope: "Multi-location · API · branded microsite · CSM" },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-5 ${p.popular ? "border-[#b8956e]/40 bg-[#b8956e]/[0.04]" : "border-white/[0.08]"}`}
              >
                {p.popular && <div className="text-xs uppercase tracking-wider text-[#b8956e] font-semibold mb-2">Most popular</div>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="text-2xl font-bold mt-1">{p.price}<span className="text-sm font-normal text-[#a0a0a0]">/mo</span></div>
                <p className="text-sm text-[#a0a0a0] mt-2">{p.scope}</p>
                <Link href="/dealer/demo" className="mt-4 inline-flex items-center gap-1 text-sm text-[#b8956e] hover:text-[#c9a67f]">
                  Free trial <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">DMS integrations</h2>
          <p className="text-sm text-[#a0a0a0] mb-5">
            Out-of-the-box connectors for the AU dealer stack. CSV import means anything else still works on day one.
          </p>
          <div className="flex flex-wrap gap-2">
            {integrations.map((i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-white/[0.04] border border-white/[0.08] text-[#a0a0a0]">
                <Check className="w-3 h-3 inline-block mr-1.5 text-[#b8956e]" />
                {i}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center rounded-2xl border border-[#b8956e]/30 bg-gradient-to-b from-[#b8956e]/[0.06] to-transparent p-10">
          <h2 className="text-3xl font-bold mb-3">Try it on your real inventory.</h2>
          <p className="text-[#a0a0a0] mb-6 max-w-2xl mx-auto">
            14-day free trial, no card. We&apos;ll consume your stock list (or DMS feed) and show you, on day one,
            which cars are over-market and what you&apos;d save in floorplan by re-pricing or moving them.
          </p>
          <Link
            href="/dealer/demo"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold transition-colors"
          >
            Book a demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </div>
    </div>
  );
}
