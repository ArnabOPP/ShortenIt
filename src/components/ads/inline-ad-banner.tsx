import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

type Variant = "leaderboard" | "rectangle" | "skyscraper" | "half-page" | "full-banner";

export function InlineAdBanner({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 ${className ?? ""}`}>
      <p className="w-full text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
      {variant === "leaderboard" && (
        <>
          <div className="hidden sm:block">
            <AdsterraBanner {...ADSTERRA.banner728x90} />
          </div>
          <div className="sm:hidden">
            <AdsterraBanner {...ADSTERRA.banner320x50} />
          </div>
        </>
      )}
      {variant === "rectangle" && <AdsterraBanner {...ADSTERRA.banner300x250} />}
      {variant === "skyscraper" && <AdsterraBanner {...ADSTERRA.banner160x600} />}
      {variant === "half-page" && <AdsterraBanner {...ADSTERRA.banner160x300} />}
      {variant === "full-banner" && <AdsterraBanner {...ADSTERRA.banner468x60} />}
    </div>
  );
}
