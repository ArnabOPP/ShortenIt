import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaPositive = true,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-on-surface-variant">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-low">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-display text-2xl font-bold text-on-surface">{value}</span>
        {delta && (
          <span
            className={cn(
              "mb-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              deltaPositive
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-error-container text-on-error-container"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
