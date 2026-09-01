"use server";

import { auth } from "@/lib/auth";
import type { OrderStatus } from "@prisma/client";

import { updateOrderStatusService } from "@/services/order/update-order-status-service";

type UpdateOrderStatusActionInput = {
  orderId: string;
  status: OrderStatus;
};

export async function updateOrderStatusAction({
  orderId,
  status,
}: UpdateOrderStatusActionInput) {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Você não tem permissão para realizar esta ação.",
    };
  }

  return updateOrderStatusService({
    orderId,
    status,
  });
}
