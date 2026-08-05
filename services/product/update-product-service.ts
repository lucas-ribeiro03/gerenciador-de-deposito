import { prisma } from "@/prisma/prisma";

interface UpdateProductServiceRequest {
  productId: string;

  name: string;
  description?: string;

  categoryId: string;

  imageUrl?: string;
  imagePublicId?: string;

  price: number;
  promotionalPrice?: number;

  isAvailable: boolean;
}

export async function updateProductService({
  productId,
  name,
  description,
  categoryId,
  imageUrl,
  imagePublicId,
  price,
  promotionalPrice,
  isAvailable,
}: UpdateProductServiceRequest) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },

    data: {
      name,

      description,

      categoryId,

      imageUrl: imageUrl ?? product.imageUrl,

      imagePublicId: imagePublicId ?? product.imagePublicId,

      price,

      promotionalPrice,

      isAvailable,
    },
  });

  return product;
}
