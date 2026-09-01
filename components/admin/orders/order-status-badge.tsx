import { Badge } from "@/components/ui/badge";

import type { OrderStatus } from "@prisma/client";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

const statusColors: Record<OrderStatus, string> = {
  PENDING: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600",
  CONFIRMED: "border-blue-500/30 bg-blue-500/10 text-blue-600",
  OUT_FOR_DELIVERY: "border-purple-500/30 bg-purple-500/10 text-purple-600",
  DELIVERED: "border-green-500/30 bg-green-500/10 text-green-600",
  CANCELLED: "border-red-500/30 bg-red-500/10 text-red-600",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="outline" className={statusColors[status]}>
      {statusLabels[status]}
    </Badge>
  );
}
