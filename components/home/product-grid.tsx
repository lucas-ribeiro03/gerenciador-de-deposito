import { ProductCard } from "@/components/product/product-card";
import type { PublicProduct } from "@/services/product/get-public-products-service";

interface ProductsGridProps {
  products: PublicProduct[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 bg-background">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Produtos</h2>

          <p className="mt-2 text-muted-foreground">
            Confira os produtos disponíveis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product: PublicProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
