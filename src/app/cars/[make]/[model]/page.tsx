import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  POPULAR_MODELS,
  findPopularModelBySlugs,
  modelPathFor,
} from "@/data/popular-models";
import { getTrend, getDepreciation, type TrendResult } from "@/lib/api";
import { projectDepreciationFallback } from "./fallback";

// Force dynamic for the same React 19 / Next 16 SSR reason as /car/[id]:
// the root layout pulls a client-side context tree that doesn't survive
// static prerender. Pages still render server-side per request, which is
// what we want for SEO + freshness.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string; model: string }>;
}): Promise<Metadata> {
  const { make, model } = await params;
  const entry = findPopularModelBySlugs(make, model);
  if (!entry) {
    return { title: "Model not found | Autoharvester" };
  }
  const title = `${entry.make} ${entry.model} prices, depreciation & trend (Australia)`;
  const description = `${entry.shortDescription} See current ${entry.make} ${entry.model} market median, 5-year depreciation forecast, and price trend across Australia — updated continuously by Autoharvester.`;
  const path = modelPathFor(entry);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      siteName: "Autoharvester",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const FORMAT_AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

function fmtAud(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return FORMAT_AUD.format(n);
}

function describeTrend(t: TrendResult | null): {
  label: string;
  tone: "up" | "down" | "flat" | "unknown";
  blurb: string;
} {
  if (!t || t.direction === "insufficient_data") {
    return {
      label: "Establishing baseline",
      tone: "unknown",
      blurb:
        "We're still building a confident sample for this exact model in Australia. Trend will sharpen as new listings flow through.",
    };
  }
  if (t.direction === "upswing") {
    return {
      label: `Rising ${t.velocityPctPerMonth?.toFixed(1)}%/mo`,
      tone: "up",
      blurb: `Listed prices are trending upward over the last ${t.windowDays} days at roughly ${t.velocityPctPerMonth?.toFixed(1)}% per month (R² ${t.confidence}).`,
    };
  }
  if (t.direction === "downswing") {
    return {
      label: `Softening ${Math.abs(t.velocityPctPerMonth ?? 0).toFixed(1)}%/mo`,
      tone: "down",
      blurb: `Listed prices have been softening at roughly ${Math.abs(t.velocityPctPerMonth ?? 0).toFixed(1)}% per month over the last ${t.windowDays} days (R² ${t.confidence}). A buyer's window.`,
    };
  }
  return {
    label: "Holding flat",
    tone: "flat",
    blurb: `Pricing has been broadly flat over the last ${t.windowDays} days, with no statistically meaningful drift either way.`,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ make: string; model: string }>;
}) {
  const { make, model } = await params;
  const entry = findPopularModelBySlugs(make, model);
  if (!entry) notFound();

  // Try the live API first; degrade silently to the curated fallback band.
  const [trendRes, depRes] = await Promise.all([
    getTrend({ make: entry.make, model: entry.model, windowDays: 180 }),
    getDepreciation({
      make: entry.make,
      model: entry.model,
      year: entry.yearsActive[1],
      segment: entry.segment,
      purchasePrice: entry.fallbackPriceBand.mid,
      years: 5,
    }),
  ]);

  const trend = trendRes?.trend ?? null;
  const trendInfo = describeTrend(trend);
  const median = trend?.medianPrice ?? entry.fallbackPriceBand.mid;
  const fiveYearResidualPct =
    depRes?.heuristic?.fiveYearResidualPct ??
    projectDepreciationFallback(entry.fallbackPriceBand.mid, entry.segment);

  const yearsList: number[] = [];
  for (let y = entry.yearsActive[1]; y >= entry.yearsActive[0]; y--) yearsList.push(y);

  const relatedSegment = POPULAR_MODELS.filter(
    (m) => m.bodyType === entry.bodyType && m !== entry
  ).slice(0, 6);

  return (
    <article className="px-6 py-12 max-w-5xl mx-auto text-[#f5f5f0]">
      <nav className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#b8956e]">Home</Link>
        <span>/</span>
        <Link href="/cars" className="hover:text-[#b8956e]">Cars</Link>
        <span>/</span>
        <span className="text-[#f5f5f0]">{entry.make} {entry.model}</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#b8956e] mb-3">
          {entry.bodyType} · Australia
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          {entry.make} {entry.model} <span className="text-[#a0a0a0] font-normal">— prices, depreciation & trend</span>
        </h1>
        <p className="text-lg text-[#c8c8c0] max-w-3xl">{entry.shortDescription}</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6">
          <p className="text-xs uppercase tracking-widest text-[#a0a0a0]">Market median</p>
          <p className="text-3xl font-semibold mt-2">{fmtAud(median)}</p>
          <p className="text-xs text-[#a0a0a0] mt-2">
            Based on {trend?.sampleSize ?? 0} live + sold {entry.make} {entry.model} datapoints across Australia.
          </p>
        </div>
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6">
          <p className="text-xs uppercase tracking-widest text-[#a0a0a0]">Trend (last 180d)</p>
          <p
            className={[
              "text-3xl font-semibold mt-2",
              trendInfo.tone === "up" && "text-[#4ade80]",
              trendInfo.tone === "down" && "text-[#f87171]",
              trendInfo.tone === "flat" && "text-[#facc15]",
              trendInfo.tone === "unknown" && "text-[#a0a0a0]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {trendInfo.label}
          </p>
          <p className="text-xs text-[#a0a0a0] mt-2">{trendInfo.blurb}</p>
        </div>
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6">
          <p className="text-xs uppercase tracking-widest text-[#a0a0a0]">5-year residual</p>
          <p className="text-3xl font-semibold mt-2">{fiveYearResidualPct.toFixed(0)}%</p>
          <p className="text-xs text-[#a0a0a0] mt-2">
            Heuristic projection for the {entry.segment.replace(/_/g, " ")} segment from a {fmtAud(entry.fallbackPriceBand.mid)} basis.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How much should I pay for a {entry.make} {entry.model}?</h2>
        <p className="text-[#c8c8c0] leading-relaxed mb-4">
          Across the Autoharvester sample, the {entry.make} {entry.model} currently transacts in a band of{" "}
          <strong>{fmtAud(entry.fallbackPriceBand.low)}</strong> to{" "}
          <strong>{fmtAud(entry.fallbackPriceBand.high)}</strong> depending on year, kilometres, condition and variant.
          The median sits at <strong>{fmtAud(median)}</strong>. {trendInfo.blurb}
        </p>
        <p className="text-[#c8c8c0] leading-relaxed">
          Use the calculators below to project what your specific{" "}
          {entry.make} {entry.model} configuration is likely to retain over five years of ownership.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular {entry.make} {entry.model} years</h2>
        <div className="flex flex-wrap gap-2">
          {yearsList.slice(0, 12).map((y) => (
            <span
              key={y}
              className="px-3 py-1 rounded-full border border-[#2a2a2a] text-sm text-[#c8c8c0] bg-[#141414]"
            >
              {y} {entry.model}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8">
        <h2 className="text-2xl font-semibold mb-3">Get the full Vehicle Intelligence Report</h2>
        <p className="text-[#c8c8c0] leading-relaxed mb-5 max-w-3xl">
          For $19, the Autoharvester report on a specific {entry.make} {entry.model} VIN includes the full PPSR check,
          NEVDIS history (written-off / stolen / odometer), market-comparable pricing, depreciation forecast, and a
          trend chart against every comparable car traded in Australia in the last 12 months.
        </p>
        <Link
          href="/vehicle-history-report"
          className="inline-block px-5 py-3 rounded-xl bg-[#b8956e] text-[#0a0a0a] font-semibold hover:bg-[#c9a67f] transition-colors"
        >
          Run a report on a {entry.make} {entry.model}
        </Link>
      </section>

      {relatedSegment.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Other {entry.bodyType.toLowerCase()}s buyers compare</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {relatedSegment.map((m) => (
              <li key={`${m.make}-${m.model}`}>
                <Link
                  href={modelPathFor(m)}
                  className="block rounded-xl border border-[#2a2a2a] bg-[#141414] hover:border-[#b8956e] transition-colors p-4"
                >
                  <p className="font-semibold">{m.make} {m.model}</p>
                  <p className="text-xs text-[#a0a0a0] mt-1">{m.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="text-xs text-[#808080] border-t border-[#2a2a2a] pt-6">
        Pricing is indicative and updated continuously from active listings, sold records, and dealer-feed price
        history. For a transaction-grade valuation including PPSR + NEVDIS, run a Vehicle Intelligence Report.
      </footer>
    </article>
  );
}

export async function generateStaticParams() {
  return POPULAR_MODELS.map((m) => {
    const make = m.make.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const model = m.model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return { make, model };
  });
}
