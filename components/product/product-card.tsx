import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { AddToCartButton } from "./add-to-cart-button";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

export type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  promotionalPrice: number | null;
  isAvailable: boolean;
};

export function ProductCard({
  id,
  name,
  imageUrl,
  price,
  promotionalPrice,
  isAvailable,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden py-0">
      <Link href={`/products/${id}`}>
        <ProductImage src={imageUrl} alt={name} />
      </Link>

      <CardContent className="flex flex-col gap-4 p-4">
        <Link href={`/products/${id}`}>
          <h3 className="line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">
            {name}
          </h3>
        </Link>

        <ProductPrice price={price} promotionalPrice={promotionalPrice} />

        <AddToCartButton disabled={!isAvailable} />
      </CardContent>
    </Card>
  );
}
