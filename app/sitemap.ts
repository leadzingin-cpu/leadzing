import { MetadataRoute } from "next";

// Bump this constant when the homepage content meaningfully changes —
// using `new Date()` at build time would signal a content change on
// every deploy regardless of whether anything actually changed,
// which wastes crawl-budget trust with search engines.
const LAST_MODIFIED = "2026-07-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://leadzing.in";

  return [
    {
      url: baseUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}