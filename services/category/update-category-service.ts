import slugify from "slugify";

import { prisma } from "@/prisma/prisma";

interface UpdateCategoryServiceRequest {
  id: string;
  name: string;
}

export async function updateCategoryService({
  id,
  name,
}: UpdateCategoryServiceRequest) {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "pt",
  });

  const categoryAlreadyExists = await prisma.category.findFirst({
    where: {
      id: {
        not: id,
      },
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

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  });
}
