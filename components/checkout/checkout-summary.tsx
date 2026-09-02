"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import type { CartProduct } from "@/types/cart";
import type { DeliveryType } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters/currency";
import { useDelivery } from "@/providers/deliveryFeeProvider";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type CheckoutSummaryProps = {
  products: CartProduct[];
  deliveryMethod: DeliveryType;
};

export function CheckoutSummary({
  products,
  deliveryMethod,
}: CheckoutSummaryProps) {
  const subtotal = useMemo(() => {
    return products.reduce(
      (total, product) => total + Number(product.price) * product.quantity,
      0,
    );
  }, [products]);

  const { deliveryFee } = useDelivery();

  return (
    <aside className="h-fit rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Resumo do pedido</h2>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>

          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Entrega</span>

          <span>
            <span>
              {deliveryMethod === "PICKUP"
                ? "Grátis"
                : formatCurrency(Number(deliveryFee))}
            </span>
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>

            <span className="text-lg font-bold">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          deliveryFee === null && deliveryMethod === "DELIVERY"
            ? toast.error("Frete ainda não calculado")
            : redirect("/finish-order");
        }}
        className="mt-6 w-full"
      >
        Continuar
      </Button>
    </aside>
  );
}
