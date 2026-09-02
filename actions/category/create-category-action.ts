"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { createCategoryService } from "@/services/category/create-category-service";
import { categorySchema } from "@/schemas/category/category-schema";

export async function createCategoryAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  try {
    await createCategoryService(result.data);

    revalidateTag("categories:public", "max");
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Categoria criada com sucesso.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao criar categoria.",
    };
  }
}
