import { prisma } from "@/prisma";

export async function getAllOrdersService() {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      address: true,

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
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export type AdminOrder = Awaited<
  ReturnType<typeof getAllOrdersService>
>[number];
