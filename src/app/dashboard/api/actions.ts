"use server";

import { randomBytes, createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { isDbConfigured } from "@/lib/env";
import { requireUserId } from "@/lib/auth";

export type GenerateKeyState = { newKey?: string; error?: string };

export async function generateApiKeyAction(
  _prevState: GenerateKeyState,
  formData: FormData
): Promise<GenerateKeyState> {
  const name = String(formData.get("name") ?? "").trim() || "Untitled key";

  if (!isDbConfigured) {
    return { error: "Database not configured yet." };
  }

  const secret = randomBytes(24).toString("hex");
  const plaintext = `sk_live_${secret}`;
  const keyHash = createHash("sha256").update(plaintext).digest("hex");
  const keyPreview = plaintext.slice(-4);

  const ownerId = await requireUserId();
  await db.insert(apiKeys).values({ ownerId, name, keyHash, keyPreview });

  revalidatePath("/dashboard/api");
  return { newKey: plaintext };
}

export async function revokeApiKeyAction(keyId: string) {
  if (!isDbConfigured) return;
  await db.delete(apiKeys).where(eq(apiKeys.id, keyId));
  revalidatePath("/dashboard/api");
}
