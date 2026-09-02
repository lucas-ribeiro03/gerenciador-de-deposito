"use client";

import { useEffect, useState } from "react";

import { getCartProductsAction } from "@/actions/cart/get-cart-products-action";
import { useCart } from "@/providers/cart-provider";
import type { CartProduct } from "@/types/cart";

import { CheckoutItems } from "./checkout-items";
import { CheckoutSummary } from "./checkout-summary";
import { CheckoutAddress } from "./checkout-address";
import type { CheckoutAddress as CheckoutAddressType } from "@/types/address";
import { CheckoutDeliveryMethod } from "./delivery-method";
import { useDelivery } from "@/providers/deliveryFeeProvider";

type CheckoutPageProps = {
  addresses: CheckoutAddressType[];
  deliveryFeeAlreadyExists: number | null;
};

export function CheckoutPage({
  addresses,
  deliveryFeeAlreadyExists,
}: CheckoutPageProps) {
  const { items } = useCart();

  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { deliveryMethod, setDeliveryMethod, setDeliveryFee } = useDelivery();

  useEffect(() => {
    console.log(deliveryFeeAlreadyExists);
    if (deliveryFeeAlreadyExists) setDeliveryFee(deliveryFeeAlreadyExists);
  });

  useEffect(() => {
    async function loadProducts() {
      if (items.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const cartProducts = await getCartProductsAction(items);

        setProducts(cartProducts);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [items]);

  if (isLoading) {
    return (
      <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Carregando checkout...</p>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Seu carrinho está vazio.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Confira os produtos antes de continuar.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <CheckoutItems products={products} />
        <CheckoutDeliveryMethod
          value={deliveryMethod}
          onChange={setDeliveryMethod}
        />

        <CheckoutSummary products={products} deliveryMethod={deliveryMethod} />
        {deliveryMethod === "DELIVERY" && (
          <CheckoutAddress addresses={addresses} />
        )}
      </div>
    </main>
  );
}
