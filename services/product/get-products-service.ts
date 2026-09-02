import { prisma } from "@/prisma/prisma";

export type AdminProduct = {
  id: string;
  imageUrl: string;
  name: string;
  description: string | null;
  price: number;
  promotionalPrice: number | null;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
  };
};

export async function getProductsService(): Promise<AdminProduct[]> {
  const products = await prisma.product.findMany({
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
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    id: product.id,
    imageUrl: product.imageUrl,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    promotionalPrice: product.promotionalPrice?.toNumber() ?? null,
    isAvailable: product.isAvailable,

    category: {
      id: product.category.id,
      name: product.category.name,
    },
  }));
}
