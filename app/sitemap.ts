import type { MetadataRoute } from "next";

const SITE_URL = "https://brightacademyci.com";

// Single-page site — one entry is all a sitemap needs here. Update if/when
// this ever grows beyond one route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
