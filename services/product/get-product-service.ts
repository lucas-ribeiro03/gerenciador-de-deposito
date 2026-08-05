import { prisma } from "@/prisma/prisma";

interface GetProductServiceRequest {
  productId: string;
}

export async function getProductService({
  productId,
}: GetProductServiceRequest) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      category: true,
    },
  });
}
