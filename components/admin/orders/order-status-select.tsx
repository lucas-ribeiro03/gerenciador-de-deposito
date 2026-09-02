"use client";

import { useMemo } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { OrderStatus } from "@prisma/client";

type OrderStatusSelectProps = {
  status: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

export function OrderStatusSelect({
  status,
  onChange,
  disabled = false,
}: OrderStatusSelectProps) {
  const availableStatuses = useMemo(
    () => [status, ...statusTransitions[status]],
    [status],
  );

  const isFinalStatus = status === "DELIVERED" || status === "CANCELLED";

  return (
    <div className="space-y-2">
      <Label>Status do pedido</Label>

      <Select
        value={statusLabels[status]}
        onValueChange={(value) => {
          if (!value) return;

          onChange(value as OrderStatus);
        }}
        disabled={disabled || isFinalStatus}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {availableStatuses.map((statusOption) => (
            <SelectItem key={statusOption} value={statusOption}>
              {statusLabels[statusOption]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isFinalStatus && (
        <p className="text-xs text-muted-foreground">
          Este pedido já foi encerrado e não pode ter o status alterado.
        </p>
      )}
    </div>
  );
}
