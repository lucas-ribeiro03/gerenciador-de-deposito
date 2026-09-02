"use client";

import { useCart } from "@/providers/cart-provider";

export function CartCount() {
  const { items } = useCart();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return <>{totalItems}</>;
}
