import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

// Fixed to the far left/right edges of the viewport, filling the empty
// space outside the centered max-w-6xl content column on wide screens.
export function WallpaperSkyscrapers() {
  return (
    <>
      <div className="fixed left-2 top-1/2 z-20 hidden -translate-y-1/2 2xl:block">
        <AdsterraBanner {...ADSTERRA.banner160x600} />
      </div>
      <div className="fixed right-2 top-1/2 z-20 hidden -translate-y-1/2 2xl:block">
        <AdsterraBanner {...ADSTERRA.banner160x600} />
      </div>
    </>
  );
}
