"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { updateCategoryStatusService } from "@/services/category/update-category-status-service";

export async function updateCategoryStatusAction(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await updateCategoryStatusService({
      id,
    });
    revalidateTag("categories:public", "max");
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Status atualizado com sucesso.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao atualizar status.",
    };
  }
}
