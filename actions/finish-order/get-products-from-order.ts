"use server";

import type { CartItem, CartProduct } from "@/types/cart";
import { getCartProductsService } from "@/services/cart/get-cart-product-service";

export async function getCartProductsAction(
  items: CartItem[],
): Promise<CartProduct[]> {
  return getCartProductsService(items);
}
