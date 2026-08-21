"use server";

import { getCartProductsService } from "@/services/cart/get-cart-product-service";

import type { CartItem } from "@/types/cart";

export async function getCartProductsAction(items: CartItem[]) {
  return getCartProductsService(items);
}
