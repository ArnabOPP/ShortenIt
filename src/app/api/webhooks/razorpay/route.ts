import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";

const ACTIVE_EVENTS = new Set(["subscription.activated", "subscription.charged", "subscription.resumed"]);
const INACTIVE_EVENTS = new Set([
  "subscription.cancelled",
  "subscription.completed",
  "subscription.halted",
  "subscription.expired",
  "subscription.paused",
]);

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const signatureBuf = Buffer.from(signature, "utf8");
  if (expectedBuf.length !== signatureBuf.length) return false;
  return timingSafeEqual(expectedBuf, signatureBuf);
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret || !isDbConfigured) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifySignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody) as {
    event: string;
    payload?: { subscription?: { entity?: { id: string; status: string; notes?: { userId?: string } } } };
  };

  const subscriptionEntity = payload.payload?.subscription?.entity;
  const userId = subscriptionEntity?.notes?.userId;

  if (userId && (ACTIVE_EVENTS.has(payload.event) || INACTIVE_EVENTS.has(payload.event))) {
    await db
      .update(users)
      .set({
        plan: ACTIVE_EVENTS.has(payload.event) ? "pro" : "free",
        razorpaySubscriptionStatus: subscriptionEntity?.status ?? payload.event,
      })
      .where(eq(users.id, userId));
  }

  return NextResponse.json({ received: true });
}
