"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  disabled?: boolean;
};

export function AddToCartButton({ disabled }: AddToCartButtonProps) {
  return (
    <Button className="w-full" disabled={disabled}>
      <ShoppingCart />
      Adicionar
    </Button>
  );
}
