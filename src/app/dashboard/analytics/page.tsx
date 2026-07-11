import { BarChart3, MousePointerClick, Wallet, Link2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ClicksChart } from "@/components/dashboard/clicks-chart";
import { requireUserId } from "@/lib/auth";
import { getDashboardStats, getLinksTable } from "@/lib/data/links";
import { getClicksOverTime, getTopReferrers } from "@/lib/data/analytics";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

export default async function AnalyticsPage() {
  const userId = await requireUserId();
  const [stats, chartData, referrers, linkRows] = await Promise.all([
    getDashboardStats(userId),
    getClicksOverTime(userId),
    getTopReferrers(userId),
    getLinksTable(userId),
  ]);

  const topLinks = [...linkRows].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const maxReferrerClicks = Math.max(1, ...referrers.map((r) => r.clicks));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Analytics</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Performance across all of your links.
        </p>
      </div>

      <DashboardAdBanner variant="full-banner" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Link2} label="Total Links" value={stats.totalLinks.toLocaleString()} />
        <StatCard icon={MousePointerClick} label="Total Clicks" value={stats.totalClicks.toLocaleString()} />
        <StatCard icon={Wallet} label="Total Earnings" value={`$${stats.earnings.toFixed(2)}`} />
        <StatCard icon={BarChart3} label="Avg. CPM" value={`$${stats.avgCpm.toFixed(2)}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clicks over the last 30 days</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ClicksChart data={chartData} />
          ) : (
            <p className="flex h-[280px] items-center justify-center text-sm text-on-surface-variant">
              No clicks yet.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
          </CardHeader>
          <div className="flex flex-col divide-y divide-outline-variant/10">
            {topLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between px-6 py-3 text-sm">
                <span className="truncate font-medium text-primary">/{link.slug}</span>
                <span className="text-on-surface">{link.clicks.toLocaleString()} clicks</span>
              </div>
            ))}
            {topLinks.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-on-surface-variant">No links yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-3 px-6 py-4">
            {referrers.map((r) => (
              <div key={r.referrer} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate text-on-surface">{r.referrer}</span>
                  <span className="text-on-surface-variant">{r.clicks.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(r.clicks / maxReferrerClicks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {referrers.length === 0 && (
              <p className="py-4 text-center text-sm text-on-surface-variant">No click data yet.</p>
            )}
          </div>
        </Card>
      </div>

      <DashboardAdBanner variant="rectangle" className="mx-auto max-w-sm" />
    </div>
  );
}
