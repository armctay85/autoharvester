# AutoHarvester Website

> **🚨 Strategy update — April 2026:** Repositioned from "Carsales for sold prices" to
> **Australia's car ownership intelligence layer**. Read [`AUDIT_AND_UPLIFT.md`](./AUDIT_AND_UPLIFT.md)
> first if you're new to the project — that's the source of truth for v2 strategy, schema, and SKUs.

## Overview

AutoHarvester is a four‑surface platform:

1. **Consumer reports + watchlist** — a $19 Vehicle Intelligence Report (PPSR + NEVDIS + market
   value + negotiation hint) and a $9/mo watchlist for active buyers.
2. **DriveMate concierge** — a fixed‑fee + success‑fee buying agent.
3. **Dealer SaaS** — $499 / $1,499 / $2,999 per month inventory intelligence for AU used‑car dealers.
4. **Partner & API** — usage‑priced data feeds for insurance, finance, comparison, and novated lease.

We **do not scrape** Carsales / Gumtree / FB Marketplace. Data sources are PPSR, NEVDIS, public auctions
(Pickles/Manheim/Grays/government), dealer feeds (from our SaaS customers), user contributions, and
B2B partner feeds.

## Pages

### Killer SKU + new surfaces (v2)
- **Vehicle Report** (`/vehicle-history-report`) — the $19 SKU page.
- **Concierge** (`/concierge`) — DriveMate buying agent.
- **Dealer** (`/dealer`) — B2B SaaS landing.
- **Pricing** (`/pricing`) — four‑surface pricing.

### Legacy / general
1. **Home** (`/`) - Hero (rewritten), stats, demo search, how it works, features, pricing, testimonials, CTA
2. **How It Works** (`/how-it-works`) - 4-step process explanation and comparison table
3. **Features** (`/features`) - Full feature details with API documentation
4. **Insights** (`/insights`) - Blog/insights page with newsletter signup
5. **About** (`/about`) - Company story, values, Develoop connection
6. **Contact** (`/contact`) - Contact form with info cards
7. **Privacy** (`/privacy`) - Privacy policy
8. **Terms** (`/terms`) - Terms of service

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Design System

### Colors
- **Background**: #0a0a0a (deep charcoal)
- **Surface**: #141414 (elevated)
- **Text Primary**: #f5f5f0 (warm white)
- **Text Secondary**: #a0a0a0 (muted)
- **Accent**: #b8956e (bronze/copper)

### Typography
- Primary: Geist Sans
- Mono: Geist Mono

## Build Status

✅ Build passes (`npm run build`)
✅ All 9 pages generated
✅ Static export configured

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Build command: `npm run build`
4. Output directory: `dist`

### Static Hosting

The `dist` folder contains all static files ready for deployment:

```bash
cd /root/.openclaw/workspace/autoharvester-website/my-app/dist
# Deploy these files to any static host
```

### Manual Deployment

```bash
cd /root/.openclaw/workspace/autoharvester-website/my-app
npm install
npm run build
# dist/ folder contains deployable files
```

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   ├── layout/       # Navigation, Footer
│   ├── sections/     # Page sections
│   └── ui/           # shadcn/ui components
├── lib/              # Utilities
└── styles/           # Global styles

public/
└── logo/             # Logo and favicon
```

## Key Features

- Premium dark theme with bronze accents
- Framer Motion animations throughout
- Responsive design (mobile-first)
- SEO optimized with proper metadata
- Static export for fast loading
- Accessible UI components

## Domain

Ready for deployment to: **autoharvester.com.au**

## Notes

- All placeholder images use CSS gradients
- Contact form is static (needs backend integration)
- Newsletter signup is static (needs backend integration)
- Social links are placeholders

---

Built by Agent 8 for the AutoHarvester team.
Part of the Develoop family.
