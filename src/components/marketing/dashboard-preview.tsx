import { TrendingUp, Link as LinkIcon } from "lucide-react";

const bars = [40, 65, 50, 80, 60, 95, 75];

export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-card">
      <div className="flex items-center justify-between border-b border-outline-variant/20 px-5 py-3">
        <span className="flex items-center gap-1.5 font-display text-sm font-bold text-primary">
          <LinkIcon className="h-4 w-4" strokeWidth={2.5} />
          ShortenIt
        </span>
        <span className="flex items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-xs font-semibold text-on-secondary-container">
          <TrendingUp className="h-3 w-3" /> +12%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        <div className="rounded-xl bg-surface-container-low p-3">
          <p className="text-xs text-on-surface-variant">Total Clicks</p>
          <p className="font-display text-xl font-bold text-on-surface">48.2k</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-3">
          <p className="text-xs text-on-surface-variant">Earnings</p>
          <p className="font-display text-xl font-bold text-secondary">$124.50</p>
        </div>
      </div>
      <div className="flex h-24 items-end gap-2 px-5 pb-5">
        {bars.map((h, i) => (
          <div
            key={i}
            className={i === 5 ? "flex-1 rounded-t-md bg-primary" : "flex-1 rounded-t-md bg-primary/25"}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
