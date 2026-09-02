"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "../cart/cart-sheet";
import dynamic from "next/dynamic";
import { useState } from "react";

const CartCount = dynamic(
  () => import("./cart-count").then((mod) => mod.CartCount),
  {
    ssr: false,
  },
);

export function CartButton() {
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
          <CartCount />
        </Badge>
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
