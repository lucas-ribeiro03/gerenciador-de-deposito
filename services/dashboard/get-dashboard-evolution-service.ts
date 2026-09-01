import { Prisma } from "@prisma/client";

import {
  getDashboardEvolutionBuckets,
  type DashboardEvolutionBucket,
} from "@/lib/dashboard-evolution";

import {
  getDashboardPeriodRange,
  type DashboardPeriod,
} from "@/lib/dashboard-period";

import { prisma } from "@/prisma";

export type DashboardEvolutionItem = {
  start: Date;
  end: Date;
  label: string;
  orders: number;
  revenue: number;
};

export type DashboardEvolution = {
  items: DashboardEvolutionItem[];
};

type GetDashboardEvolutionServiceInput = {
  period: DashboardPeriod;
};

type DashboardOrder = {
  createdAt: Date;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
  total: Prisma.Decimal;
};

export async function getDashboardEvolutionService({
  period,
}: GetDashboardEvolutionServiceInput): Promise<DashboardEvolution> {
  const referenceDate = new Date();

  const range = getDashboardPeriodRange(period, referenceDate);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: range.gte,
        lte: range.lte,
      },

      status: {
        not: "CANCELLED",
      },
    },

    select: {
      createdAt: true,
      status: true,
      total: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const activeHours =
    period === "today" ? orders.map((order) => order.createdAt) : [];

  const buckets = getDashboardEvolutionBuckets(
    period,
    referenceDate,
    activeHours,
  );

  return {
    items: buckets.map((bucket) => buildEvolutionItem(bucket, orders)),
  };
}

function buildEvolutionItem(
  bucket: DashboardEvolutionBucket,
  orders: DashboardOrder[],
): DashboardEvolutionItem {
  const ordersInBucket = orders.filter(
    (order) => order.createdAt >= bucket.gte && order.createdAt <= bucket.lte,
  );

  const revenue = ordersInBucket.reduce((total, order) => {
    if (order.status !== "DELIVERED") {
      return total;
    }

    return total.add(order.total);
  }, new Prisma.Decimal(0));

  return {
    start: bucket.gte,
    end: bucket.lte,
    label: bucket.label,
    orders: ordersInBucket.length,
    revenue: revenue.toNumber(),
  };
}
