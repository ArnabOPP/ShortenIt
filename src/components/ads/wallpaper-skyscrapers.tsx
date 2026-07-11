import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

// Must match the sidebar width in src/components/dashboard/sidebar.tsx.
const SIDEBAR_WIDTH = 260;

// Fixed to the far left/right edges of the viewport, only revealed once
// there is confirmed empty space beyond the centered content column so
// the ad never overlaps real page content.
//  - marketing pages: content is centered at max-w-6xl (1152px) with equal
//    margins on both sides, so both ads reveal once the viewport clears
//    ~1600px (leaves ~48px of clear buffer past the 176px ad column).
//  - dashboard: content is centered *within the space right of the 260px
//    sidebar* (max-w-[1280px]), so the same equal-margin logic applies —
//    the left ad is offset to start right after the sidebar instead of at
//    the true viewport edge, and both ads reveal once the viewport clears
//    ~2000px (260 + 1280 + 2*176 + buffer).
// The full-height strip is pointer-events-none so it can never block
// clicks on anything beneath it; only the ad itself is clickable.
export function WallpaperSkyscrapers({
  variant = "marketing",
}: {
  variant?: "marketing" | "dashboard";
}) {
  const isDashboard = variant === "dashboard";
  const reveal = isDashboard ? "min-[2000px]:flex" : "min-[1600px]:flex";

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-y-0 z-10 hidden w-44 items-center justify-center ${reveal}`}
        style={isDashboard ? { left: SIDEBAR_WIDTH } : { left: 0 }}
      >
        <div className="pointer-events-auto">
          <AdsterraBanner {...ADSTERRA.banner160x600} />
        </div>
      </div>
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
