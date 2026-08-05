import { prisma } from "@/prisma/prisma";

export async function toggleProductStatusService(productId: string) {
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
      isAvailable: !product.isAvailable,
    },
  });
}
