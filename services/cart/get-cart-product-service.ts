import { prisma } from "@/prisma/prisma";

import type { CartItem, CartProduct } from "@/types/cart";

export async function getCartProductsService(
  items: CartItem[],
): Promise<CartProduct[]> {
  if (items.length === 0) {
    return [];
  }

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const quantityMap = new Map(
    items.map((item) => [item.productId, item.quantity]),
  );

  return products.map((product) => ({
    ...product,
    quantity: quantityMap.get(product.id) ?? 1,
  }));
}
