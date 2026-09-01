import {
  getDashboardPeriodRange,
  type DashboardPeriod,
} from "@/lib/dashboard-period";

import { prisma } from "@/prisma";

export type DashboardOrderOutcome = {
  delivered: number;
  cancelled: number;
  deliveryRate: number;
  cancellationRate: number;
};

type GetDashboardOrderOutcomeInput = {
  period: DashboardPeriod;
};

export async function getDashboardOrderOutcomeService({
  period,
}: GetDashboardOrderOutcomeInput): Promise<DashboardOrderOutcome> {
  const { gte, lte } = getDashboardPeriodRange(period);

  const result = await prisma.order.groupBy({
    by: ["status"],

    where: {
      createdAt: {
        gte,
        lte,
      },

      status: {
        in: ["DELIVERED", "CANCELLED"],
      },
    },

    _count: {
      _all: true,
    },
  });

  const delivered =
    result.find((item) => item.status === "DELIVERED")?._count._all ?? 0;

  const cancelled =
    result.find((item) => item.status === "CANCELLED")?._count._all ?? 0;

  const total = delivered + cancelled;

  const deliveryRate = total > 0 ? delivered / total : 0;

  const cancellationRate = total > 0 ? cancelled / total : 0;

  return {
    delivered,
    cancelled,
    deliveryRate,
    cancellationRate,
  };
}
