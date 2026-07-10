"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, ArrowRight, Link as LinkIcon } from "lucide-react";

const COUNTDOWN_SECONDS = 5;

function AdSlot({
  image,
  caption,
  className,
}: {
  image: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 ${className ?? ""}`}>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image src={image} alt={caption} fill sizes="240px" className="object-cover" />
      </div>
      <p className="mt-3 text-center text-sm text-on-surface-variant">{caption}</p>
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
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-[240px_1fr_240px]">
      <AdSlot
        image="/images/ad-financial-banner.jpg"
        caption="Experience the next generation of financial growth."
        className="hidden lg:block"
      />

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

        <div className="flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:flex-row">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-48">
            <Image
              src="/images/ad-lifestyle-office.jpg"
              alt="Sponsored: build your digital empire"
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">Sponsored</p>
            <h3 className="font-display text-lg font-bold text-on-surface">Build your digital empire today.</h3>
            <p className="text-sm text-on-surface-variant">
              Start managing your assets with 0% commission fees for the first six months.
            </p>
            <button className="mt-1 w-fit rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary hover:opacity-90">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <AdSlot
        image="/images/ad-cloud-network.jpg"
        caption="Scale instantly for global traffic."
        className="hidden lg:block"
      />
    </div>
  );
}
