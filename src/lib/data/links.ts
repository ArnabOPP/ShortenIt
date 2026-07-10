import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links, clicks } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import type { Link } from "@/db/schema";

export type DashboardStats = {
  totalLinks: number;
  totalClicks: number;
  earnings: number;
  avgCpm: number;
};

export type RecentLink = {
  id: string;
  slug: string;
  targetUrl: string;
  clicks: number;
  earnings: number;
  createdAt: Date;
};

const DEMO_STATS: DashboardStats = {
  totalLinks: 1284,
  totalClicks: 48200,
  earnings: 124.5,
  avgCpm: 2.1,
};

const DEMO_RECENT_LINKS: RecentLink[] = [
  { id: "1", slug: "react-docs", targetUrl: "https://github.com/react-icons/react-icons", clicks: 1402, earnings: 4.2, createdAt: new Date() },
  { id: "2", slug: "hacker-news", targetUrl: "https://news.ycombinator.com/item?id=1", clicks: 894, earnings: 2.15, createdAt: new Date() },
  { id: "3", slug: "yt-video-1", targetUrl: "https://www.youtube.com/watch?v=1", clicks: 3210, earnings: 8.4, createdAt: new Date() },
  { id: "4", slug: "design-insp", targetUrl: "https://dribbble.com/shots/123", clicks: 452, earnings: 0.95, createdAt: new Date() },
  { id: "5", slug: "medium-tips", targetUrl: "https://medium.com/@user/how-to", clicks: 211, earnings: 0.45, createdAt: new Date() },
];

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  if (!isDbConfigured) return DEMO_STATS;

  const userLinks = await db.select().from(links).where(eq(links.ownerId, userId));
  const linkIds = userLinks.map((l) => l.id);

  if (linkIds.length === 0) {
    return { totalLinks: 0, totalClicks: 0, earnings: 0, avgCpm: 0 };
  }

  const allClicks = await db.select().from(clicks);
  const relevant = allClicks.filter((c) => linkIds.includes(c.linkId));
  const earnings = relevant.reduce((sum, c) => sum + Number(c.earnings ?? 0), 0);

  return {
    totalLinks: userLinks.length,
    totalClicks: relevant.length,
    earnings,
    avgCpm: relevant.length > 0 ? (earnings / relevant.length) * 1000 : 0,
  };
}

export async function getRecentLinks(userId: string, limit = 5): Promise<RecentLink[]> {
  if (!isDbConfigured) return DEMO_RECENT_LINKS.slice(0, limit);

  const rows = await db
    .select()
    .from(links)
    .where(eq(links.ownerId, userId))
    .orderBy(desc(links.createdAt))
    .limit(limit);

  return rows.map((l) => ({
    id: l.id,
    slug: l.slug,
    targetUrl: l.targetUrl,
    clicks: 0,
    earnings: 0,
    createdAt: l.createdAt,
  }));
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  if (!isDbConfigured) {
    // Demo mode: only a fixed "demo" slug resolves, so the redirect/interstitial
    // flow is previewable without a database. Everything else still 404s.
    if (slug === "demo") {
      return {
        id: "demo",
        ownerId: "demo-user",
        slug: "demo",
        targetUrl: "https://example.com/demo-destination",
        domain: "short.it",
        adMode: "monetized",
        expiresAt: null,
        disabled: false,
        createdAt: new Date(),
      };
    }
    return null;
  }
  const rows = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getUserLinks(userId: string): Promise<Link[]> {
  if (!isDbConfigured) return [];
  return db.select().from(links).where(eq(links.ownerId, userId)).orderBy(desc(links.createdAt));
}

export type LinkRow = {
  id: string;
  slug: string;
  targetUrl: string;
  adMode: "direct" | "monetized";
  clicks: number;
  createdAt: Date;
};

const DEMO_TABLE_LINKS: LinkRow[] = [
  { id: "1", slug: "summer-sale-2024", targetUrl: "https://store.example.com/summer-clearance", adMode: "monetized", clicks: 1402, createdAt: new Date("2024-05-12") },
  { id: "2", slug: "product-demo-v2", targetUrl: "https://vimeo.com/721984021", adMode: "direct", clicks: 89, createdAt: new Date("2024-05-10") },
  { id: "3", slug: "app-referral", targetUrl: "https://play.google.com/store/apps/details", adMode: "monetized", clicks: 24510, createdAt: new Date("2024-04-28") },
  { id: "4", slug: "blog-post-01", targetUrl: "https://shortenit.pro/blog/growth-hacking", adMode: "direct", clicks: 312, createdAt: new Date("2024-04-22") },
  { id: "5", slug: "dev-docs", targetUrl: "https://docs.shortenit.pro/getting-started", adMode: "monetized", clicks: 1055, createdAt: new Date("2024-04-15") },
];

export async function getLinksTable(userId: string): Promise<LinkRow[]> {
  if (!isDbConfigured) return DEMO_TABLE_LINKS;

  const rows = await db.select().from(links).where(eq(links.ownerId, userId)).orderBy(desc(links.createdAt));
  return rows.map((l) => ({
    id: l.id,
    slug: l.slug,
    targetUrl: l.targetUrl,
    adMode: l.adMode,
    clicks: 0,
    createdAt: l.createdAt,
  }));
}
