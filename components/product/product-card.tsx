import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { AddToCartButton } from "./add-to-cart-button";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";
import type { Category, Product } from "@prisma/client";

export type ProductCardProps = {
  product: Product & {
    category: Category;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden py-0 h-full flex flex-col">
      <ProductImage src={product.imageUrl} alt={product.name} />

      <CardContent className="flex flex-col gap-4 py-4 flex-2">
        <h3 className="line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <ProductPrice
          price={Number(product.price)}
          promotionalPrice={Number(product.promotionalPrice)}
        />
        <div className="flex justify-end items-end mt-auto">
          <AddToCartButton disabled={!product.isAvailable} />
        </div>
      </CardContent>
    </Card>
  );
}
