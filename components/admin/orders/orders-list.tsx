"use client";

import { useState } from "react";

import type { AdminOrder } from "@/services/order/get-all-orders-service";

import { OrderCard } from "./order-card";

type OrdersListProps = {
  orders: AdminOrder[];
};

export function OrdersList({ orders }: OrdersListProps) {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Nenhum pedido encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          open={openOrderId === order.id}
          onOpenChange={(open) => setOpenOrderId(open ? order.id : null)}
        />
      ))}
    </div>
  );
}
