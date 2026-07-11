import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { users, links } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { razorpay } from "@/lib/razorpay";

export const FREE_PLAN_MONTHLY_LINK_LIMIT = 50;

export type BillingInfo = {
  plan: "free" | "pro";
  razorpaySubscriptionId: string | null;
  razorpaySubscriptionStatus: string | null;
};

export async function getBillingInfo(userId: string): Promise<BillingInfo> {
  if (!isDbConfigured) return { plan: "free", razorpaySubscriptionId: null, razorpaySubscriptionStatus: null };

  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const user = rows[0];
  return {
    plan: (user?.plan as "free" | "pro") ?? "free",
    razorpaySubscriptionId: user?.razorpaySubscriptionId ?? null,
    razorpaySubscriptionStatus: user?.razorpaySubscriptionStatus ?? null,
  };
}

export type QuotaCheck = { allowed: boolean; used: number; limit: number | null; plan: "free" | "pro" };

export async function checkLinkQuota(userId: string): Promise<QuotaCheck> {
  const { plan } = await getBillingInfo(userId);
  if (plan === "pro") return { allowed: true, used: 0, limit: null, plan };
  if (!isDbConfigured) return { allowed: true, used: 0, limit: FREE_PLAN_MONTHLY_LINK_LIMIT, plan };

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(links)
    .where(and(eq(links.ownerId, userId), gte(links.createdAt, startOfMonth)));

  const used = Number(rows[0]?.count ?? 0);
  return { allowed: used < FREE_PLAN_MONTHLY_LINK_LIMIT, used, limit: FREE_PLAN_MONTHLY_LINK_LIMIT, plan };
}

export async function ensureRazorpayCustomer(userId: string, email: string, name: string): Promise<string> {
  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const existing = rows[0]?.razorpayCustomerId;
  if (existing) return existing;

  if (!razorpay) throw new Error("Razorpay is not configured");

  // Razorpay validates `name` against a person/business-name format — an
  // email address or empty string gets rejected with a 400, so fall back to
  // a generic name when Clerk hasn't captured a real one yet.
  const safeName = /^[a-zA-Z][a-zA-Z .'-]{1,49}$/.test(name) ? name : "ShortenIt Customer";

  const customer = await razorpay.customers.create({ name: safeName, email, fail_existing: 0 });
  await db.update(users).set({ razorpayCustomerId: customer.id }).where(eq(users.id, userId));
  return customer.id;
}
