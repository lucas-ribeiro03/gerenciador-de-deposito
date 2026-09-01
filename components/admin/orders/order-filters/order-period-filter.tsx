"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useOrderFilters } from "@/hooks/use-order-filters";
import type { OrderPeriod } from "@/lib/order-period";

export function OrderPeriodFilter() {
  const { period, updateParams } = useOrderFilters();

  const periodLabels: Record<OrderPeriod, string> = {
    today: "Hoje",
    yesterday: "Ontem",
    week: "Esta semana",
    month: "Este mês",
  };

  function handlePeriodChange(value: string | null) {
    updateParams({
      period: value as OrderPeriod,
    });
  }

  return (
    <Select value={period} onValueChange={handlePeriodChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="today">Hoje</SelectItem>

        <SelectItem value="yesterday">Ontem</SelectItem>

        <SelectItem value="week">Esta semana</SelectItem>

        <SelectItem value="month">Este mês</SelectItem>
      </SelectContent>
    </Select>
  );
}
