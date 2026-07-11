import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import type { ApiKey } from "@/db/schema";

export async function getUserApiKeys(userId: string): Promise<ApiKey[]> {
  if (!isDbConfigured) return [];
  return db.select().from(apiKeys).where(eq(apiKeys.ownerId, userId)).orderBy(desc(apiKeys.createdAt));
}
