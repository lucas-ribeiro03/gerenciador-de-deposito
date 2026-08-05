import { cloudinary } from "@/lib/cloudinary";

import type { UploadApiResponse } from "cloudinary";
import type { UploadImageResponse } from "@/types/upload";

const MAX_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export async function uploadImageService(
  file: File,
): Promise<UploadImageResponse> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("A imagem deve estar no formato PNG, JPG ou JPEG.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("A imagem deve possuir no máximo 5MB.");
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "point-do-grell/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });

  return {
    imageUrl: result.secure_url,
    imagePublicId: result.public_id,
  };
}
