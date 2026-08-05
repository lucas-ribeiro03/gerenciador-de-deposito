import { prisma } from "@/prisma/prisma";

export async function getProductsService() {
  return prisma.product.findMany({
    select: {
      id: true,
      imageUrl: true,
      name: true,
      description: true,
      price: true,
      promotionalPrice: true,
      isAvailable: true,
      category: {
        select: {
          name: true,
          id: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
