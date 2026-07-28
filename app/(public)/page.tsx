import { Hero } from "@/components/home/hero";
import { ProductsGrid } from "@/components/home/product-grid";
import { ProductFilters } from "@/components/home/products-filter";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductFilters />
      <ProductsGrid />
      <Footer />
    </>
  );
}
