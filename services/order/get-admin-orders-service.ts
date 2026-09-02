import { Prisma } from "@prisma/client";
import type { OrderStatus, PaymentMethod } from "@prisma/client";

import { prisma } from "@/prisma";
import { getOrderPeriodRange, type OrderPeriod } from "@/lib/order-period";

type OrderSort = "newest" | "oldest" | "highestTotal" | "lowestTotal";

type GetAdminOrdersInput = {
  search?: string;
  status?: OrderStatus;
  period?: OrderPeriod;
  sort?: OrderSort;
};

export type AdminOrderCard = {
  id: string;
  createdAt: Date;
  status: OrderStatus;

  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

  items: {
    id: string;
    quantity: number;
    unitPrice: number;
    total: number;
    product: {
      id: string;
      name: string;
    };
  }[];

  address: {
    id: string;
    title: string | null;
    street: string;
    number: string;
    district: string;
    zipCode: string;
    complement: string | null;
  } | null;

  subtotal: number;
  deliveryFee: number;
  total: number;

  deliveryType: string;
  paymentMethod: PaymentMethod;
};

export async function getAdminOrdersService({
  search,
  status,
  period = "today",
  sort = "newest",
}: GetAdminOrdersInput = {}): Promise<AdminOrderCard[]> {
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

  const orders = await prisma.order.findMany({
    where,
    orderBy,

    select: {
      id: true,
      createdAt: true,
      status: true,

      subtotal: true,
      deliveryFee: true,
      total: true,

      deliveryType: true,
      paymentMethod: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      items: {
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          total: true,

          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      address: {
        select: {
          id: true,
          title: true,
          street: true,
          number: true,
          district: true,
          zipCode: true,
          complement: true,
        },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,

    user: order.user,

    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toNumber(),
      total: item.total.toNumber(),

      product: item.product,
    })),

    address: order.address,

    subtotal: order.subtotal.toNumber(),
    deliveryFee: order.deliveryFee.toNumber(),
    total: order.total.toNumber(),

    deliveryType: order.deliveryType,
    paymentMethod: order.paymentMethod,
  }));
}
