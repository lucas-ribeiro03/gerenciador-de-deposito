"use cache";
import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export type PublicProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  promotionalPrice: number | null;
  isAvailable: boolean;
};

type GetPublicProductsServiceRequest = {
  category?: string;
  promotion?: boolean;
  search?: string;
};

export async function getPublicProductsService({
  category,
  promotion,
  search,
}: GetPublicProductsServiceRequest): Promise<PublicProduct[]> {
  cacheTag("products:public");
  const products = await prisma.product.findMany({
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

    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
      promotionalPrice: true,
      isAvailable: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price.toNumber(),
    promotionalPrice: product.promotionalPrice?.toNumber() ?? null,
    isAvailable: product.isAvailable,
  }));
}
