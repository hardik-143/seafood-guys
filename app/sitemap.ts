import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/menu",
    "/build",
    "/gifts",
    "/crabs",
    "/stone-crab-season",
    "/lobster",
    "/boil",
    "/recipes",
    "/cook",
    "/delivery",
    "/wholesale",
    "/reviews",
    "/faq",
    "/our-story",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
