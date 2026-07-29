import { getCategoriesService } from "@/services/category/get-categories-service";

import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { CreateCategoryDialog } from "@/components/admin/categories/create-category-dialog";

export default async function CategoriesPage() {
  const categories = await getCategoriesService();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>

          <p className="text-muted-foreground">
            Gerencie as categorias da loja.
          </p>
        </div>

        <CreateCategoryDialog />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
