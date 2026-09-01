"use client";

import { ChevronDown, Router } from "lucide-react";

import type { AdminOrder } from "@/services/order/get-all-orders-service";

import { formatCurrency } from "@/lib/formatters/currency";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { OrderStatusBadge } from "./order-status-badge";
import { OrderStatusSelect } from "./order-status-select";
import { useState, useTransition } from "react";
import type { OrderStatus } from "@prisma/client";
import { UpdateOrderStatusDialog } from "./update-order-status-dialog";
import { updateOrderStatusAction } from "@/actions/order/update-order-status-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type OrderCardProps = {
  order: AdminOrder;
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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const router = useRouter();

  const [, startTransition] = useTransition();

  function handleStatusChange(status: OrderStatus) {
    const requiresConfirmation =
      status === "CANCELLED" || status === "DELIVERED";

    if (requiresConfirmation) {
      setPendingStatus(status);
      setConfirmOpen(true);
      return;
    }

    updateStatus(status);
  }

  function updateStatus(status: OrderStatus) {
    startTransition(async () => {
      const result = await updateOrderStatusAction({
        orderId: order.id,
        status,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setConfirmOpen(false);
      setPendingStatus(null);

      router.refresh();
    });
  }

  const statusColors: Record<OrderStatus, string> = {
    PENDING: "border-yellow-500/30",
    CONFIRMED: "border-blue-500/30",
    OUT_FOR_DELIVERY: "border-purple-500/30",
    DELIVERED: "border-green-500/30",
    CANCELLED: "border-red-500/30",
  };

  return (
    <>
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

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Cliente</p>

                <p className="mt-1 truncate text-sm font-medium">
                  {order.user.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Itens</p>

                <p className="mt-1 text-sm font-medium">
                  {itemsQuantity} {itemsQuantity === 1 ? "item" : "itens"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Entrega</p>

                <p className="mt-1 text-sm font-medium">
                  {order.deliveryType === "DELIVERY" ? "Entrega" : "Retirada"}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-muted-foreground">Total</p>

                <p className="mt-1 text-sm font-semibold">
                  {formatCurrency(Number(order.total))}
                </p>
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="border-t border-border px-4 pb-4">
              {/* Cliente */}
              <section className="pt-4">
                <h3 className="mb-3 text-sm font-semibold">Cliente</h3>

                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-foreground">
                      {order.user.name}
                    </p>

                    <p className="text-muted-foreground">{order.user.phone}</p>

                    <p className="text-muted-foreground">{order.user.email}</p>
                  </div>
                </div>
              </section>

              {/* Produtos */}
              <section className="mt-5 border-t border-border pt-4">
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
                          {item.quantity} ×{" "}
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

              {/* Endereço / retirada */}
              <section className="mt-5 border-t border-border pt-4">
                <h3 className="mb-3 text-sm font-semibold">
                  {order.deliveryType === "DELIVERY"
                    ? "Endereço de entrega"
                    : "Entrega"}
                </h3>

                {order.deliveryType === "DELIVERY" && order.address ? (
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
                ) : (
                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    Retirada na loja
                  </div>
                )}
              </section>

              {/* Resumo financeiro */}
              <section className="mt-5 border-t border-border pt-4">
                <h3 className="mb-3 text-sm font-semibold">
                  Resumo financeiro
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Subtotal</span>

                    <span>{formatCurrency(Number(order.subtotal))}</span>
                  </div>

                  {Number(order.discount) > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Desconto</span>

                      <span className="text-green-600">
                        -{formatCurrency(Number(order.discount))}
                      </span>
                    </div>
                  )}

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

              {/* Informações do pedido */}
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

              {/* Status */}
              <section className="mt-5 border-t border-border pt-4">
                <OrderStatusSelect
                  status={order.status}
                  onChange={handleStatusChange}
                />
              </section>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <UpdateOrderStatusDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        status={pendingStatus}
        onConfirm={() => {
          if (!pendingStatus) {
            return;
          }

          updateStatus(pendingStatus);
        }}
      />
    </>
  );
}
