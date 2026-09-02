"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getPublicCategoriesService() {
  cacheTag("categories:public");

  return prisma.category.findMany({
    where: {
      status: "ACTIVE",
    },

    orderBy: {
      name: "asc",
    },

    include: {
      _count: {
        select: {
          products: {
            where: {
              isAvailable: true,
            },
          },
        },
      },
    },
  });
}
