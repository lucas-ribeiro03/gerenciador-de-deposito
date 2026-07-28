"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CartButton() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Link href="/cart">
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
          "
        >
          0
        </Badge>
      </Link>
    </Button>
  );
}
