import { db } from "@/db";
import { clicks } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";

// Flat estimated payout per monetized click, standing in for a real ad
// network's reporting until AdSense/Adsterra postback data is wired up.
const ESTIMATED_EARNINGS_PER_MONETIZED_CLICK = 0.0021;

export async function recordClick(
  linkId: string,
  meta: { country?: string; referrer?: string; device?: string; adMode?: "direct" | "monetized" }
) {
  if (!isDbConfigured) return;
  await db.insert(clicks).values({
    linkId,
    country: meta.country,
    referrer: meta.referrer,
    device: meta.device,
    earnings:
      meta.adMode === "monetized" ? ESTIMATED_EARNINGS_PER_MONETIZED_CLICK.toString() : "0",
  });
}
