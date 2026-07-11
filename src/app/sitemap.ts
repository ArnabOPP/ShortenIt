import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://shortenitpro.vercel.app";

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/pricing", priority: 0.9 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/api-status", priority: 0.2 },
  ].map((route) => ({
    url: `${appUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
