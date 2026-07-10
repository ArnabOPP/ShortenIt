"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { requireUserId } from "@/lib/auth";

export type CreateLinkState = { error?: string };

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function createLinkAction(
  _prevState: CreateLinkState,
  formData: FormData
): Promise<CreateLinkState> {
  const targetUrl = String(formData.get("targetUrl") ?? "").trim();
  const customSlug = String(formData.get("customSlug") ?? "").trim();
  const adMode = formData.get("adMode") === "monetized" ? "monetized" : "direct";
  const expiresAtRaw = String(formData.get("expiresAt") ?? "").trim();

  if (!targetUrl || !isValidUrl(targetUrl)) {
    return { error: "Enter a valid destination URL, including https://" };
  }

  const slug = customSlug || nanoid(7);
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
    return { error: "Custom slug can only contain letters, numbers, - and _" };
  }

  if (!isDbConfigured) {
    // Demo mode: no database configured yet, so we can't persist the link.
    redirect("/dashboard/links");
  }

  const existing = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
  if (existing.length > 0) {
    return { error: `The slug "${slug}" is already taken.` };
  }

  const ownerId = await requireUserId();
  await db.insert(links).values({
    ownerId,
    slug,
    targetUrl,
    adMode,
    expiresAt: expiresAtRaw ? new Date(expiresAtRaw) : null,
  });

  redirect("/dashboard/links");
}
