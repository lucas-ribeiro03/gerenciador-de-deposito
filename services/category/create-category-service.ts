import slugify from "slugify";

import { prisma } from "@/prisma/prisma";

interface CreateCategoryServiceRequest {
  name: string;
}

export async function createCategoryService({
  name,
}: CreateCategoryServiceRequest) {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "pt",
  });

  const categoryAlreadyExists = await prisma.category.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
        {
          slug,
        },
      ],
    },
  });

  if (categoryAlreadyExists) {
    throw new Error("Já existe uma categoria com esse nome.");
  }

  return prisma.category.create({
    data: {
      name,
      slug,
    },
  });
}
