import { notFound } from "next/navigation";

import { getCategoriesService } from "@/services/category/get-categories-service";
import { getProductService } from "@/services/product/get-product-service";

import { ProductForm } from "@/components/admin/products/product-form";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProductService({
      productId: id,
    }),

    getCategoriesService(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Editar Produto</h1>

        <p className="text-muted-foreground">
          Atualize as informações do produto.
        </p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
