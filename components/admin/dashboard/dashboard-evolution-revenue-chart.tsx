"use client";

import { useEffect, useState } from "react";
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

function useIsMobile() {
  // false é intencional: servidor e primeiro render do cliente precisam
  // produzir a mesma árvore para evitar mismatch de hidratação.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function abbreviatePeriod(value: string) {
  const abbreviations: Record<string, string> = {
    domingo: "Dom",
    segunda: "Seg",
    "segunda-feira": "Seg",
    terça: "Ter",
    "terça-feira": "Ter",
    quarta: "Qua",
    "quarta-feira": "Qua",
    quinta: "Qui",
    "quinta-feira": "Qui",
    sexta: "Sex",
    "sexta-feira": "Sex",
    sábado: "Sáb",
    "sábado-feira": "Sáb",
  };

  return abbreviations[value.trim().toLocaleLowerCase("pt-BR")] ?? value;
}

export function DashboardRevenueEvolutionChart({
  data,
}: DashboardRevenueEvolutionChartProps) {
  const isMobile = useIsMobile();
  const chartData = data.items.map((item) => ({
    period: item.label,
    revenue: item.revenue,
  }));

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border bg-card p-5">
      <div className="mb-4 min-w-0">
        <h2 className="font-semibold tracking-tight">
          Evolução do faturamento
        </h2>

        <p className="text-sm text-muted-foreground">
          Faturamento dos pedidos entregues no período selecionado.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Nenhum faturamento encontrado no período.
          </p>
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="min-h-75 min-w-0 w-full max-w-full overflow-hidden"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              right: 12,
              left: 0,
              bottom: 0,
            }}
            responsive
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={isMobile ? 6 : 8}
              interval={0}
              minTickGap={isMobile ? 2 : 12}
              padding={{ left: 8, right: 8 }}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) =>
                isMobile ? abbreviatePeriod(String(value)) : String(value)
              }
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={isMobile ? 50 : 64}
              tick={{ fontSize: isMobile ? 10 : 12 }}
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
