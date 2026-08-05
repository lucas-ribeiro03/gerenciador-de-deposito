"use server";

import { createProductSchema } from "@/schemas/product/create-product-schema";

import { deleteImageService } from "@/services/uploads/delete-image-service";
import { uploadImageService } from "@/services/uploads/upload-image-service";

import { getProductService } from "@/services/product/get-product-service";
import { updateProductService } from "@/services/product/update-product-service";

interface UpdateProductActionProps {
  productId: string;
  formData: FormData;
}

export async function updateProductAction({
  productId,
  formData,
}: UpdateProductActionProps) {
  try {
    const product = await getProductService({
      productId,
    });

    if (!product) {
      return {
        success: false,
        message: "Produto não encontrado.",
      };
    }

    const data = createProductSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
      price: formData.get("price"),
      promotionalPrice: formData.get("promotionalPrice"),
      isAvailable: formData.get("isAvailable") === "true",
    });

    let imageUrl = product.imageUrl;
    let imagePublicId = product.imagePublicId;

    const image = formData.get("image");

    if (image instanceof File && image.size > 0) {
      if (product.imagePublicId) {
        await deleteImageService(product.imagePublicId);
      }

      const uploaded = await uploadImageService(image);

      imageUrl = uploaded.imageUrl;
      imagePublicId = uploaded.imagePublicId;
    }

    await updateProductService({
      productId,

      ...data,

      imageUrl: imageUrl ?? undefined,

      imagePublicId: imagePublicId ?? undefined,

      price: Number(data.price),

      promotionalPrice: data.promotionalPrice
        ? Number(data.promotionalPrice)
        : undefined,
    });

    return {
      success: true,
      message: "Produto atualizado com sucesso.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao atualizar produto.",
    };
  }
}
