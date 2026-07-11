"use client";

import { useMemo, useState } from "react";
import { Search, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LinkRow } from "@/lib/data/links";
import { LinkRowActions } from "@/components/dashboard/link-row-actions";

export function LinksTable({ links, appUrl }: { links: LinkRow[]; appUrl: string }) {
  const [query, setQuery] = useState("");
  const [adModeFilter, setAdModeFilter] = useState<"all" | "direct" | "monetized">("all");

  const filtered = useMemo(() => {
    return links.filter((l) => {
      const matchesQuery =
        !query ||
        l.slug.toLowerCase().includes(query.toLowerCase()) ||
        l.targetUrl.toLowerCase().includes(query.toLowerCase());
      const matchesMode = adModeFilter === "all" || l.adMode === adModeFilter;
      return matchesQuery && matchesMode;
    });
  }, [links, query, adModeFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-outline px-3">
          <Search className="h-4 w-4 text-on-surface-variant" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by slug or destination…"
            className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-on-surface-variant/60"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-on-surface-variant">Ad Mode:</span>
          <select
            value={adModeFilter}
            onChange={(e) => setAdModeFilter(e.target.value as typeof adModeFilter)}
            className="h-10 rounded-xl border border-outline bg-surface-container-lowest px-3 text-sm outline-none"
          >
            <option value="all">All</option>
            <option value="direct">Direct</option>
            <option value="monetized">Monetized</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-lowest">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-low text-left text-xs uppercase tracking-wide text-on-surface-variant">
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">Destination</th>
              <th className="px-6 py-3 font-medium">Ad Mode</th>
              <th className="px-6 py-3 font-medium text-right">Clicks</th>
              <th className="px-6 py-3 font-medium">Date Created</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((link) => (
              <tr
                key={link.id}
                className={cn(
                  "border-b border-outline-variant/10 hover:bg-primary/5",
                  link.disabled && "opacity-50"
                )}
              >
                <td className="px-6 py-4 font-medium text-primary">
                  /{link.slug}
                  {link.disabled && (
                    <span className="ml-2 rounded-full bg-error-container px-2 py-0.5 text-xs font-medium text-on-error-container">
                      Disabled
                    </span>
                  )}
                </td>
                <td className="max-w-[220px] truncate px-6 py-4 text-on-surface-variant">{link.targetUrl}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      link.adMode === "monetized"
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-surface-container-high text-on-surface-variant"
                    )}
                  >
                    {link.adMode === "monetized" ? "Monetized" : "Direct"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-on-surface">{link.clicks.toLocaleString()}</td>
                <td className="px-6 py-4 text-on-surface-variant">
                  {link.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => navigator.clipboard.writeText(`${appUrl}/${link.slug}`)}
                      className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                      title="Copy short link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <LinkRowActions linkId={link.id} disabled={link.disabled} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">
                  No links match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
