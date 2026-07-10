"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, Link as LinkIcon } from "lucide-react";

const COUNTDOWN_SECONDS = 5;

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
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-6 py-16">
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

      <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
        <div className="flex h-32 items-center justify-center rounded-xl bg-surface-container-low text-sm text-on-surface-variant">
          Ad slot
        </div>
      </div>
    </div>
  );
}
