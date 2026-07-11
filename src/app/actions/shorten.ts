"use server";

import { createAnonymousLink } from "@/lib/data/links";

export type ShortenState = { slug?: string; error?: string };

export async function shortenUrlAction(
  _prevState: ShortenState,
  formData: FormData
): Promise<ShortenState> {
  const targetUrl = String(formData.get("targetUrl") ?? "").trim();

  if (!targetUrl) {
    return { error: "Paste a URL to shorten." };
  }

  const result = await createAnonymousLink(targetUrl);
  if (!result.ok) {
    return { error: result.error };
  }

  return { slug: result.slug };
}
