import { practiceProfile } from "@vadentalcare/shared";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    practiceProfile.websiteUrl
  ).replace(/\/$/, "");
}
