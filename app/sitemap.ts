import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/crabs", "/lobster", "/boil", "/cook", "/wholesale", "/our-story", "/gallery", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
