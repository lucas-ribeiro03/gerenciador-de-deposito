"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import type { CartProduct } from "@/types/cart";
import { formatCurrency } from "@/lib/formatters/currency";

type CheckoutItemsProps = {
  products: CartProduct[];
};

export function CheckoutItems({ products }: CheckoutItemsProps) {
  const { addItem, removeItem } = useCart();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Seus produtos</h2>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-[64px_minmax(0,1fr)_100px_120px] items-center gap-4 border-b px-4 py-3 text-xs font-medium text-muted-foreground">
          <span>Imagem</span>
          <span>Produto</span>
          <span>Preço</span>
          <span className="text-center">Quantidade</span>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[64px_minmax(0,1fr)_100px_120px] items-center gap-4 border-b px-4 py-4 last:border-b-0"
          >
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-muted">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-muted-foreground">
                  Sem imagem
                </span>
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{product.name}</p>
            </div>

            <p className="text-sm font-medium">
              R$ {formatCurrency(Number(product.price))}
            </p>

            <div className="flex items-center justify-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeItem(product.id)}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-7 text-center text-sm font-medium">
                {product.quantity}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => addItem(product.id)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
