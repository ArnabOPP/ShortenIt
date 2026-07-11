import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://shortenitpro.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Redirect/interstitial pages and the authenticated dashboard are
        // not useful (or safe) to index — short-link slugs are dynamic
        // per-user content, not canonical pages.
        disallow: ["/dashboard", "/go/", "/api/", "/expired"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
