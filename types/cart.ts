import type { PublicProduct } from "@/services/product/get-public-products-service";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];

  addItem: (productId: PublicProduct["id"]) => void;
  removeItem: (productId: PublicProduct["id"]) => void;
  clearCart: () => void;
};

export type CartProduct = PublicProduct & {
  quantity: number;
};
