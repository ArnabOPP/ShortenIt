"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, Link as LinkIcon } from "lucide-react";
import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { AdsterraSocialBar } from "@/components/ads/adsterra-social-bar";
import { AdsterraPopunder } from "@/components/ads/adsterra-popunder";
import { ADSTERRA } from "@/lib/ads/adsterra";

const COUNTDOWN_SECONDS = 5;

function AdSlot({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 ${className ?? ""}`}>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
      <div className="flex justify-center overflow-hidden rounded-xl">
        <AdsterraBanner {...ADSTERRA.banner160x600} />
      </div>
    </div>
  );
}

export function Interstitial({ targetUrl }: { targetUrl: string }) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.href = targetUrl;
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, targetUrl]);

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;
  const canSkip = secondsLeft <= 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-[176px_1fr_176px]">
      {/* Site-scoped ad scripts — only load on this monetized redirect page,
          never on marketing pages. */}
      <AdsterraSocialBar />
      <AdsterraPopunder />

      <AdSlot className="hidden lg:block" />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <LinkIcon className="h-5 w-5" strokeWidth={2.5} />
          ShortenIt
        </div>

        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6">
          <div className="flex items-center justify-between text-sm font-semibold text-primary">
            <span>LINK IS ALMOST READY</span>
            <span className="text-on-surface-variant">{secondsLeft}s remaining</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 rounded-xl bg-surface-container-low p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">Redirecting to:</p>
            <p className="mt-1 break-all font-medium text-primary">{targetUrl}</p>
          </div>

          <button
            disabled={!canSkip}
            onClick={() => (window.location.href = targetUrl)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-high py-3 text-sm font-semibold text-on-surface-variant transition disabled:cursor-not-allowed disabled:opacity-60 enabled:bg-primary enabled:text-on-primary"
          >
            {canSkip ? "Continue" : `Skip Ad in ${secondsLeft}s…`}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-outline-variant/20 pt-4 text-xs font-medium text-secondary">
            <ShieldCheck className="h-4 w-4" />
            VERIFIED SAFE LINK BY SHORTENIT SECURITY
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
          <p className="w-full text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
          <div className="hidden sm:block">
            <AdsterraBanner {...ADSTERRA.banner728x90} />
          </div>
          <div className="sm:hidden">
            <AdsterraBanner {...ADSTERRA.banner320x50} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
          <p className="w-full text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
          <AdsterraBanner {...ADSTERRA.banner300x250} />
        </div>
      </div>

      <AdSlot className="hidden lg:block" />
    </div>
  );
}
