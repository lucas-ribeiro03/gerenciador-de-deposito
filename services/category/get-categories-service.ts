import { prisma } from "@/prisma/prisma";

export async function getCategoriesService() {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
