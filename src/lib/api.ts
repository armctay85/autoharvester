// ─────────────────────────────────────────────────────────────────────────────
//  Autoharvester API client (browser + RSC safe)
//
//  Design goals:
//    - Plug-and-play: when NEXT_PUBLIC_API_BASE is unset OR the backend is
//      unreachable, every helper returns null/empty so the UI can fall back
//      to the static demo JSON without crashing.
//    - One typed module for every backend endpoint (mirrors
//      autoharvester-backend/src/routes/insights.ts).
//    - All requests timeout in 6s so the marketing site never hangs while
//      waiting for a misconfigured API.
//
//  Backend repo:    armctay85/autoharvester-backend
//  Backend routes:  /api/insights/{trend,find/classics,find/daily,
//                                 depreciation,tco,
//                                 dealer/:id/alerts,
//                                 catalogue/classics[/:slug]}
// ─────────────────────────────────────────────────────────────────────────────

export const API_BASE: string = (
  process.env.NEXT_PUBLIC_API_BASE ?? ""
).replace(/\/$/, "");

export function apiConfigured(): boolean {
  return API_BASE.length > 0;
}

const DEFAULT_TIMEOUT_MS = 6000;

async function fetchJson<T>(path: string, init: RequestInit = {}): Promise<T | null> {
  if (!apiConfigured()) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`[api] ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] ${path} fetch failed`, err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ── Shared types (kept in sync with backend services/{trend,find,...}.ts) ──

export interface TrendResult {
  direction: "upswing" | "downswing" | "flat" | "insufficient_data";
  velocityPctPerMonth: number | null;
  confidence: number;
  sampleSize: number;
  windowDays: number;
  medianPrice: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  firstObservedAt: string | null;
  lastObservedAt: string | null;
}

export interface ClassicEntry {
  slug: string;
  make: string;
  model: string;
  generation: string | null;
  yearStart: number;
  yearEnd: number;
  category:
    | "jdm"
    | "aus_muscle"
    | "european_gt"
    | "modern_classic"
    | "future_classic"
    | "us_muscle"
    | "supercar";
  notes: string;
}

export interface ClassicCandidate {
  modelId: string;
  make: string;
  model: string;
  generation: string | null;
  yearStart: number;
  yearEnd: number;
  category: ClassicEntry["category"];
  era: "pre1975" | "1975-1989" | "1990s" | "2000s" | "2010s+";
  notes: string;
  inBudget: boolean;
  referencePrice: number | null;
  trend: TrendResult;
  riskScore: number;
  score: number;
}

export interface DailyCandidate {
  listingId: string;
  make: string;
  model: string;
  year: number;
  price: number;
  odometer: number | null;
  location: string | null;
  state: string | null;
  bodyType: string | null;
  fuelType: string | null;
  marketDeltaAud: number | null;
  marketDeltaPct: number | null;
  trendDirection: string;
  trendVelocityPctPerMonth: number | null;
  fiveYearResidualPct: number | null;
  score: number;
}

export type Segment =
  | "mainstream_petrol"
  | "mainstream_diesel"
  | "mainstream_hybrid"
  | "ev_premium"
  | "ev_mainstream"
  | "luxury_european"
  | "luxury_japanese"
  | "ute_4wd"
  | "sports_modern"
  | "classic_appreciating";

// ── Endpoint helpers ────────────────────────────────────────────────────────

export interface TrendQuery {
  canonicalId?: string;
  make?: string;
  model?: string;
  year?: number;
  windowDays?: number;
  narrate?: boolean;
}

export async function getTrend(q: TrendQuery) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v !== undefined && v !== null) params.set(k, String(v));
  }
  return fetchJson<{
    label: string;
    trend: TrendResult;
    narrative: unknown | null;
    ai_enabled: boolean;
  }>(`/api/insights/trend?${params.toString()}`);
}

export interface FindClassicsBody {
  budget?: number;
  budgetMax?: number;
  era?: "pre1975" | "1975-1989" | "1990s" | "2000s" | "2010s+";
  purpose?: "driver" | "investment" | "weekend";
  risk?: "safe" | "balanced" | "aggressive";
  narrate?: boolean;
}

export async function findClassics(body: FindClassicsBody) {
  return fetchJson<{
    criteria: FindClassicsBody;
    count: number;
    candidates: ClassicCandidate[];
    narrative: unknown | null;
    ai_enabled: boolean;
  }>(`/api/insights/find/classics`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface FindDailyBody {
  budgetMax: number;
  budgetMin?: number;
  yearMin?: number;
  bodyType?: string;
  fuelType?: string;
  segment?: Segment;
  state?: string;
  maxKilometres?: number;
  limit?: number;
  narrate?: boolean;
}

export async function findDaily(body: FindDailyBody) {
  return fetchJson<{
    criteria: FindDailyBody;
    count: number;
    candidates: DailyCandidate[];
    narrative: unknown | null;
    ai_enabled: boolean;
  }>(`/api/insights/find/daily`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface DepreciationBody {
  make: string;
  model: string;
  year: number;
  segment: Segment;
  purchasePrice?: number;
  years?: number;
}

export async function getDepreciation(body: DepreciationBody) {
  return fetchJson<{
    make: string;
    model: string;
    year: number;
    segment: Segment;
    currentMarketMedianAud: number | null;
    trend: TrendResult;
    purchaseBasisAud: number | null;
    heuristic: {
      segment: Segment;
      schedule: Array<{
        year: number;
        valueStart: number;
        valueEnd: number;
        annualLoss: number;
        cumulativeLossPct: number;
      }>;
      fiveYearResidualPct: number;
    } | null;
  }>(`/api/insights/depreciation`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface TcoBody {
  purchasePrice: number;
  segment: Segment;
  years?: number;
  annualKilometres?: number;
  fuelLitresPer100km?: number;
  fuelPricePerLitre?: number;
  insurancePerYear?: number;
  regoPerYear?: number;
  servicingPerYear?: number;
}

export async function getTco(body: TcoBody) {
  return fetchJson<{
    yearly: Array<{
      year: number;
      depreciation: number;
      insurance: number;
      rego: number;
      servicing: number;
      fuel: number;
      total: number;
    }>;
    totals: {
      years: number;
      totalAud: number;
      perYearAud: number;
      perKmAud: number;
    };
  }>(`/api/insights/tco`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function listClassicCatalogue() {
  return fetchJson<{ count: number; items: ClassicEntry[] }>(
    `/api/insights/catalogue/classics`
  );
}

export async function getClassicBySlug(slug: string) {
  return fetchJson<{ entry: ClassicEntry; trend: TrendResult }>(
    `/api/insights/catalogue/classics/${encodeURIComponent(slug)}`
  );
}

export async function getDealerAlerts(dealerId: string, narrate = false) {
  const q = narrate ? "?narrate=true" : "";
  return fetchJson<{
    dealerId: string;
    count: number;
    alerts: Array<{
      listingId: string;
      externalId: string;
      make: string;
      model: string;
      year: number;
      listingPriceAud: number;
      marketMedianAud: number | null;
      deltaAud: number | null;
      deltaPct: number | null;
      band:
        | "over_market_steep"
        | "over_market_mild"
        | "on_market"
        | "under_market_mild"
        | "under_market_steep"
        | "unknown";
      trendDirection: string;
      trendVelocityPctPerMonth: number | null;
      recommendation: string;
    }>;
    narrative: unknown | null;
    ai_enabled: boolean;
  }>(`/api/insights/dealer/${encodeURIComponent(dealerId)}/alerts${q}`);
}

// ── Checkout (Stripe) ───────────────────────────────────────────────────────
//
// Two modes:
//   1. One-off Vehicle Intelligence Report ($19) — no auth required.
//   2. Subscription (watchlist / dealer_edge / inventory_iq / group) — requires
//      an authenticated user, so the caller gets the checkout URL back only
//      when the backend can identify them via cookie/JWT.
//
// Both helpers throw on failure (so the calling component can surface a
// toast/error) rather than returning null — unlike the read helpers above,
// silently degrading a payment flow would be confusing for the user.

export interface ReportCheckoutInput {
  vin?: string;
  rego?: string;
  state?: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
  reportId?: string;
}

function requireApiBase(): string {
  if (!apiConfigured()) {
    throw new Error(
      "Checkout is not available right now — API base URL is not configured."
    );
  }
  return API_BASE;
}

export async function startReportCheckout(
  input: ReportCheckoutInput
): Promise<CheckoutResponse> {
  const base = requireApiBase();
  const res = await fetch(`${base}/api/subscription/checkout/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Report checkout failed (${res.status}): ${text}`);
  }
  return (await res.json()) as CheckoutResponse;
}

export type SubscriptionTier =
  | "watchlist"
  | "dealer_edge"
  | "inventory_iq"
  | "group";

export async function startSubscriptionCheckout(
  tier: SubscriptionTier,
  interval: "month" | "year"
): Promise<CheckoutResponse> {
  const base = requireApiBase();
  const res = await fetch(`${base}/api/subscription/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "include",
    body: JSON.stringify({ tier, interval }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Subscription checkout failed (${res.status}): ${text}`);
  }
  return (await res.json()) as CheckoutResponse;
}

/**
 * Guest subscription checkout — no auth required.
 *
 * The backend provisions (or links) a user row on webhook receipt, so the
 * shopper only needs to type their email once on the marketing site. They
 * can later set a password via the magic-link / reset flow.
 */
export async function startGuestSubscriptionCheckout(
  email: string,
  tier: SubscriptionTier,
  interval: "month" | "year"
): Promise<CheckoutResponse> {
  const base = requireApiBase();
  const res = await fetch(`${base}/api/subscription/checkout/guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, tier, interval }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Guest checkout failed (${res.status}): ${text}`);
  }
  return (await res.json()) as CheckoutResponse;
}

// ── Health / diagnostics ────────────────────────────────────────────────────

export async function apiHealth(): Promise<{
  configured: boolean;
  reachable: boolean;
  base: string;
}> {
  if (!apiConfigured()) return { configured: false, reachable: false, base: "" };
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
    return { configured: true, reachable: res.ok, base: API_BASE };
  } catch {
    return { configured: true, reachable: false, base: API_BASE };
  }
}
