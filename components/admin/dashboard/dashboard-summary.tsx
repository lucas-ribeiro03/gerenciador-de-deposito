import { Banknote, ShoppingBag, Ticket } from "lucide-react";

import type { DashboardSummary as DashboardSummaryData } from "@/services/dashboard/get-dashboard-summary-service";

import { formatCurrency } from "@/lib/formatters/currency";

import { DashboardSummaryCard } from "./dashboard-summary-card";

type DashboardSummaryProps = {
  summary: DashboardSummaryData;
};

export function DashboardSummary({ summary }: DashboardSummaryProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <DashboardSummaryCard
        title="Pedidos"
        value={summary.ordersCount.toString()}
        icon={ShoppingBag}
      />

      <DashboardSummaryCard
        title="Faturamento"
        value={formatCurrency(summary.revenue)}
        icon={Banknote}
      />

      <DashboardSummaryCard
        title="Ticket médio"
        value={formatCurrency(summary.averageTicket)}
        icon={Ticket}
      />
    </section>
  );
}
