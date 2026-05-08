import type { MetadataRoute } from "next";
import { practiceProfile } from "@vadentalcare/shared";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? practiceProfile.websiteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
