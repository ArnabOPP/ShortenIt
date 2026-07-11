"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { customDomains } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { requireUserId } from "@/lib/auth";

export type AddDomainState = { error?: string };

const DOMAIN_PATTERN = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i;

export async function addDomainAction(
  _prevState: AddDomainState,
  formData: FormData
): Promise<AddDomainState> {
  const domain = String(formData.get("domain") ?? "").trim().toLowerCase();

  if (!domain || !DOMAIN_PATTERN.test(domain)) {
    return { error: "Enter a valid domain, e.g. links.yourbrand.com" };
  }

  if (!isDbConfigured) {
    return { error: "Database not configured yet." };
  }

  const existing = await db.select().from(customDomains).where(eq(customDomains.domain, domain)).limit(1);
  if (existing.length > 0) {
    return { error: `${domain} is already connected to an account.` };
  }

  const ownerId = await requireUserId();
  await db.insert(customDomains).values({ ownerId, domain, verified: false });

  revalidatePath("/dashboard/domains");
  return {};
}

export async function removeDomainAction(domainId: string) {
  if (!isDbConfigured) return;
  await db.delete(customDomains).where(eq(customDomains.id, domainId));
  revalidatePath("/dashboard/domains");
}
