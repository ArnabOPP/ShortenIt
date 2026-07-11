import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { InlineAdBanner } from "@/components/ads/inline-ad-banner";
import { WallpaperSkyscrapers } from "@/components/ads/wallpaper-skyscrapers";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <WallpaperSkyscrapers />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <h1 className="font-display text-3xl font-bold text-on-surface">{title}</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: {updated}</p>

          <div className="my-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <InlineAdBanner variant="leaderboard" />
            <InlineAdBanner variant="rectangle" />
          </div>

          <div className="prose-legal flex flex-col gap-6 text-sm leading-relaxed text-on-surface-variant [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-on-surface [&_p]:text-on-surface-variant">
            {children}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <InlineAdBanner variant="rectangle" />
            <InlineAdBanner variant="rectangle" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
