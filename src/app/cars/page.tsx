import Link from "next/link";
import type { Metadata } from "next";
import { POPULAR_MODELS, modelPathFor } from "@/data/popular-models";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All cars — prices, depreciation & trends (Australia) | Autoharvester",
  description:
    "Browse Autoharvester's coverage of every popular car make and model in the Australian market. Live prices, depreciation forecasts, and trend data.",
  alternates: { canonical: "/cars" },
};

const BODY_GROUPS = [
  "Ute",
  "SUV",
  "Wagon",
  "Sedan",
  "Hatch",
  "Coupe",
] as const;

export default function CarsIndex() {
  const grouped = BODY_GROUPS.map((body) => ({
    body,
    models: POPULAR_MODELS.filter((m) => m.bodyType === body).sort((a, b) =>
      `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
    ),
  })).filter((g) => g.models.length > 0);

  return (
    <article className="px-6 py-12 max-w-6xl mx-auto text-[#f5f5f0]">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#b8956e] mb-3">
          Australian car market coverage
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          All cars we track in Australia
        </h1>
        <p className="text-lg text-[#c8c8c0] max-w-3xl">
          Live market median, depreciation forecast, and price trend for every popular make and model in the
          Australian used-car market — refreshed continuously from listings, sold records, and dealer feeds.
        </p>
      </header>

      {grouped.map((g) => (
        <section key={g.body} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#f5f5f0]">{g.body}s</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {g.models.map((m) => (
              <li key={`${m.make}-${m.model}`}>
                <Link
                  href={modelPathFor(m)}
                  className="block rounded-xl border border-[#2a2a2a] bg-[#141414] hover:border-[#b8956e] transition-colors p-4"
                >
                  <p className="font-semibold">
                    {m.make} {m.model}
                  </p>
                  <p className="text-xs text-[#a0a0a0] mt-1">
                    {m.shortDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
