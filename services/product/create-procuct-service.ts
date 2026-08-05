import { prisma } from "@/prisma/prisma";

interface CreateProductServiceRequest {
  name: string;
  categoryId: string;
  description?: string;

  imageUrl: string;
  imagePublicId: string;

  price: number;
  promotionalPrice?: number;

  isAvailable: boolean;
}

export async function createProductService({
  name,
  description,
  categoryId,
  imageUrl,
  imagePublicId,
  price,
  promotionalPrice,
  isAvailable,
}: CreateProductServiceRequest) {
  const getCategoryId = await prisma.category.findFirst({
    where: { name: categoryId },
    select: { id: true },
  });

  console.log(categoryId, getCategoryId?.id);
  await prisma.product.create({
    data: {
      name,

      description,

      categoryId: getCategoryId?.id ? getCategoryId?.id : "",

      imageUrl,

      imagePublicId,

      price,

      promotionalPrice,

      isAvailable,
    },
  });

  return {
    success: true,
    message: "Produto criado com sucesso!",
  };
}
