import { getCategoriesService } from "@/services/category/get-categories-service";

import { ProductForm } from "@/components/admin/products/product-form";

export default async function NewProductPage() {
  const categories = await getCategoriesService();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Novo Produto</h1>

        <p className="text-muted-foreground">Cadastre um novo produto.</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
