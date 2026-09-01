import type { OrderStatus } from "@prisma/client";

import { cn } from "@/lib/utils";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pendente",
    className: "bg-yellow-500/10 text-yellow-600",
  },

  CONFIRMED: {
    label: "Confirmado",
    className: "bg-blue-500/10 text-blue-600",
  },

  OUT_FOR_DELIVERY: {
    label: "Saiu para entrega",
    className: "bg-purple-500/10 text-purple-600",
  },

  DELIVERED: {
    label: "Entregue",
    className: "bg-green-500/10 text-green-600",
  },

  CANCELLED: {
    label: "Cancelado",
    className: "bg-red-500/10 text-red-600",
  },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
