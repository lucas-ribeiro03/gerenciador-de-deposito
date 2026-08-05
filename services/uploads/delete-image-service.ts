import { cloudinary } from "@/lib/cloudinary";

export async function deleteImageService(publicId: string) {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}
