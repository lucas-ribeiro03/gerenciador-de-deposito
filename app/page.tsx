import { Hero } from "@/components/home/hero";
import { ProductsGrid } from "@/components/home/product-grid";
import { ProductFilters } from "@/components/home/products-filter";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navbar/navbar";
import { getPublicCategoriesService } from "@/services/category/get-public-categories-service";

import { getPublicProductsService } from "@/services/product/get-public-products-service";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
    promotion?: string;
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category, promotion, search } = (await searchParams) ?? {};

  const [categories, products] = await Promise.all([
    getPublicCategoriesService(),
    getPublicProductsService({
      category,
      promotion: promotion === "true",
      search,
    }),
  ]);
  return (
    <>
      <Navbar />
      <Hero />
      <ProductFilters
        categories={categories}
        selectedCategory={category ?? ""}
      />
      <ProductsGrid products={products} />
      <Footer />
    </>
  );
}
