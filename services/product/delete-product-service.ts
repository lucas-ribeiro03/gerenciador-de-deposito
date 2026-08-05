import { prisma } from "@/prisma/prisma";

export async function deleteProductService(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return product;
}
