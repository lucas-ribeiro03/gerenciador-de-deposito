"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useDelivery } from "@/providers/deliveryFeeProvider";

import { PaymentMethodSelector } from "./payment-method-selector";
import { useCart } from "@/providers/cart-provider";
import type { CartProduct } from "@/types/cart";
import { getCartProductsAction } from "@/actions/finish-order/get-products-from-order";
import type { PaymentMethod } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters/currency";
import { createOrderAction } from "@/actions/order/create-order-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FinishOrderSummaryProps = {
  deliveryFeeAlreadyExists: number | null;
};

export function FinishOrderSummary({
  deliveryFeeAlreadyExists,
}: FinishOrderSummaryProps) {
  const router = useRouter();
  const { deliveryFee, deliveryMethod, setDeliveryFee } = useDelivery();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");
  const { items, clearCart } = useCart();

  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const cartProducts = await getCartProductsAction(items);

      console.log(deliveryFee);
      setProducts(cartProducts);
    }

    loadProducts();
  }, [items]);

  useEffect(() => {
    console.log(deliveryFeeAlreadyExists);
    if (deliveryFeeAlreadyExists) setDeliveryFee(deliveryFeeAlreadyExists);
  });

  const subtotal = products.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0,
  );

  const total = subtotal + (deliveryFee ?? 0);

  const handleCreateOrder = async () => {
    const result = await createOrderAction({
      paymentMethod,
      items,
      deliveryMethod,
    });
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    clearCart();
    setDeliveryFee(null);
    router.replace("/");
    toast.success(result.message);
  };

  return (
    <section className="space-y-6 rounded-xl border bg-card p-4">
      <div>
        <h1 className="text-xl font-semibold">Revisar pedido</h1>

        <p className="text-sm text-muted-foreground">
          Confira os detalhes do seu pedido antes de finalizar.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-semibold">Produtos</h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-3"
          >
            <div className="min-w-0 flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {product.quantity}x
              </p>
              <p className="truncate font-medium">{product.name}</p>
            </div>

            <span className="shrink-0 font-medium">
              {formatCurrency(
                product.promotionalPrice
                  ? product.promotionalPrice
                  : product.price,
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>

          <span>
            {deliveryFee === null
              ? "Não calculado"
              : formatCurrency(deliveryFee)}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <span>Total</span>

          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <PaymentMethodSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      <Button
        type="button"
        className="w-full"
        disabled={!paymentMethod}
        onClick={handleCreateOrder}
      >
        Finalizar pedido
      </Button>
    </section>
  );
}
