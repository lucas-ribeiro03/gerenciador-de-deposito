import { prisma } from "@/prisma/prisma";

interface DeleteCategoryServiceRequest {
  id: string;
}

export async function deleteCategoryService({
  id,
}: DeleteCategoryServiceRequest) {
  const products = await prisma.product.count({
    where: {
      categoryId: id,
    },
  });

  if (products > 0) {
    throw new Error(
      "Não é possível excluir uma categoria que possui produtos.",
    );
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });
}
