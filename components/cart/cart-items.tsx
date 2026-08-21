"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { useSession } from "next-auth/react";

import type { CartProduct } from "@/types/cart";
import { formatCurrency } from "@/lib/formatters/currency";

type CartItemsProps = {
  products: CartProduct[];
};

export function CartItems({ products }: CartItemsProps) {
  const { addItem, removeItem, clearCart } = useCart();

  const router = useRouter();

  const { status } = useSession();

  const subtotal = useMemo(() => {
    return products.reduce(
      (total: number, product: CartProduct) =>
        total + Number(product.price) * product.quantity,
      0,
    );
  }, [products]);

  function handleContinue() {
    console.log(status);
    if (status === "authenticated") {
      router.push("/checkout");
      return;
    }

    router.push("/login?callbackUrl=/checkout");
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Seu carrinho está vazio.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="grid grid-cols-[56px_minmax(0,1fr)_80px_100px] items-center gap-3 border-b border-border pb-3 text-xs font-medium text-muted-foreground">
        <span>Imagem</span>
        <span>Produto</span>
        <span>Preço</span>
        <span className="text-center">Quantidade</span>
      </div>

      <div className="flex flex-col">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[56px_minmax(0,1fr)_80px_100px] items-center gap-3 border-b border-border py-4"
          >
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-muted">
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

            <div className="text-sm font-medium">
              R$ {formatCurrency(Number(product.price))}
            </div>

            <div className="flex items-center justify-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => removeItem(product.id)}
                aria-label={`Remover uma unidade de ${product.name}`}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-6 text-center text-sm font-medium">
                {product.quantity}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => addItem(product.id)}
                aria-label={`Adicionar uma unidade de ${product.name}`}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-border pt-4 px-2">
        <div className="flex items-center justify-between ">
          <span className="text-sm font-medium">Subtotal</span>

          <span className="text-lg font-semibold">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={clearCart}
        >
          <Trash2 />
          Limpar carrinho
        </Button>

        <Button type="button" className="mt-2 w-full" onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
