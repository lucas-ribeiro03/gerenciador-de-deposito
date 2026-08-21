"use server";

import { z } from "zod";

import { setDeliveryFee } from "@/services/delivery/calculate-delivery-fee-service";
import { createDeliveryFeeToken } from "@/lib/delivery-fee-token";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

const calculateDeliveryFeeSchema = z.object({
  street: z.string().min(1),
  number: z.string().min(1),
  district: z.string().min(1),
  zipCode: z.string().nullable(),
  addressId: z.string().min(1),
});

export async function calculateDeliveryFeeAction(formData: FormData) {
  const result = calculateDeliveryFeeSchema.safeParse({
    street: formData.get("street"),
    number: formData.get("number"),
    district: formData.get("district"),
    zipCode: formData.get("zipCode") || null,
    addressId: formData.get("addressId"),
  });

  const session = await auth();

  if (!session || !session.user) {
    return {
      success: false,
      message: "Você precisa estar logado para isso",
    };
  }

  const { id } = session.user;

  if (!result.success) {
    return {
      success: false,
      message: "Endereço inválido.",
    };
  }

  try {
    const deliveryFee = await setDeliveryFee({ address: result.data });

    if (deliveryFee === null) {
      return {
        success: false,
        message: "Não realizamos entregas para este endereço.",
      };
    }

    const token = createDeliveryFeeToken({
      userId: id,
      addressId: result.data.addressId,
      deliveryFee,
    });

    const cookieStore = await cookies();

    cookieStore.set("delivery_fee_quote", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60,
      path: "/",
    });

    return {
      success: true,
      deliveryFee,
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível calcular o frete.",
    };
  }
}
