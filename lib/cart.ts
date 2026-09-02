"use client";
import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "point-do-grell:cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cart = localStorage.getItem(CART_STORAGE_KEY);

  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearCart() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CART_STORAGE_KEY);
}
