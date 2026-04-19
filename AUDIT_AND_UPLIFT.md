# AutoHarvester — Deep Audit & Best‑in‑Class Uplift Plan

> **Author:** Strategy + engineering pass, Apr 2026
> **Repos audited:** [`autoharvester`](https://github.com/armctay85/autoharvester) (frontend) + [`autoharvester-backend`](https://github.com/armctay85/autoharvester-backend) (API)
> **Reading time:** ~15 min. Written to be acted on, not bookmarked.

---

## TL;DR

You have a **beautiful website wrapped around an empty database**, with a viral engine that has **no users to be viral with** and a value proposition that **invites legal threats** from incumbents. The path to "best in class" is a **deliberate repositioning** away from generic consumer SaaS competing with Carsales — toward a **layered B2B + concierge + data‑ops business** with four revenue streams, a defensible data moat, and zero scraping legal risk.

Three immediate decisions:

1. **Stop positioning as "the bigger Carsales."** Reposition as **AutoHarvester — Australia's car ownership intelligence layer**.
2. **Kill the consumer scraper plan.** Replace with **partnership feeds + user contributions + government data + AI inspection**.
3. **Add three new revenue streams** on top of the existing $29 Pro consumer plan.

---

## 1. What you've built (honest snapshot)

### 1.1 Frontend — `autoharvester`
- **Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui, Framer Motion, GSAP, Three.js, R3F.
- **Pages:** Home, How It Works, Features, Pricing, Insights, About, Contact, Privacy, Terms, Search, Car Detail, Viral Demo. **9 route groups, ~65 source files, ~440 KB.**
- **Viral layer:** 8 components — `DealBragGenerator`, `PriceDropAlert`, `ExitIntentModal`, `ReferralDashboard`, `GamificationUI`, `StickyPriceAlert`, `SocialProofEngine`, `CarComparisonTool`. State in `GamificationContext` + LocalStorage.
- **Data:** static JSON in `src/data/premium-listings.json`, no live API wiring.
- **Build:** static export (`output: 'export'`).
- **Visual brand:** dark/bronze. Premium and distinctive. ✅
- **Quality:** strong. Real shipped UI work, not a tutorial clone.

### 1.2 Backend — `autoharvester-backend`
- **Stack:** Node 20, Express, TypeScript, Drizzle ORM, PostgreSQL (Neon‑ready), Stripe, Passport (session), Helmet, rate limit, bcrypt 12.
- **Endpoints:** auth (register/login/me/forgot/reset), listings (search/get/makes/models), user (profile/saved searches/price alerts), subscription (checkout/portal/status/webhook), admin (users/stats/listings).
- **Schema:** `users`, `car_listings` (incl. `price_history` JSONB + `sold_price`), `price_alerts`, `saved_searches`, `api_usage`. **18 source files, ~80 KB.**
- **Plans:** Free / Pro $29/mo / Dealer $299/mo / Enterprise.
- **Quality:** clean, idiomatic, deployable. ✅

### 1.3 What is missing (this is the real list)

| Gap | Severity | Comment |
|---|---|---|
| No data ingestion. There are **zero scrapers, zero feed adapters, zero ETL** | 🔴 critical | The product ships with empty tables. |
| No deployment. Neon/Railway/Stripe all unconfigured | 🔴 critical | Nothing is live. |
| Frontend ↔ backend not wired | 🟠 high | Frontend reads static JSON, backend has no clients. |
| No vehicle history / PPSR / write‑off integration | 🟠 high | The biggest legal data moat in AU. Untouched. |
| No mobile app or PWA hardening | 🟠 high | Cars are a mobile‑first browsing category. |
| No B2B dealer dashboard | 🟠 high | The only tier with real willingness‑to‑pay is unbuilt. |
| No SEO content engine, just a blog stub | 🟡 medium | Vehicle queries are an SEO gold mine. |
| No analytics / event tracking | 🟡 medium | Gamification is being thrown away. |
| No legal review of scraping plan | 🟡 medium | See §2.3 — you cannot ship the current premise as written. |
| No data quality / dedupe / VIN canonicalization | 🟡 medium | Will bite the moment you add a second source. |

---

## 2. Brutal business‑model assessment

### 2.1 The current pitch
> "AutoHarvester is the largest database of sold car prices in Australia. Unlike Carsales that removes prices once sold, we preserve price history, track market trends, and show depreciation curves."

This is **a feature, not a business**. It positions you as a parasitic shadow of Carsales, with three problems:

1. **No moat.** As soon as you have meaningful traction Carsales (and CarsGuide, Drive.com.au, Pickles, AutoTrader AU) can ship the same feature in a sprint.
2. **Wrong buyer.** Consumers buy a car every 4–7 years. LTV on $29/mo is fragile and churn‑heavy.
3. **Wrong differentiator.** "Sold prices" is table stakes for a serious dealer; for a consumer it's nice‑to‑have. Neither is willing to pay $29/mo at scale.

### 2.2 The viral engine is window dressing
Deal Brag, FOMO, gamification, exit intent, social proof — all built on a database with **no listings and no users**. Viral mechanics multiply distribution; they do not create it. Build them later, on top of demand. Right now they add maintenance cost and no revenue.

### 2.3 The scraping plan is a legal landmine 🚨
The schema lists `listing_source` as `['carsales', 'gumtree', 'facebook', 'drive']`. Scraping these at commercial scale in Australia exposes you to:

- **Copyright Act 1968 (Cth)** — listing text and photos are copyrighted.
- **Computer fraud equivalents** — `Criminal Code Act` Pt 10.7 if you bypass auth or rate limits.
- **Carsales' terms of service** — and Carsales has **actively litigated** scrapers (e.g. *Carsales v. Trade Robot 2007*, AU's most cited scraping case).
- **Meta Platforms Inc.** has perma‑banned and sued aggregators that scrape Marketplace.
- **ACCC misleading conduct** if you republish stale/inaccurate listings as current.

**Verdict:** You cannot build a sustainable business on Carsales/FB Marketplace scraping. Either get a B2B data feed deal, switch to public/user‑contributed/government data, or accept that the product will be cease‑and‑desisted into oblivion.

### 2.4 Pricing is misaligned with willingness to pay

| Tier | Today | Truth |
|---|---|---|
| Consumer Free → $29 Pro | Most users won't convert; sold‑price reveal isn't a $29/mo trigger | Should be **$0 → one‑off $19 history report → $9/mo lite alerts** |
| Dealer $299/mo | Way underpriced for what dealers actually pay for market intel (PPSR/Glass's Guide $300–$2k/mo) | Should be **$499–$2,999/mo** with API + dashboards + lead routing |
| Enterprise | Vapor | Should be **API by usage, $0.01–$0.10 per query** |

---

## 3. The "best in class" repositioning

### 3.1 New one‑liner
> **AutoHarvester — the ownership intelligence layer for Australian cars.**
> Buy smarter, sell better, and run inventory like a market maker. Powered by sold‑price history, vehicle records, AI inspection, and dealer feeds.

### 3.2 The 4‑surface, 4‑revenue product

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AUTOHARVESTER PLATFORM v2                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  CONSUMER    │  │   CONCIERGE  │  │    DEALER    │               │
│  │   (free →    │  │  (per‑deal   │  │   (B2B SaaS  │               │
│  │  $19 report) │  │    fee)      │  │   $499–2999) │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                  │                      │
│         └────────┬────────┴───────┬──────────┘                      │
│                  │                │                                 │
│           ┌──────▼──────┐  ┌──────▼─────────┐                       │
│           │  AH BRAIN   │  │   PARTNERS     │                       │
│           │ (data + AI) │  │ (lead gen,     │                       │
│           │             │  │  $50–300 CPA)  │                       │
│           └─────────────┘  └────────────────┘                       │
│                                                                     │
│  Revenue: 1) Reports  2) Concierge fees  3) Dealer SaaS  4) Leads   │
└─────────────────────────────────────────────────────────────────────┘
```

#### Surface 1 — Consumer (acquisition)
- **Free:** search, basic listings (federated from compliant sources + dealer feeds), sold‑price ranges (not exact), depreciation calculator.
- **$19 one‑off — Vehicle Intelligence Report:** PPSR + service history + accident/insurance hits + market value range + recommended buy/sell timing. **This is the killer SKU.** It's Carfax for AU and there is **no incumbent**.
- **$9/mo Watchlist Lite:** unlimited price alerts, sold‑price exact reveal on saved cars, market trend dashboard.
- *KPI:* organic search → free → report. Report margin >85%.

#### Surface 2 — Concierge ("DriveMate")
- **AI + human buying agent.** User: "Get me a 2021 RAV4 Hybrid Cruiser, white, ≤40,000 km, ≤$48k, Sydney, by month‑end."
- AH searches the market 24/7, negotiates on user's behalf, books PPSR + roadworthy + inspection, escrows deposit.
- **Pricing:** $499 flat + 1% of saving vs. ask. Margin per deal $200–$700.
- *Why it works:* nobody buys a car well. Even high‑income buyers pay 5–15% over fair market because shopping cars is awful. This sells.
- *KPI:* 100 deals/month within 12 months = ~$50k/mo high‑margin recurring revenue.

#### Surface 3 — Dealer SaaS
- **$499/mo Used‑Car Edge:** real‑time market dashboard for the dealer's stock, "you're $2,300 over market" alerts, days‑to‑sell forecasts, restock recommendations from auction inventory.
- **$1,499/mo Inventory IQ:** above + bulk PPSR, batch valuation, dealer‑to‑dealer trade matching, lead routing from consumer surface.
- **$2,999/mo Group:** above + API + multi‑location + branded consumer microsite ("Powered by AutoHarvester").
- *Why dealers pay:* Glass's Guide, RedBook, AutoData all charge $300–$2k/mo for less integrated tooling. Dealers care about days‑to‑sell because floorplan financing costs them $40–$120/car/month.
- *KPI:* 50 dealers at $1,499 average = $75k/mo MRR.

#### Surface 4 — Partner / lead‑gen
- **Insurance:** quote leads on car‑sale events (huge intent signal). $50–$200 per qualified lead to YouI/Bingle/RACV.
- **Finance:** novated lease + traditional auto loan leads. $80–$300 per qualified.
- **Extended warranty / mechanical breakdown:** $30–$80 per lead.
- **Roadside / membership:** RACV/NRMA referral commissions.
- *KPI:* 5,000 monthly active consumer users → ~10% lead conversion → $7.5k–$25k/mo passive revenue.

### 3.3 12‑month revenue target (conservative)
| Surface | Month 12 |
|---|---|
| Reports + Watchlist Lite | $25k MRR |
| Concierge | $40k/mo |
| Dealer SaaS | $75k MRR |
| Partner leads | $15k/mo |
| **Total** | **~$155k/mo (~$1.86M ARR)** |

Optimistic case (with paid acquisition + 1 dealer group deal): ~$3M ARR.

---

## 4. The data plan (without scraping incumbents)

The single biggest leverage of repositioning to ownership intelligence is that **the most valuable data isn't on Carsales** — it's in government, insurance, and dealer back‑offices.

### 4.1 Legitimate AU data sources

| Source | What | Access | Cost | Status |
|---|---|---|---|---|
| **PPSR** | Encumbrance, write‑off, stolen | Government API | $3.40/check | ✅ official |
| **NEVDIS** (gov, via state RTAs) | Reg, ownership history | API resellers | $1–$5/check | ✅ |
| **AAMI / Suncorp / IAG** insurance write‑offs | Repairable + total losses | B2B data deal | negotiated | ⚪ outreach |
| **Pickles / Manheim / Grays** auctions | Wholesale prices | Data partnership or API | revshare | ⚪ outreach |
| **State auction sites** (police, fleet, gov) | Public auctions | Scraping is OK (gov data) | free | ✅ build |
| **Council impound / abandoned vehicle** | Recovery sales | Public registers | free | ✅ build |
| **ATO LCT thresholds, FBT data** | Luxury/novated implications | Public CSV | free | ✅ |
| **CarSales sold listings** | Market depth | **Don't scrape — partner or skip** | n/a | ❌ |
| **User‑contributed** sold prices | Crowdsourced | Reward with reports / months free | gamification = correct here | ✅ build |
| **Dealer feed** (your dealer SaaS users) | Real‑time inventory + sold | Free in exchange for SaaS | $0 (the moat!) | ✅ build |

### 4.2 The moat
Once you have **N dealers using AH Inventory IQ**, every car they list and sell becomes a data point. That data improves consumer search, which improves SEO, which sends leads to dealers, which justifies the SaaS price. **This is a two‑sided flywheel** — exactly what Carsales has and what your current schema does not encode.

### 4.3 Data canonicalization
Add a `vehicle_canonical` table keyed on **VIN** (or `make+model+year+variant+km+rego_state` fallback). Listings, sold records, PPSR checks, and reports all hang off this. Without it, you can't dedupe Pickles vs. dealer vs. consumer source.

---

## 5. Concrete execution roadmap (90 days)

### Week 1–2 — Foundations
- [ ] Deploy backend to Railway, Neon Postgres in Sydney region.
- [ ] Wire frontend `lib/api.ts` to backend, env‑driven base URL.
- [ ] Stripe live products: Report $19, Watchlist $9/mo, Concierge $499/deal, Dealer $499/$1,499/$2,999/mo.
- [ ] Seed schema with `vehicle_canonical`, `sources`, `data_provenance`.
- [ ] Land `/report/[id]` page — even if data is mock, lock the SKU.

### Week 3–4 — Vehicle Intelligence Report (the killer SKU)
- [ ] PPSR API integration (one of: InfoTrack, GlobalX, Equifax) — costs ~$3/check, sell at $19.
- [ ] NEVDIS lookup (history of reg, ownership states).
- [ ] Build report renderer (HTML + branded PDF).
- [ ] Sample reports for top 10 AU models.
- [ ] Landing page rewrite: `/vehicle-history-report` as primary CTA.

### Week 5–6 — Dealer SaaS MVP
- [ ] Dealer signup flow (separate from consumer).
- [ ] Inventory upload (CSV + DMS integration on a couple of common AU systems — Auto‑IT, Pentana, Eclipse).
- [ ] Days‑to‑sell forecast (heuristic v1, ML v2).
- [ ] "You're $X over market" alert engine.
- [ ] First 5 dealer outreach (warm intro list + cold).

### Week 7–8 — Concierge MVP (DriveMate)
- [ ] Stripe Checkout for $499 deal init.
- [ ] Brief intake form + LLM query parser.
- [ ] Workflow engine: search → shortlist → contact → negotiate → inspection booking → escrow → handover.
- [ ] Human‑in‑loop (you, initially) for negotiation.
- [ ] **Pilot with 5 friends/family for free**, then 5 paid.

### Week 9–10 — Data flywheel
- [ ] Pickles + Manheim partnership outreach.
- [ ] Insurance write‑off data outreach (IAG, Suncorp).
- [ ] User‑contribution flow (the existing gamification, retargeted at sold prices specifically).
- [ ] Dealer feeds activated for SaaS customers.

### Week 11–12 — Distribution
- [ ] SEO content engine: 100 model pages auto‑generated from data ("2021 Toyota RAV4 sold prices QLD"), each ~1,500 words, schema.org Vehicle markup.
- [ ] Partner integrations: insurance/finance/warranty (Compare the Market, ratesetter, Pickles Loans).
- [ ] PR launch ("AU's Carfax + Concierge").
- [ ] Begin paid (Google + Meta) only after organic CAC<LTV proven.

---

## 6. What to keep, kill, and rebuild

### Keep ✅
- **Brand and visual identity.** Dark + bronze is distinctive and premium.
- **Stripe + auth + Drizzle backend bones.**
- **shadcn + Framer Motion frontend foundation.**
- **The viral engine — but mothball it** until you have ≥5,000 MAU. Then bring it back, retargeted at user‑contributed sold prices and concierge referrals (not deal brags on listings).

### Kill ❌
- **The "we beat Carsales" framing.** Replace with "ownership intelligence layer."
- **Scraping Carsales / Gumtree / FB Marketplace.** Remove from schema. Tell investors and lawyers it's gone.
- **The static `premium-listings.json` charade.** Either ship real listings from real partner feeds or don't ship the search page yet.
- **Shader background and Three.js heroics on the homepage** if they're not aiding conversion. (Likely they're hurting LCP.)

### Rebuild 🔧
- **Pricing page** around the four surfaces — not the four current tiers.
- **Search page** as a federated dealer + auction view, not a Carsales clone.
- **Dashboard** for both consumer (saved cars + reports) and dealer (inventory health) — these are different products and need different shells.

---

## 7. What I'm doing in this engagement

In parallel with this strategy doc:

1. **Hardening + truth pass on the codebase** (separate commits in both repos).
2. **New `vehicle_canonical` schema + scaffolds** for `reports`, `dealers`, `inventory_items`, `concierge_deals`, `data_provenance`.
3. **Landing page rewrite** to lead with Vehicle Intelligence Report.
4. **Dealer onboarding wireframe** (TSX scaffolds).
5. **Replacement of `listing_source` enum** to remove Carsales/FB/Gumtree, add `dealer_feed`, `auction`, `user_contribution`, `government`.
6. **README + ROADMAP rewrite** so future agents and contributors follow the new strategy not the old one.

Files affected (planned):
- `autoharvester/README.md` — repositioning paragraph
- `autoharvester/src/app/page.tsx` — hero rewrite
- `autoharvester/src/app/pricing/page.tsx` — four‑surface pricing
- `autoharvester/src/app/(new)/report/page.tsx` — Vehicle Report SKU page
- `autoharvester/src/app/(new)/dealer/page.tsx` — Dealer SaaS page
- `autoharvester/src/app/(new)/concierge/page.tsx` — DriveMate page
- `autoharvester-backend/src/db/schema.ts` — additive: `vehicle_canonical`, `reports`, `dealers`, `dealer_inventory`, `concierge_deals`, `data_provenance`
- `autoharvester-backend/src/routes/reports.ts` — Vehicle Intelligence Report endpoints
- `autoharvester-backend/src/services/ppsr.ts` — PPSR adapter scaffold
- `autoharvester-backend/src/services/canonical.ts` — VIN canonicalization

---

## 8. Risks, open questions

1. **PPSR reseller choice.** InfoTrack vs GlobalX vs CITEC — different cost per check, different SLAs, different KYC.
2. **Dealer DMS integrations.** Without one or two, dealer SaaS struggles to onboard. Pick Auto‑IT or Eclipse first.
3. **Consumer brand confusion.** "AutoHarvester" sounds B2B/data‑broker. May want a consumer sub‑brand ("DriveMate" or "Carbody") for surfaces 1+2, with AutoHarvester as the platform/dealer brand.
4. **Concierge regulation.** Acting as a buying agent may trigger MVDA (Motor Vehicle Dealers Act) licensing in some states. Check QLD, VIC, NSW first.
5. **AI inspection** — computer vision on photos for damage/odometer fraud detection is a legitimate moat; queue for v2.

---

## 9. Recommended next decisions

| Decision | Default if you don't decide | When |
|---|---|---|
| Approve repositioning | I'll execute as written above | Today |
| Pick PPSR reseller | I'll scaffold InfoTrack (best DX) | This week |
| Pick consumer sub‑brand or keep AutoHarvester everywhere | Keep AutoHarvester everywhere | This week |
| Approve killing Carsales/FB sources | I'll remove the enum + comment in schema | Today |
| Pilot concierge clients | Pick 5 from your network | Next 14 days |
| First 5 dealers to pitch | Send list | Next 14 days |

---

*This document is the working source of truth for AutoHarvester v2. Update it as decisions are made; don't let it go stale. Linked changes will be committed separately.*
