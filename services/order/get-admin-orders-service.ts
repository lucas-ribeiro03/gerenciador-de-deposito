import { Prisma } from "@prisma/client";
import type { OrderStatus } from "@prisma/client";

import { prisma } from "@/prisma";
import { getOrderPeriodRange, type OrderPeriod } from "@/lib/order-period";

type OrderSort = "newest" | "oldest" | "highestTotal" | "lowestTotal";

type GetAdminOrdersInput = {
  search?: string;
  status?: OrderStatus;
  period?: OrderPeriod;
  sort?: OrderSort;
};

export async function getAdminOrdersService({
  search,
  status,
  period = "today",
  sort = "newest",
}: GetAdminOrdersInput = {}) {
  const where: Prisma.OrderWhereInput = {
    ...(status && {
      status,
    }),

    createdAt: getOrderPeriodRange(period),

    ...(search && {
      OR: [
        {
          id: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),
  };

  const orderBy = {
    newest: {
      createdAt: "desc" as const,
    },

    oldest: {
      createdAt: "asc" as const,
    },

    highestTotal: {
      total: "desc" as const,
    },

    lowestTotal: {
      total: "asc" as const,
    },
  }[sort];

  return prisma.order.findMany({
    where,
    orderBy,

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      address: true,
    },
  });
}
