import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, Clock, AlertTriangle, Check } from "lucide-react";
import { VehicleReportCheckoutForm } from "@/components/checkout/VehicleReportCheckoutForm";

export const metadata: Metadata = {
  title: "Vehicle Intelligence Report — $19 | AutoHarvester",
  description:
    "Australia's most thorough used-car background check. PPSR encumbrance, write-off, stolen, registration history, and market value — in one branded PDF, $19, delivered in seconds.",
};

const includes = [
  { icon: ShieldCheck, title: "PPSR financial encumbrance", body: "Reveals secured creditor claims so you don't inherit somebody else's debt." },
  { icon: AlertTriangle, title: "Write-off + stolen status", body: "Cross-checked against the Written-off Vehicle Register and national stolen vehicle data." },
  { icon: FileText, title: "Registration & ownership history", body: "Full state-by-state registration history so you can spot rebirthing or oddly short ownership chains." },
  { icon: Clock, title: "Market value range vs ask", body: "Where this exact vehicle should sit in today's market — and how to use that in negotiation." },
];

const useCases = [
  { who: "Private buyer", outcome: "Avoid the $4k-of-debt scenario where the lender takes the car back." },
  { who: "Dealer wholesaler", outcome: "Bulk-check auction inventory in 60 seconds before bidding." },
  { who: "Family member helping out", outcome: "Send Dad the PDF before he transfers $42k for the F-150." },
];

export default function VehicleHistoryReportPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/10 border border-[#b8956e]/20 text-[#b8956e] mb-5">
              THE KILLER SKU
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The vehicle background check
              <span className="block text-[#b8956e]">that should exist in Australia.</span>
            </h1>
            <p className="text-lg text-[#a0a0a0] mb-8">
              For <span className="font-semibold text-[#f5f5f0]">$19</span>, you get a complete picture of any used car&apos;s
              financial, legal, and market history before you commit. Think Carfax, but built for
              AU regulatory data and AU market pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <VehicleReportCheckoutForm />
            </div>
            <div className="flex items-center gap-6 mt-6 text-sm text-[#666666]">
              <span>✓ Delivered in seconds</span>
              <span>✓ Branded PDF you can show the seller</span>
            </div>
          </div>

          {/* Sample report card */}
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider">Sample report</p>
                <p className="text-lg font-semibold mt-1">2021 Toyota RAV4 Cruiser Hybrid</p>
                <p className="text-xs text-[#a0a0a0]">VIN ending …K8419 · NSW · 47,200 km</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                CAUTION
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <Row k="PPSR encumbrance" v="1 active (Macquarie Leasing)" warn />
              <Row k="Write-off register" v="Clear" />
              <Row k="Stolen register" v="Clear" />
              <Row k="Registration history" v="NSW since new (no inter-state hops)" />
              <Row k="Market value (today)" v="$38,400 – $42,100 (median $40,200)" />
              <Row k="This ask" v="$43,990  ·  4.5% above median" warn />
            </div>
            <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-[#f5f5f0]">
              <p className="font-semibold mb-1">Recommended action</p>
              <p className="text-[#a0a0a0]">
                Negotiate to ≤$40,500 and require seller to clear the Macquarie security
                <em> before</em> settlement. Settle through your solicitor&apos;s trust account.
              </p>
            </div>
          </div>
        </div>

        {/* Includes */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Every report includes</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {includes.map((it) => (
              <div key={it.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <it.icon className="w-7 h-7 text-[#b8956e] mb-3" />
                <h3 className="text-lg font-semibold mb-1">{it.title}</h3>
                <p className="text-sm text-[#a0a0a0]">{it.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Built for</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {useCases.map((u) => (
              <div key={u.who} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-xs uppercase tracking-wider text-[#b8956e] font-semibold">{u.who}</p>
                <p className="text-sm text-[#a0a0a0] mt-2">{u.outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compare */}
        <section className="mb-20 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8">
          <h2 className="text-2xl font-bold mb-6">Why this is different to a free PPSR check</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-[#666666] border-b border-white/[0.06]">
                <tr>
                  <th className="py-3">Check</th>
                  <th className="py-3">Government PPSR ($2)</th>
                  <th className="py-3 text-[#b8956e]">AutoHarvester Report ($19)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Encumbrance check", true, true],
                  ["Stolen + write-off", true, true],
                  ["Registration history", false, true],
                  ["Market value range", false, true],
                  ["Negotiation hint", false, true],
                  ["Branded PDF", false, true],
                  ["Linked to your watchlist", false, true],
                ].map(([k, a, b]) => (
                  <tr key={String(k)} className="border-b border-white/[0.04]">
                    <td className="py-3 text-[#f5f5f0]">{k}</td>
                    <td className="py-3 text-[#a0a0a0]">{a ? <Check className="w-4 h-4 text-green-400" /> : "—"}</td>
                    <td className="py-3 text-[#a0a0a0]">{b ? <Check className="w-4 h-4 text-green-400" /> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-3">Get your report now</h2>
          <p className="text-[#a0a0a0] mb-6">$19 — delivered in seconds, valid forever, satisfaction-guaranteed.</p>
          <div className="flex justify-center">
            <VehicleReportCheckoutForm ctaLabel="Buy my report — $19" />
          </div>
          <p className="mt-6 text-xs text-[#666666]">
            Need bulk pricing? <Link className="underline text-[#b8956e]" href="/dealer">Talk to dealer sales →</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

function Row({ k, v, warn }: { k: string; v: string; warn?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className="text-[#666666] text-xs uppercase tracking-wider">{k}</span>
      <span className={warn ? "text-amber-400 font-medium text-right" : "text-[#f5f5f0] text-right"}>{v}</span>
    </div>
  );
}
