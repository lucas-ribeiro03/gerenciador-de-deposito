"use server";

import { signIn } from "@/lib/auth";
import type { ActionResponse } from "@/types/action-response";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData): Promise<ActionResponse> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return {
      success: true,
      message: "Login realizado com sucesso.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "E-mail ou senha inválidos.",
      };
    }

    return {
      success: false,
      message: "Erro interno do servidor.",
    };
  }
}
