import { getProductsService } from "@/services/product/get-products-service";

import { ProductsTable } from "@/components/admin/products/products-table";
import { NewProductButton } from "@/components/admin/products/new-product-button";
import { ProductsTableMobile } from "@/components/admin/products/products-table-mobile";

export default async function ProductsPage() {
  const products = await getProductsService();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>

          <p className="text-muted-foreground">Gerencie os produtos da loja.</p>
        </div>

        <NewProductButton />
      </div>

      <div className="hidden lg:block">
        <ProductsTable products={products} />
      </div>

      <div className="lg:hidden">
        <ProductsTableMobile products={products} />
      </div>
    </div>
  );
}
