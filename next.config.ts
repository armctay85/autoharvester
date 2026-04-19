import type { NextConfig } from "next";

// Note: removed `output: 'export'` — React 19 + Next 16 prerender pipeline
// breaks on the dynamic /car/[id] route during static export. Vercel runs
// Next.js as a server runtime anyway, so we don't need static export.
// If a static export is required later (Cloudflare Pages, S3, etc.), wrap
// the affected client trees in a `dynamic={ ssr: false }` boundary first.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
