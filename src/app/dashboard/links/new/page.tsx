"use client";

import { useActionState, useState } from "react";
import { Zap, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLinkAction, type CreateLinkState } from "./actions";

const initialState: CreateLinkState = {};

export default function CreateLinkPage() {
  const [state, formAction, pending] = useActionState(createLinkAction, initialState);
  const [adMode, setAdMode] = useState<"direct" | "monetized">("direct");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Create New Link</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Configure your destination, custom slug, and monetization settings.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6">
          <h2 className="mb-4 font-display font-semibold text-on-surface">Basic Configuration</h2>
          <div className="flex flex-col gap-4">
            <Input
              id="targetUrl"
              name="targetUrl"
              label="Target URL"
              placeholder="https://your-long-destination-url.com/path"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input id="domain" name="domain" label="Domain" defaultValue="short.it" disabled />
              <Input
                id="customSlug"
                name="customSlug"
                label="Custom Slug (optional)"
                placeholder="summer-promo-2024"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6">
          <h2 className="mb-4 font-display font-semibold text-on-surface">Ad Mode Selector</h2>
          <input type="hidden" name="adMode" value={adMode} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setAdMode("direct")}
              className={cn(
                "flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition",
                adMode === "direct" ? "border-primary" : "border-outline-variant/40"
              )}
            >
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold text-on-surface">Direct Redirect</span>
              <span className="text-sm text-on-surface-variant">
                Instant hop to destination. Best for user experience.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setAdMode("monetized")}
              className={cn(
                "flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition",
                adMode === "monetized" ? "border-primary" : "border-outline-variant/40"
              )}
            >
              <DollarSign className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-on-surface">Monetized Interstitial</span>
              <span className="text-sm text-on-surface-variant">
                Show a brief ad before redirect. Earn $ per 1k views.
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6">
          <h2 className="mb-4 font-display font-semibold text-on-surface">
            Advanced Options <span className="text-xs font-normal text-on-surface-variant">(Optional)</span>
          </h2>
          <Input id="expiresAt" name="expiresAt" type="date" label="Expiration Date" />
        </div>

        {state.error && (
          <p className="rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">
            {state.error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" size="lg">
            Discard
          </Button>
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Creating…" : "Create Link"}
          </Button>
        </div>
      </form>
    </div>
  );
}
