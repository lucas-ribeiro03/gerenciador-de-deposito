"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { DashboardEvolution } from "@/services/dashboard/get-dashboard-evolution-service";

type DashboardOrdersEvolutionChartProps = {
  data: DashboardEvolution;
};

const chartConfig = {
  orders: {
    label: "Pedidos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardOrdersEvolutionChart({
  data,
}: DashboardOrdersEvolutionChartProps) {
  const chartData = data.items.map((item) => ({
    period: item.label,
    orders: item.orders,
  }));

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold tracking-tight">Evolução dos pedidos</h2>

        <p className="text-sm text-muted-foreground">
          Quantidade de pedidos não cancelados no período selecionado.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Nenhum pedido encontrado no período.
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
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={32}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar dataKey="orders" fill="#e5a11a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      )}
    </section>
  );
}
