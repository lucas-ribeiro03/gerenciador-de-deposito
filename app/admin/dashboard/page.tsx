import { DashboardRevenueEvolutionChart } from "@/components/admin/dashboard/dashboard-evolution-revenue-chart";
import { DashboardOrderOutcome } from "@/components/admin/dashboard/dashboard-order-outcome";
import { DashboardOrdersEvolutionChart } from "@/components/admin/dashboard/dashboard-orders-evolution-chart";
import { DashboardPeriodFilter } from "@/components/admin/dashboard/dashboard-period-filter";
import { DashboardSummary } from "@/components/admin/dashboard/dashboard-summary";

import { dashboardFilterSchema } from "@/schemas/dashboard/dashboard-filter-schema";
import { getDashboardEvolutionService } from "@/services/dashboard/get-dashboard-evolution-service";
import { getDashboardOrderOutcomeService } from "@/services/dashboard/get-dashboard-order-outcome-service";

import { getDashboardSummaryService } from "@/services/dashboard/get-dashboard-summary-service";

type DashboardPageProps = {
  searchParams: Promise<{
    period?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  const { period } = dashboardFilterSchema.parse(params);
  const [summary, orderOutcome, evolution] = await Promise.all([
    getDashboardSummaryService({
      period,
    }),

    getDashboardOrderOutcomeService({
      period,
    }),

    getDashboardEvolutionService({
      period,
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Acompanhe os principais indicadores dos pedidos.
        </p>
      </div>

      <DashboardPeriodFilter />

      <DashboardSummary summary={summary} />

      <DashboardOrderOutcome data={orderOutcome} />

      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <DashboardOrdersEvolutionChart data={evolution} />
        <DashboardRevenueEvolutionChart data={evolution} />
      </div>
    </main>
  );
}
