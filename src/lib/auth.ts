import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isClerkConfigured } from "@/lib/clerk";
import { isDbConfigured } from "@/lib/env";

const DEMO_USER_ID = "demo-user";

/**
 * Clerk owns identity, but our `links`/`domains`/`api_keys` tables have a
 * foreign key on `users.id`. Clerk doesn't push new users into our database
 * automatically, so the first time we see a given Clerk user we lazily
 * insert a matching row here (idempotent — cheap no-op on every call after
 * the first for that user).
 */
async function ensureUserSynced(userId: string): Promise<void> {
  if (!isDbConfigured) return;

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.id, userId)).limit(1);
  if (existing.length > 0) return;

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    `${userId}@unknown.local`;

  await db.insert(users).values({ id: userId, email }).onConflictDoNothing();
}

export async function requireUserId(): Promise<string> {
  if (!isClerkConfigured) return DEMO_USER_ID;
  const { userId } = await auth();
  if (!userId) return DEMO_USER_ID;
  await ensureUserSynced(userId);
  return userId;
}

export async function getDisplayUser() {
  if (!isClerkConfigured) {
    return { firstName: "Demo", fullName: "Demo User", imageUrl: null as string | null };
  }
  const user = await currentUser();
  return {
    firstName: user?.firstName ?? "there",
    fullName: user?.fullName ?? user?.username ?? "Account",
    imageUrl: user?.imageUrl ?? null,
  };
}
