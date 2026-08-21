"use server";

import { auth } from "@/lib/auth";
import { createOrderService } from "@/services/order/create-order-service";
import type { CartItem } from "@/types/cart";
import type { DeliveryType, PaymentMethod } from "@prisma/client";
import { cookies } from "next/headers";
import { z } from "zod";

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),

  paymentMethod: z.enum(["PIX", "CREDIT_CARD", "DEBIT_CARD", "MONEY"]),
  deliveryMethod: z.enum(["PICKUP", "DELIVERY"]),
});

type createOrderActionProps = {
  paymentMethod: PaymentMethod;
  items: CartItem[];
  deliveryMethod: DeliveryType;
};

export async function createOrderAction({
  paymentMethod,
  items,
  deliveryMethod,
}: createOrderActionProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  const result = createOrderSchema.safeParse({
    paymentMethod,
    items,
    deliveryMethod,
  });

  if (!result.success) {
    return {
      success: false,
      message: "Dados do pedido inválidos.",
    };
  }

  try {
    const order = await createOrderService({
      userId: session.user.id,
      items: result.data.items,
      paymentMethod: result.data.paymentMethod,
      deliveryMethod: result.data.deliveryMethod,
    });

    const cookieStore = await cookies();
    cookieStore.delete("delivery_fee_quote");

    return {
      success: true,
      message: "Pedido criado com sucesso",
      orderId: order.id,
    };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Não foi possível finalizar o pedido.",
    };
  }
}
