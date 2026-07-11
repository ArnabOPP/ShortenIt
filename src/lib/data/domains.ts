import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { customDomains } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import type { CustomDomain } from "@/db/schema";

export async function getUserDomains(userId: string): Promise<CustomDomain[]> {
  if (!isDbConfigured) return [];
  return db
    .select()
    .from(customDomains)
    .where(eq(customDomains.ownerId, userId))
    .orderBy(desc(customDomains.createdAt));
}
