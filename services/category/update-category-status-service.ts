import { prisma } from "@/prisma/prisma";

import { CategoryStatus } from "@prisma/client";

interface UpdateCategoryStatusServiceRequest {
  id: string;
}

export async function updateCategoryStatusService({
  id,
}: UpdateCategoryStatusServiceRequest) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Categoria não encontrada.");
  }

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      status:
        category.status === CategoryStatus.ACTIVE
          ? CategoryStatus.INACTIVE
          : CategoryStatus.ACTIVE,
    },
  });
}
