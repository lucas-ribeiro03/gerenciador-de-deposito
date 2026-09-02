import { prisma } from "@/prisma";

export type EditProduct = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  price: number;
  promotionalPrice: number | null;
  imageUrl: string;
  imagePublicId: string;
  isAvailable: boolean;
};

type GetProductServiceRequest = {
  productId: string;
};

export async function getProductService({
  productId,
}: GetProductServiceRequest): Promise<EditProduct | null> {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      categoryId: true,
      price: true,
      promotionalPrice: true,
      imageUrl: true,
      imagePublicId: true,
      isAvailable: true,
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    price: product.price.toNumber(),
    promotionalPrice: product.promotionalPrice?.toNumber() ?? null,
    imageUrl: product.imageUrl,
    imagePublicId: product.imagePublicId,
    isAvailable: product.isAvailable,
  };
}
