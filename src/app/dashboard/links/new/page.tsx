"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Zap, DollarSign, Eye, Link2, Gauge, TrendingUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLinkAction, type CreateLinkState } from "./actions";

const initialState: CreateLinkState = {};

export default function CreateLinkPage() {
  const [state, formAction, pending] = useActionState(createLinkAction, initialState);
  const [adMode, setAdMode] = useState<"direct" | "monetized">("direct");
  const [customSlug, setCustomSlug] = useState("");

  const slugPreview = customSlug || "summer-promo-2024";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-surface">Create New Link</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Configure your destination, custom slug, and monetization settings.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
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
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
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

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-on-surface">
                <Eye className="h-4 w-4" /> Social Card Preview
              </span>
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-on-primary">
                LIVE PREVIEW
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-outline-variant/30">
              <div className="relative h-32 w-full">
                <Image
                  src="/images/create-link-preview.jpg"
                  alt="Social card preview"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="bg-surface-container-lowest p-3">
                <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="h-2 w-2 rounded-sm bg-primary" /> SHORT.IT/{slugPreview.toUpperCase()}
                </p>
                <p className="mt-1 font-display font-semibold text-on-surface">Destination Title from…</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  This is where the meta description of your target URL will appear.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-2">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <Gauge className="h-4 w-4" /> Estimated Redirect Time
                </span>
                <span className="font-medium text-on-surface">~120ms</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-2">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <TrendingUp className="h-4 w-4" /> Estimated RPM
                </span>
                <span className="font-medium text-on-surface">
                  {adMode === "monetized" ? "$2.10" : "$0.00"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-surface-container-low px-3 py-2">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <Link2 className="h-4 w-4" /> short.it/{slugPreview}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl bg-surface-container-low p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-on-surface">Pro Tip</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                Using a custom domain increases click-through rates by up to 34% compared to generic short
                links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
