import type { MetadataRoute } from "next";
import { carePages } from "@vadentalcare/shared";
import { getSiteUrl } from "./site-url";

const siteUrl = getSiteUrl();
const supportSlugs = ["about-us", "our-team", "testimonials", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...carePages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.type === "service" ? 0.85 : 0.72
    })),
    ...supportSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
