import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

function AdColumn() {
  return (
    <div className="hidden lg:flex lg:justify-center">
      <div className="sticky top-24">
        <AdsterraBanner {...ADSTERRA.banner160x600} />
      </div>
    </div>
  );
}

// Places page content in the center column of a 3-column grid, with sticky
// skyscraper ads in the outer columns — same pattern as the redirect
// interstitial. Unlike a fixed-position overlay waiting for spare viewport
// space, this reserves real layout width for the ads: the content column
// shrinks to make room instead of ads floating on top of it, so they show
// reliably from "lg" (1024px) up rather than only on very wide screens.
export function PageAdGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[1552px] gap-4 lg:grid-cols-[176px_1fr_176px]">
      <AdColumn />
      <div className="min-w-0">{children}</div>
      <AdColumn />
    </div>
  );
}
