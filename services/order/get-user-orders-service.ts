import { prisma } from "@/prisma";

export async function getUserOrdersService(userId: string) {
  return prisma.order.findMany({
    where: {
      userId,
    },

    include: {
      address: true,

      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export type UserOrder = Awaited<
  ReturnType<typeof getUserOrdersService>
>[number];
