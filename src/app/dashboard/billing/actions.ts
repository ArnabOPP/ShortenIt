"use server";

import { createHmac } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { razorpay, isRazorpayConfigured, RAZORPAY_PLAN_ID_PRO } from "@/lib/razorpay";
import { ensureRazorpayCustomer } from "@/lib/data/billing";
import { requireUserId, getDisplayUser } from "@/lib/auth";

export type CreateSubscriptionState = {
  subscriptionId?: string;
  keyId?: string;
  error?: string;
};

export async function createSubscriptionAction(): Promise<CreateSubscriptionState> {
  if (!isRazorpayConfigured || !razorpay) {
    return { error: "Payments aren't configured yet." };
  }
  if (!isDbConfigured) {
    return { error: "Database not configured yet." };
  }

  const userId = await requireUserId();
  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const email = rows[0]?.email;
  if (!email) {
    return { error: "Could not resolve your account email." };
  }

  const displayUser = await getDisplayUser();
  await ensureRazorpayCustomer(userId, email, displayUser.fullName);

  const subscription = await razorpay.subscriptions.create({
    plan_id: RAZORPAY_PLAN_ID_PRO,
    customer_notify: 1,
    total_count: 120, // 120 monthly cycles (~10 years) — Razorpay has no "until cancelled" option
    notes: { userId },
  });

  await db
    .update(users)
    .set({ razorpaySubscriptionId: subscription.id, razorpaySubscriptionStatus: subscription.status })
    .where(eq(users.id, userId));

  return { subscriptionId: subscription.id, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID };
}

export type VerifyPaymentInput = {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
};

export async function verifyPaymentAction(input: VerifyPaymentInput): Promise<{ ok: boolean; error?: string }> {
  if (!isRazorpayConfigured) return { ok: false, error: "Payments aren't configured yet." };

  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${input.razorpay_payment_id}|${input.razorpay_subscription_id}`)
    .digest("hex");

  if (expected !== input.razorpay_signature) {
    return { ok: false, error: "Payment signature verification failed." };
  }

  const userId = await requireUserId();
  // Optimistic update for immediate UI feedback — the webhook is the source of truth
  // and will reconcile the authoritative status shortly after.
  await db
    .update(users)
    .set({ plan: "pro", razorpaySubscriptionStatus: "active" })
    .where(eq(users.id, userId));

  revalidatePath("/dashboard/billing");
  return { ok: true };
}

export async function cancelSubscriptionAction(): Promise<{ ok: boolean; error?: string }> {
  if (!isRazorpayConfigured || !razorpay) return { ok: false, error: "Payments aren't configured yet." };

  const userId = await requireUserId();
  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const subscriptionId = rows[0]?.razorpaySubscriptionId;
  if (!subscriptionId) return { ok: false, error: "No active subscription found." };

  await razorpay.subscriptions.cancel(subscriptionId);
  await db
    .update(users)
    .set({ plan: "free", razorpaySubscriptionStatus: "cancelled" })
    .where(eq(users.id, userId));

  revalidatePath("/dashboard/billing");
  return { ok: true };
}
