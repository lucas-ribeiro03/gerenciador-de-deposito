"use server";

import { revalidatePath } from "next/cache";

import { createProductSchema } from "@/schemas/product/create-product-schema";

import { uploadImageService } from "@/services/uploads/upload-image-service";
import { createProductService } from "@/services/product/create-procuct-service";

export async function createProductAction(formData: FormData) {
  try {
    const image = formData.get("image");

    if (!(image instanceof File) || image.size === 0) {
      return {
        success: false,
        message: "Selecione uma imagem.",
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
    console.log(data.categoryId, "CATEGORIA");
    if (!data.categoryId)
      return {
        message: "Selecione uma categoria",
        success: false,
      };

    const { imageUrl, imagePublicId } = await uploadImageService(image);

    await createProductService({
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,

      imageUrl,
      imagePublicId,

      price: Number(data.price),

      promotionalPrice:
        data.promotionalPrice && data.promotionalPrice !== ""
          ? Number(data.promotionalPrice)
          : undefined,

      isAvailable: data.isAvailable,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Produto cadastrado com sucesso.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao cadastrar produto.",
    };
  }
}
