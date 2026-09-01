"use client";

import { ChevronDown } from "lucide-react";

import type { UserOrder } from "@/services/order/get-user-orders-service";

import { formatCurrency } from "@/lib/formatters/currency";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { OrderStatusBadge } from "./order-status-badge";

type OrderCardProps = {
  order: UserOrder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderCard({ order, open, onOpenChange }: OrderCardProps) {
  const itemsQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const paymentMethodLabels = {
    PIX: "Pix",
    CREDIT_CARD: "Cartão de crédito",
    DEBIT_CARD: "Cartão de débito",
    MONEY: "Dinheiro",
  };

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <CollapsibleTrigger className="w-full p-4 text-left transition-colors hover:bg-muted/50">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Pedido #{order.id.slice(-8)}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(order.createdAt)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <OrderStatusBadge status={order.status} />

              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Itens</p>

              <p className="text-sm font-medium">
                {itemsQuantity} {itemsQuantity === 1 ? "item" : "itens"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>

              <p className="text-base font-semibold">
                {formatCurrency(Number(order.total))}
              </p>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-border px-4 pb-4">
            {/* Produtos */}
            <section className="pt-4">
              <h3 className="mb-3 text-sm font-semibold">Produtos</h3>

              <div className="divide-y divide-border rounded-lg border border-border">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.quantity} x{" "}
                        {formatCurrency(Number(item.unitPrice))}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      {formatCurrency(Number(item.total))}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Endereço */}
            {order.deliveryType === "DELIVERY" && order.address && (
              <section className="mt-5 border-t border-border pt-4">
                <h3 className="mb-3 text-sm font-semibold">
                  Endereço de entrega
                </h3>

                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <p>
                    {order.address.street}, {order.address.number}
                  </p>

                  <p>
                    {order.address.district} - CEP {order.address.zipCode}
                  </p>

                  {order.address.complement && (
                    <p>{order.address.complement}</p>
                  )}
                </div>
              </section>
            )}

            {/* Resumo financeiro */}
            <section className="mt-5 border-t border-border pt-4">
              <h3 className="mb-3 text-sm font-semibold">Resumo</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Subtotal</span>

                  <span>{formatCurrency(Number(order.subtotal))}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Frete</span>

                  <span>{formatCurrency(Number(order.deliveryFee))}</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-border pt-3 font-semibold">
                  <span>Total</span>

                  <span>{formatCurrency(Number(order.total))}</span>
                </div>
              </div>
            </section>

            {/* Método de entrega */}
            <section className="mt-5 border-t border-border pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Método de entrega
                  </span>

                  <span className="font-medium">
                    {order.deliveryType === "DELIVERY"
                      ? "Entrega"
                      : "Retirada na loja"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Forma de pagamento
                  </span>

                  <span className="font-medium">
                    {paymentMethodLabels[order.paymentMethod]}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
