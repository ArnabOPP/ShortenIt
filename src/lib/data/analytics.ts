import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { links, clicks } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";

export type DailyClicks = { day: string; clicks: number };

const DEMO_CHART_DATA: DailyClicks[] = [
  { day: "1 Oct", clicks: 320 },
  { day: "5 Oct", clicks: 480 },
  { day: "10 Oct", clicks: 890 },
  { day: "15 Oct", clicks: 610 },
  { day: "20 Oct", clicks: 740 },
  { day: "25 Oct", clicks: 560 },
  { day: "30 Oct", clicks: 950 },
];

async function getUserLinkIds(userId: string): Promise<string[]> {
  const rows = await db.select({ id: links.id }).from(links).where(eq(links.ownerId, userId));
  return rows.map((r) => r.id);
}

export async function getClicksOverTime(userId: string, days = 30): Promise<DailyClicks[]> {
  if (!isDbConfigured) return DEMO_CHART_DATA;

  const linkIds = await getUserLinkIds(userId);
  if (linkIds.length === 0) return [];

  const since = new Date();
  since.setDate(since.getDate() - days);

  const rows = await db
    .select({
      day: sql<string>`to_char(${clicks.createdAt}, 'Mon DD')`.as("day"),
      dayKey: sql<string>`date_trunc('day', ${clicks.createdAt})`.as("day_key"),
      clicks: sql<number>`count(*)`.as("click_count"),
    })
    .from(clicks)
    .where(and(inArray(clicks.linkId, linkIds), gte(clicks.createdAt, since)))
    .groupBy(sql`1, 2`)
    .orderBy(sql`2`);

  return rows.map((r) => ({ day: r.day, clicks: Number(r.clicks) }));
}

export type ReferrerStat = { referrer: string; clicks: number };

export async function getTopReferrers(userId: string, limit = 5): Promise<ReferrerStat[]> {
  if (!isDbConfigured) {
    return [
      { referrer: "Direct / No referrer", clicks: 142 },
      { referrer: "twitter.com", clicks: 58 },
      { referrer: "google.com", clicks: 31 },
    ];
  }

  const linkIds = await getUserLinkIds(userId);
  if (linkIds.length === 0) return [];

  const rows = await db
    .select({
      referrer: sql<string>`coalesce(nullif(${clicks.referrer}, ''), 'Direct / No referrer')`.as("referrer"),
      clicks: sql<number>`count(*)`.as("click_count"),
    })
    .from(clicks)
    .where(inArray(clicks.linkId, linkIds))
    .groupBy(sql`1`)
    .orderBy(sql`2 desc`)
    .limit(limit);

  return rows.map((r) => ({ referrer: r.referrer, clicks: Number(r.clicks) }));
}
