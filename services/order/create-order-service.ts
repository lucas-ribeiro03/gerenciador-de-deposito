import { cookies } from "next/headers";

import { prisma } from "@/prisma/prisma";

import { getCartProductsService } from "@/services/cart/get-cart-product-service";
import { verifyDeliveryFeeToken } from "@/lib/delivery-fee-token";

import type { CartItem } from "@/types/cart";
import type { DeliveryType, PaymentMethod } from "@prisma/client";

type CreateOrderServiceInput = {
  userId: string;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryType;
};

export async function createOrderService({
  userId,
  items,
  paymentMethod,
  deliveryMethod,
}: CreateOrderServiceInput) {
  /**
   * Busca os produtos reais no banco.
   * O cliente fornece somente productId + quantity.
   */
  const products = await getCartProductsService(items);

  if (products.length !== items.length) {
    throw new Error(
      "Um ou mais produtos do carrinho não estão mais disponíveis.",
    );
  }

  /**
   * Delivery Quote
   *
   * Cookie existente = DELIVERY
   * Cookie inexistente = PICKUP
   */
  const cookieStore = await cookies();

  const deliveryFeeToken = cookieStore.get("delivery_fee_quote")?.value;

  let addressId: string | null = null;
  let deliveryFee = 0;

  if (deliveryMethod === "DELIVERY") {
    if (!deliveryFeeToken) {
      throw new Error("O cálculo do frete expirou. Calcule o frete novamente.");
    }

    const quote = verifyDeliveryFeeToken(deliveryFeeToken);

    if (!quote) {
      throw new Error("O cálculo do frete é inválido ou expirou.");
    }

    if (quote.userId !== userId) {
      throw new Error("O cálculo do frete não pertence a este usuário.");
    }

    addressId = quote.addressId;
    deliveryFee = quote.deliveryFee;
  }

  if (deliveryMethod === "PICKUP") {
    addressId = null;
    deliveryFee = 0;
  }
  /**
   * Criação dos itens do pedido utilizando
   * os preços reais encontrados no banco.
   */
  const orderItems = products.map((product) => {
    const unitPrice = Number(product.promotionalPrice ?? product.price);

    const total = unitPrice * product.quantity;

    return {
      productId: product.id,
      quantity: product.quantity,
      unitPrice,
      total,
    };
  });

  /**
   * Subtotal dos produtos.
   */
  const subtotal = orderItems.reduce((total, item) => total + item.total, 0);

  /**
   * Atualmente não temos sistema de desconto.
   */
  const discount = 0;

  /**
   * Total definitivo do pedido.
   */
  const total = subtotal + deliveryFee - discount;

  /**
   * Cria Order e OrderItems em uma única transação.
   */
  const order = await prisma.$transaction(async (transaction) => {
    return transaction.order.create({
      data: {
        userId,
        addressId,
        deliveryType: deliveryMethod,
        paymentMethod,
        subtotal,
        deliveryFee,
        discount,
        total,

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });
  });

  return order;
}
