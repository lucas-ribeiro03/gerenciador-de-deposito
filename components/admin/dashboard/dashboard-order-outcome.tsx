"use client";

import type { DashboardOrderOutcome } from "@/services/dashboard/get-dashboard-order-outcome-service";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type DashboardOrderOutcomeProps = {
  data: DashboardOrderOutcome;
};

const chartConfig = {
  delivered: {
    label: "Entregues",
    color: "var(--color-green-600)",
  },
  cancelled: {
    label: "Cancelados",
    color: "var(--color-red-600)",
  },
} satisfies ChartConfig;

export function DashboardOrderOutcome({ data }: DashboardOrderOutcomeProps) {
  const chartData = [
    {
      status: "delivered",
      count: data.delivered,
      fill: "var(--color-delivered)",
    },

    {
      status: "cancelled",
      count: data.cancelled,
      fill: "var(--color-cancelled)",
    },
  ];

  const hasOrders = data.delivered + data.cancelled > 0;

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold tracking-tight">
          Entregas x cancelamentos
        </h2>

        <p className="text-sm text-muted-foreground">
          Resultado dos pedidos concluídos no período selecionado.
        </p>
      </div>

      {!hasOrders ? (
        <div className="flex min-h-70 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Nenhum pedido concluído no período.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="aspect-square h-60 w-60"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={75}
                  outerRadius={105}
                  strokeWidth={2}
                />
              </PieChart>
            </ChartContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tracking-tight">
                {(data.deliveryRate * 100).toFixed(1)}%
              </span>

              <span className="text-xs text-muted-foreground">entregues</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-(--color-delivered)" />

              <div className="flex min-w-32 items-center justify-between gap-6">
                <span>Entregues</span>
                <span className="font-semibold">{data.delivered}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-(--color-cancelled)" />

              <div className="flex min-w-32 items-center justify-between gap-6">
                <span>Cancelados</span>
                <span className="font-semibold">{data.cancelled}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
