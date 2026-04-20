import type { MetadataRoute } from "next";
import { POPULAR_MODELS, modelPathFor } from "@/data/popular-models";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://autoharvester.vercel.app";

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/cars", changeFrequency: "daily", priority: 0.9 },
  { path: "/insights", changeFrequency: "daily", priority: 0.85 },
  { path: "/vehicle-history-report", changeFrequency: "weekly", priority: 0.9 },
  { path: "/concierge", changeFrequency: "weekly", priority: 0.7 },
  { path: "/dealer", changeFrequency: "weekly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.85 },
  { path: "/features", changeFrequency: "monthly", priority: 0.6 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  const modelEntries = POPULAR_MODELS.map((m) => ({
    url: `${SITE_URL}${modelPathFor(m)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...modelEntries];
}
