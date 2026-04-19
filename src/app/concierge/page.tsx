import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, MessageCircle, Search, Handshake, Wrench, KeyRound, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DriveMate Concierge — buying agent | AutoHarvester",
  description:
    "Brief us on the car you want. We do the searching, the negotiation, the inspections, and the paperwork. $499 flat + 1% of what we save you off ask.",
};

const steps = [
  { icon: MessageCircle, title: "5-minute brief", body: "Tell us make, year, budget, deadline. We turn it into a precise hunting spec." },
  { icon: Search, title: "We search 24/7", body: "Across dealer feeds, public auctions, and consumer listings — far wider than you can on a Saturday." },
  { icon: Handshake, title: "We negotiate", body: "Dealers know us. They open with the discount they'd reach on day five of you visiting." },
  { icon: Wrench, title: "We inspect", body: "PPSR, roadworthy, mechanical inspection — all booked and paid through escrow." },
  { icon: KeyRound, title: "You collect the keys", body: "We invoice $499 + 1% of what we saved you off ask. Average saving $2k–$8k." },
];

const fitFor = [
  "Family of four buying a 7-seat SUV",
  "Returning expats restarting an Australian life",
  "First-time car buyers who hate haggling",
  "Tradies who'd rather be on the tools",
  "Novated-lease holders stuck choosing in 5 days",
  "Anyone who has ever paid \"too much\" and knew it",
];

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/10 border border-[#b8956e]/20 text-[#b8956e] mb-5">
            <Sparkles className="w-3.5 h-3.5" /> NEW — DRIVEMATE CONCIERGE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Stop spending your weekends shopping for a car.
          </h1>
          <p className="text-lg text-[#a0a0a0] mb-8">
            Tell us what you want. We&apos;ll find it, negotiate it down, inspect it, and hand you the keys.
            <span className="block mt-3 text-[#f5f5f0]">$499 flat + 1% of what we save you. If we don&apos;t save our fee back, the success fee is waived.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/concierge/start"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold transition-colors"
            >
              Start a brief
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/contact?topic=concierge" className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] underline">
              or talk to a human first
            </Link>
          </div>
        </div>

        {/* Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">How it works</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#b8956e] text-[#0a0a0a] font-bold text-sm flex items-center justify-center">{i + 1}</div>
                <s.icon className="w-7 h-7 text-[#b8956e] mb-3" />
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-xs text-[#a0a0a0]">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="mb-20 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8">
          <h2 className="text-2xl font-bold mb-2">A worked example</h2>
          <p className="text-sm text-[#a0a0a0] mb-6">
            You want a 2021 RAV4 Cruiser Hybrid. Asking $43,990. Market median is $40,200.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/[0.06] p-5">
              <p className="text-xs uppercase tracking-wider text-[#666666] mb-2">DIY (4 weekends)</p>
              <p className="text-3xl font-bold">$43,990</p>
              <p className="text-sm text-[#a0a0a0] mt-2">You pay full ask. Lose 4 Saturdays. Hope for the best.</p>
            </div>
            <div className="rounded-xl border border-[#b8956e]/30 bg-[#b8956e]/[0.04] p-5">
              <p className="text-xs uppercase tracking-wider text-[#b8956e] font-semibold mb-2">DriveMate concierge</p>
              <p className="text-3xl font-bold">$40,500</p>
              <p className="text-sm text-[#a0a0a0] mt-2">
                Saving $3,490. AH fee = $499 + 1% × $3,490 = $534 success.
                <span className="block mt-1 font-semibold text-[#f5f5f0]">Net to you: $2,457 saved + zero weekends spent.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Fit-for */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Built for</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fitFor.map((f) => (
              <li key={f} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm text-[#a0a0a0]">
                — {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Trust */}
        <section className="text-center">
          <p className="text-sm text-[#666666] uppercase tracking-wider mb-2">Compliance</p>
          <p className="text-sm text-[#a0a0a0] max-w-2xl mx-auto">
            DriveMate operates as a licensed buying agent in QLD, VIC, and NSW under the relevant Motor Vehicle Dealers
            legislation. We hold professional indemnity cover and use third-party escrow for all settlements. WA and
            SA are friends-and-family pilot only while licensing is finalised.
          </p>
        </section>
      </div>
    </div>
  );
}
