"use client";

import type { OrderStatus } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useOrderFilters } from "@/hooks/use-order-filters";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

export function OrderStatusFilter() {
  const { status, updateParams } = useOrderFilters();

  return (
    <Select
      value={status}
      onValueChange={(value) =>
        updateParams({
          status: value === "ALL" ? null : value,
        })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">Todos os status</SelectItem>

        {Object.entries(statusLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
