import { Hero } from "@/components/home/hero";
import { ProductsGrid } from "@/components/home/product-grid";
import { ProductFilters } from "@/components/home/products-filter";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navbar/navbar";
import { getCategoriesService } from "@/services/category/get-categories-service";
import { getPublicProductsService } from "@/services/product/get-public-products-service";

export default async function HomePage() {
  const products = await getPublicProductsService();
  const categories = await getCategoriesService();
  return (
    <>
      <Navbar />
      <Hero />
      <ProductFilters categories={categories} />
      <ProductsGrid products={products} />
      <Footer />
    </>
  );
}
