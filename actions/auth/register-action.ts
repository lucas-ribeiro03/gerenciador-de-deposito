"use server";

import type { ActionResponse } from "@/types/action-response";
import { createUserService } from "@/services/auth/create-user-service";

import { registerSchema } from "@/schemas/auth/register-schema";

export async function registerAction(
  formData: FormData,
): Promise<ActionResponse> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos.",
    };
  }

  try {
    return await createUserService({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      password: parsed.data.password,
    });
  } catch {
    return {
      success: false,
      message: "Erro ao criar conta.",
    };
  }
}
