import type { Product } from "@prisma/client";

export type CartItem = {
  productId: Product["id"];
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];

  addItem: (productId: Product["id"]) => void;
  removeItem: (productId: Product["id"]) => void;
  clearCart: () => void;
};

export type CartProduct = Product & {
  quantity: number;
};
