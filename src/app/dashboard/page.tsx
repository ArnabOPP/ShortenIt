import Link from "next/link";
import { LinkIcon, MousePointerClick, Wallet, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ClicksChart } from "@/components/dashboard/clicks-chart";
import { requireUserId, getDisplayUser } from "@/lib/auth";
import { getDashboardStats, getRecentLinks } from "@/lib/data/links";
import { getClicksOverTime } from "@/lib/data/analytics";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default async function DashboardPage() {
  const userId = await requireUserId();
  const [user, stats, recentLinks, chartData] = await Promise.all([
    getDisplayUser(),
    getDashboardStats(userId),
    getRecentLinks(userId),
    getClicksOverTime(userId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Dashboard</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Welcome back, {user.firstName} — insights are ready for review.
        </p>
      </div>

      <DashboardAdBanner variant="full-banner" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={LinkIcon} label="Total Links" value={formatNumber(stats.totalLinks)} delta="+3%" />
        <StatCard icon={MousePointerClick} label="Total Clicks" value={formatNumber(stats.totalClicks)} delta="+12%" />
        <StatCard icon={Wallet} label="Earnings" value={`$${stats.earnings.toFixed(2)}`} delta="+8.4%" />
        <StatCard icon={TrendingUp} label="Avg. CPM" value={`$${stats.avgCpm.toFixed(2)}`} delta="-0.5%" deltaPositive={false} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Clicks over the last 30 days</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ClicksChart data={chartData} />
            ) : (
              <p className="flex h-[280px] items-center justify-center text-sm text-on-surface-variant">
                No clicks yet — share a link to see activity here.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-secondary p-6 text-on-secondary">
          <div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Limited Offer
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">Upgrade to Pro</h3>
            <p className="mt-2 text-sm opacity-90">
              Unlock advanced analytics, custom domains, and zero-ad experiences for your users.
            </p>
          </div>
          <Link
            href="/pricing"
            className="mt-6 rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-secondary hover:bg-white/90"
          >
            Claim Your Discount
          </Link>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <Link href="/dashboard/links" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20 text-left text-xs uppercase tracking-wide text-on-surface-variant">
                <th className="px-6 py-3 font-medium">Link Details</th>
                <th className="px-6 py-3 font-medium">Slug</th>
                <th className="px-6 py-3 font-medium text-right">Clicks</th>
                <th className="px-6 py-3 font-medium text-right">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {recentLinks.map((link) => (
                <tr key={link.id} className="border-b border-outline-variant/10 hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <p className="max-w-xs truncate text-on-surface">{link.targetUrl}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-surface-container-low px-2 py-1 text-xs font-medium text-primary">
                      /{link.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface">{link.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-secondary">
                    ${link.earnings.toFixed(2)}
                  </td>
                </tr>
              ))}
              {recentLinks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-on-surface-variant">
                    No links yet — create your first one to see activity here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DashboardAdBanner variant="rectangle" className="mx-auto max-w-sm" />
    </div>
  );
}
