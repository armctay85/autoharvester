// ─────────────────────────────────────────────────────────────────────────────
//  Fallback depreciation projection for the SEO model pages.
//
//  Mirrors the segment curves in autoharvester-backend/src/services/
//  depreciation-math.ts so we can render a sensible 5-year residual % even
//  when the API is unreachable. Kept as a copy (rather than imported across
//  repos) to keep the FE build self-contained on Vercel.
// ─────────────────────────────────────────────────────────────────────────────

import type { PopularModel } from "@/data/popular-models";

const CURVES: Record<PopularModel["segment"], { yearOneCliff: number; decayPerYear: number }> = {
  mainstream_petrol:    { yearOneCliff: 0.18, decayPerYear: 0.11 },
  mainstream_diesel:    { yearOneCliff: 0.16, decayPerYear: 0.10 },
  mainstream_hybrid:    { yearOneCliff: 0.15, decayPerYear: 0.09 },
  ev_premium:           { yearOneCliff: 0.30, decayPerYear: 0.13 },
  ev_mainstream:        { yearOneCliff: 0.22, decayPerYear: 0.12 },
  luxury_european:      { yearOneCliff: 0.25, decayPerYear: 0.13 },
  luxury_japanese:      { yearOneCliff: 0.18, decayPerYear: 0.09 },
  ute_4wd:              { yearOneCliff: 0.12, decayPerYear: 0.07 },
  sports_modern:        { yearOneCliff: 0.20, decayPerYear: 0.08 },
  classic_appreciating: { yearOneCliff: 0.0,  decayPerYear: -0.025 },
};

export function projectDepreciationFallback(
  purchasePrice: number,
  segment: PopularModel["segment"],
  years = 5
): number {
  const curve = CURVES[segment];
  let value = purchasePrice;
  for (let y = 1; y <= years; y++) {
    const factor = y === 1 ? 1 - curve.yearOneCliff : Math.exp(-curve.decayPerYear);
    value = value * factor;
  }
  return Number(((value / purchasePrice) * 100).toFixed(1));
}
