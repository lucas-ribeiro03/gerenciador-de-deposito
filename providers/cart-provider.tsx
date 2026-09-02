"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { clearCart, getCart, saveCart } from "@/lib/cart";

import type { CartContextType, CartItem } from "@/types/cart";

const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => getCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem: CartContextType["addItem"] = (productId) => {
    setItems((currentItems) => {
      const itemExists = currentItems.find(
        (item) => item.productId === productId,
      );

      if (itemExists) {
        return currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          productId,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem: CartContextType["removeItem"] = (productId) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.productId === productId);

      if (!item) {
        return currentItems;
      }

      if (item.quantity > 1) {
        return currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        );
      }

      return currentItems.filter((item) => item.productId !== productId);
    });
  };

  const clearCartStorage: CartContextType["clearCart"] = () => {
    clearCart();
    setItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart: clearCartStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser utilizado dentro de CartProvider");
  }

  return context;
}
