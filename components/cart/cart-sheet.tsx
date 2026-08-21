"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCart } from "@/providers/cart-provider";

import { getCartProductsAction } from "@/actions/cart/get-cart-products-action";

import type { CartProduct } from "@/types/cart";

import { CartItems } from "./cart-items";
import { Loader2Icon } from "lucide-react";

type CartSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items } = useCart();

  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    async function loadCartProducts() {
      setIsLoading(true);

      try {
        const cartProducts = await getCartProductsAction(items);

        setProducts(cartProducts);
      } finally {
        setIsLoading(false);
      }
    }

    loadCartProducts();
  }, [open, items]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full! flex-col">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              <Loader2Icon className="animate-spin" />
            </p>
          </div>
        ) : (
          <CartItems products={products} />
        )}
      </SheetContent>
    </Sheet>
  );
}
