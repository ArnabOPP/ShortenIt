"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { links } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { requireUserId } from "@/lib/auth";

async function assertOwnership(linkId: string, userId: string) {
  const rows = await db
    .select({ id: links.id })
    .from(links)
    .where(and(eq(links.id, linkId), eq(links.ownerId, userId)))
    .limit(1);
  if (rows.length === 0) throw new Error("Link not found or you don't have access to it.");
}

export async function deleteLinkAction(linkId: string) {
  if (!isDbConfigured) return;
  const userId = await requireUserId();
  await assertOwnership(linkId, userId);
  await db.delete(links).where(eq(links.id, linkId));
  revalidatePath("/dashboard/links");
  revalidatePath("/dashboard");
}

export async function setLinkDisabledAction(linkId: string, disabled: boolean) {
  if (!isDbConfigured) return;
  const userId = await requireUserId();
  await assertOwnership(linkId, userId);
  await db.update(links).set({ disabled }).where(eq(links.id, linkId));
  revalidatePath("/dashboard/links");
}
