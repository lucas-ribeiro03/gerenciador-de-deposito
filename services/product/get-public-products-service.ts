import { prisma } from "@/prisma/prisma";

type GetPublicProductsServiceRequest = {
  category?: string;
  promotion?: boolean;
  search?: string;
};

export async function getPublicProductsService({
  category,
  promotion,
  search,
}: GetPublicProductsServiceRequest) {
  return prisma.product.findMany({
    where: {
      isAvailable: true,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(category && {
        category: {
          slug: category,
          status: "ACTIVE",
        },
      }),

      ...(promotion && {
        promotionalPrice: {
          not: null,
        },
      }),
    },

    include: {
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
