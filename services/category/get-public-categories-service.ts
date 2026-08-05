import { prisma } from "@/prisma/prisma";

export async function getPublicCategoriesService() {
  return prisma.category.findMany({
    where: {
      status: "ACTIVE",
    },

    orderBy: {
      name: "asc",
    },

    include: {
      _count: {
        select: {
          products: {
            where: {
              isAvailable: true,
            },
          },
        },
      },
    },
  });
}
