# AutoHarvester Website

A premium car market intelligence website for autoharvester.com.au.

## Overview

AutoHarvester is the largest database of sold car prices in Australia. Unlike Carsales that removes prices once sold, we preserve price history, track market trends, and show depreciation curves.

## Pages Built

1. **Home** (`/`) - Hero, stats, how it works preview, features preview, pricing preview, testimonials, CTA
2. **How It Works** (`/how-it-works`) - 4-step process explanation and comparison table
3. **Features** (`/features`) - Full feature details with API documentation
4. **Pricing** (`/pricing`) - 4-tier pricing with FAQ
5. **Insights** (`/insights`) - Blog/insights page with newsletter signup
6. **About** (`/about`) - Company story, values, Develoop connection
7. **Contact** (`/contact`) - Contact form with info cards
8. **Privacy** (`/privacy`) - Privacy policy
9. **Terms** (`/terms`) - Terms of service

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
