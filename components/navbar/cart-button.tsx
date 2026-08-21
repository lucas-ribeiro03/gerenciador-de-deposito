"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CartItem } from "@/types/cart";
import { useMemo, useState } from "react";
import { useCart } from "@/providers/cart-provider";
import { CartSheet } from "../cart/cart-sheet";

export function CartButton() {
  const { items } = useCart();
  const totalItems = useMemo(() => {
    return items.reduce<number>(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    );
  }, [items]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-brand-gold"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="size-5" />

        <Badge
          className="
        absolute
        -top-1
        -right-1
        h-5
        min-w-5
        rounded-full
        px-1
        text-[10px]
        bg-destructive
        text-destructive-foreground
      "
        >
          {totalItems}
        </Badge>
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
