"use server";

import { revalidatePath } from "next/cache";

import { deleteCategoryService } from "@/services/category/delete-category-service";

export async function deleteCategoryAction(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await deleteCategoryService({
      id,
    });

    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Categoria removida com sucesso.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao remover categoria.",
    };
  }
}
