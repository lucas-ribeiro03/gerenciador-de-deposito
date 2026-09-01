"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  dashboardPeriodLabels,
  dashboardPeriods,
  type DashboardPeriod,
} from "@/lib/dashboard-period";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DashboardPeriodFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const period =
    (searchParams.get("period") as DashboardPeriod | null) ?? "week";

  function handlePeriodChange(value: string | null) {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("period", value);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={period} onValueChange={handlePeriodChange}>
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue>{dashboardPeriodLabels[period]}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {dashboardPeriods.map((dashboardPeriod) => (
          <SelectItem key={dashboardPeriod} value={dashboardPeriod}>
            {dashboardPeriodLabels[dashboardPeriod]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
