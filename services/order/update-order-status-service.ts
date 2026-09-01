import { prisma } from "@/prisma";
import type { OrderStatus } from "@prisma/client";

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

type UpdateOrderStatusServiceInput = {
  orderId: string;
  status: OrderStatus;
};

export async function updateOrderStatusService({
  orderId,
  status,
}: UpdateOrderStatusServiceInput) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!order) {
    return {
      success: false,
      message: "Pedido não encontrado.",
    };
  }

  const allowedStatuses = allowedTransitions[order.status];

  if (!allowedStatuses.includes(status)) {
    return {
      success: false,
      message: `Não é possível alterar o pedido de "${order.status}" para "${status}".`,
    };
  }

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status,
    },
  });

  return {
    success: true,
    message: "Status do pedido atualizado com sucesso.",
  };
}
