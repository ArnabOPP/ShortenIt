"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Link as LinkIcon } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { ADSTERRA } from "@/lib/ads/adsterra";

function SkyscraperColumn() {
  return (
    <div className="hidden shrink-0 self-start xl:block">
      <div className="sticky top-24">
        <AdsterraBanner {...ADSTERRA.banner160x600} />
      </div>
    </div>
  );
}

export function DashboardShell({
  clerkEnabled,
  showAds = false,
  children,
}: {
  clerkEnabled: boolean;
  showAds?: boolean;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-surface md:flex-row">
      <Sidebar clerkEnabled={clerkEnabled} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-outline-variant/30 bg-surface-container-lowest px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-on-surface hover:bg-surface-container-low"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 font-display text-base font-bold text-primary">
            <LinkIcon className="h-4 w-4" strokeWidth={2.5} />
            ShortenIt
          </Link>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto flex max-w-[1660px] gap-4 px-4 py-6 sm:px-6 md:px-8 md:py-8">
            {showAds && <SkyscraperColumn />}
            <div className="mx-auto w-full min-w-0 max-w-[1280px]">{children}</div>
            {showAds && <SkyscraperColumn />}
          </div>
        </main>
      </div>
    </div>
  );
}
