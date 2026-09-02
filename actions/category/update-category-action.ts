"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { categorySchema } from "@/schemas/category/category-schema";
import { updateCategoryService } from "@/services/category/update-category-service";

export async function updateCategoryAction(formData: FormData) {
  const id = formData.get("id") as string;

  const result = categorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  try {
    await updateCategoryService({
      id,
      ...result.data,
    });
    revalidateTag("categories:public", "max");
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Categoria atualizada com sucesso.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao atualizar categoria.",
    };
  }
}
