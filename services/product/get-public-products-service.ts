import { prisma } from "@/prisma/prisma";

export async function getPublicProductsService() {
  return prisma.product.findMany({
    where: {
      isAvailable: true,

      category: {
        status: "ACTIVE",
      },
    },

    include: {
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
