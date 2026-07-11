import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

// Fixed to the far left/right edges of the viewport, only revealed once
// there is confirmed empty space beyond the centered content column so
// the ad never overlaps real page content. The reveal breakpoint is
// calculated per-variant with enough margin that the ad sits fully
// outside the widest content column:
//  - marketing pages: centered content maxes out at 1152px (max-w-6xl),
//    so both sides can show once the viewport clears ~1700px.
//  - dashboard: the 260px sidebar sits flush against the left edge, so
//    there's no room for a left ad ever; content maxes out at
//    260 + 1280 = 1540px, so only the right ad shows, and only once the
//    viewport clears ~1900px.
// The full-height strip is pointer-events-none so it can never block
// clicks on anything beneath it; only the ad itself is clickable.
export function WallpaperSkyscrapers({
  variant = "marketing",
}: {
  variant?: "marketing" | "dashboard";
}) {
  const reveal = variant === "dashboard" ? "min-[1900px]:flex" : "min-[1700px]:flex";

  return (
    <>
      {variant === "marketing" && (
        <div
          className={`pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-44 items-center justify-center ${reveal}`}
        >
          <div className="pointer-events-auto">
            <AdsterraBanner {...ADSTERRA.banner160x600} />
          </div>
        </div>
      )}
      <div
        className={`pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-44 items-center justify-center ${reveal}`}
      >
        <div className="pointer-events-auto">
          <AdsterraBanner {...ADSTERRA.banner160x600} />
        </div>
      </div>
    </>
  );
}
