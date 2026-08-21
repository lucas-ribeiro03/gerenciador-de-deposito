"use server";

import { auth } from "@/lib/auth";
import { createAddressSchema } from "@/schemas/address/create-address-schema";
import { createAddressService } from "@/services/address/create-address-service";
import type { ActionResponse } from "@/types/action-response";
import type { CheckoutAddress } from "@/types/address";

export type CreatedAddress = {
  id: string;
  title: string | null;
  street: string;
  number: string;
  district: string;
  zipCode: string | null;
  complement: string | null;
  lastUsedAt: string | null;
};

type CreateAddressActionResponse = ActionResponse & {
  address?: CheckoutAddress;
};

export async function createAddressAction(
  formData: FormData,
): Promise<CreateAddressActionResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar autenticado.",
      };
    }

    const data = createAddressSchema.safeParse({
      title: formData.get("title"),
      street: formData.get("street"),
      number: formData.get("number"),
      district: formData.get("district"),
      zipCode: formData.get("zipCode"),
      complement: formData.get("complement"),
    });

    if (!data.success) {
      return {
        success: false,
        message: "Verifique os dados do endereço.",
      };
    }

    const address = await createAddressService({
      userId: session.user.id,
      ...data.data,
    });

    return {
      success: true,
      message: "Endereço cadastrado com sucesso.",
      address,
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível cadastrar o endereço.",
    };
  }
}
