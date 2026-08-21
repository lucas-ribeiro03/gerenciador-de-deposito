"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  disabled?: boolean;
  productId: string;
} & React.ComponentProps<"button">;

export function AddToCartButton({ disabled, productId }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      className="w-full"
      disabled={disabled}
      onClick={() => {
        addItem(productId);
        console.log(productId);
        console.log("click");
      }}
    >
      <ShoppingCart />
      Adicionar
    </Button>
  );
}
