"use server";

import { revalidatePath } from "next/cache";

import { deleteImageService } from "@/services/uploads/delete-image-service";
import { deleteProductService } from "@/services/product/delete-product-service";

export async function deleteProductAction(productId: string) {
  try {
    const product = await deleteProductService(productId);

    if (product.imagePublicId) {
      await deleteImageService(product.imagePublicId);
    }

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Produto removido.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao remover produto.",
    };
  }
}
