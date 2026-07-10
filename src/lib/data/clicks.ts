import { db } from "@/db";
import { clicks } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";

export async function recordClick(linkId: string, meta: { country?: string; referrer?: string; device?: string }) {
  if (!isDbConfigured) return;
  await db.insert(clicks).values({
    linkId,
    country: meta.country,
    referrer: meta.referrer,
    device: meta.device,
  });
}
