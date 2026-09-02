import {
  getDashboardPeriodRange,
  type DashboardPeriod,
} from "@/lib/dashboard-period";

import { prisma } from "@/prisma";

export type DashboardSummary = {
  ordersCount: number;
  revenue: number;
  averageTicket: number;
};

type GetDashboardSummaryInput = {
  period: DashboardPeriod;
};

export async function getDashboardSummaryService({
  period,
}: GetDashboardSummaryInput): Promise<DashboardSummary> {
  const { gte, lte } = getDashboardPeriodRange(period);

  const result = await prisma.order.aggregate({
    where: {
      createdAt: {
        gte,
        lte,
      },

      status: {
        not: "CANCELLED",
      },
    },

    _count: {
      _all: true,
    },

    _sum: {
      total: true,
    },
  });

  const ordersCount = result._count._all;
  const revenue = Number(result._sum.total ?? 0);

  const averageTicket = ordersCount > 0 ? revenue / ordersCount : 0;

  return {
    ordersCount,
    revenue,
    averageTicket,
  };
}
