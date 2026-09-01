"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { DashboardEvolution } from "@/services/dashboard/get-dashboard-evolution-service";

type DashboardRevenueEvolutionChartProps = {
  data: DashboardEvolution;
};

const chartConfig = {
  revenue: {
    label: "Faturamento",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DashboardRevenueEvolutionChart({
  data,
}: DashboardRevenueEvolutionChartProps) {
  const chartData = data.items.map((item) => ({
    period: item.label,
    revenue: item.revenue,
  }));

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold tracking-tight">
          Evolução do faturamento
        </h2>

        <p className="text-sm text-muted-foreground">
          Faturamento dos pedidos entregues no período selecionado.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Nenhum faturamento encontrado no período.
          </p>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              right: 12,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tickFormatter={(value) =>
                `R$ ${Number(value).toLocaleString("pt-BR")}`
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span>
                      R${" "}
                      {Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  )}
                />
              }
            />

            <Bar dataKey="revenue" fill="#e5a11a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      )}
    </section>
  );
}
