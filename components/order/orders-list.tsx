"use client";

import { useState } from "react";

import type { UserOrder } from "@/services/order/get-user-orders-service";

import { OrderCard } from "./order-card";

type OrdersListProps = {
  orders: UserOrder[];
};

export function OrdersList({ orders }: OrdersListProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  function handleOpenChange(orderId: string, open: boolean) {
    setExpandedOrderId(open ? orderId : null);
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          open={expandedOrderId === order.id}
          onOpenChange={(open) => handleOpenChange(order.id, open)}
        />
      ))}
    </div>
  );
}
