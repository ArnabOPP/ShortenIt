import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUserId } from "@/lib/auth";
import { getLinksTable } from "@/lib/data/links";
import { LinksTable } from "@/components/dashboard/links-table";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

export default async function MyLinksPage() {
  const userId = await requireUserId();
  const links = await getLinksTable(userId);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-surface">My Links</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Manage, track, and optimize your shortened URLs.
          </p>
        </div>
        <Link
          href="/dashboard/links/new"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
        >
          <Plus className="h-4 w-4" />
          Create New Link
        </Link>
      </div>

      <DashboardAdBanner variant="leaderboard" />

      <LinksTable links={links} appUrl={appUrl} />

      <DashboardAdBanner variant="rectangle" className="mx-auto max-w-sm" />
    </div>
  );
}
