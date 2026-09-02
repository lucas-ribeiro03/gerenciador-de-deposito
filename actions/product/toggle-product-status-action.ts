"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { toggleProductStatusService } from "@/services/product/toggle-product-status-service";

export async function toggleProductStatusAction(productId: string) {
  try {
    await toggleProductStatusService(productId);

    revalidateTag("products:public", "max");
    revalidateTag("categories:public", "max");
    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Status atualizado.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro.",
    };
  }
}
