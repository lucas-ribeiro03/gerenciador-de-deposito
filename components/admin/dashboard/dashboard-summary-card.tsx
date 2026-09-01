import type { LucideIcon } from "lucide-react";

type DashboardSummaryCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export function DashboardSummaryCard({
  title,
  value,
  icon: Icon,
}: DashboardSummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <Icon className="size-5 text-muted-foreground" />
      </div>

      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
