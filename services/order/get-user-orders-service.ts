import { prisma } from "@/prisma";
import type { OrderStatus } from "@prisma/client";

export type UserOrder = {
  id: string;
  createdAt: Date;
  status: OrderStatus;

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
  paymentMethod: string;
};

export async function getUserOrdersService(
  userId: string,
): Promise<UserOrder[]> {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      createdAt: true,
      status: true,

      subtotal: true,
      deliveryFee: true,
      total: true,

      deliveryType: true,
      paymentMethod: true,

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
          street: true,
          number: true,
          district: true,
          zipCode: true,
          complement: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,

    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toNumber(),
      total: item.total.toNumber(),

      product: {
        id: item.product.id,
        name: item.product.name,
      },
    })),

    address: order.address
      ? {
          id: order.address.id,
          street: order.address.street,
          number: order.address.number,
          district: order.address.district,
          zipCode: order.address.zipCode,
          complement: order.address.complement,
        }
      : null,

    subtotal: order.subtotal.toNumber(),
    deliveryFee: order.deliveryFee.toNumber(),
    total: order.total.toNumber(),

    deliveryType: order.deliveryType,
    paymentMethod: order.paymentMethod,
  }));
}
