// actions/profile/update-profile-action.ts

"use server";

import { auth } from "@/lib/auth";

import { updateProfileSchema } from "@/schemas/profile/update-profile-schema";
import { updateProfileService } from "@/services/profile/update-profile-service";

export async function updateProfileAction(data: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  const result = updateProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  try {
    await updateProfileService(session.user.id, result.data);

    return {
      success: true,
      message: "Perfil atualizado com sucesso!",
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível atualizar seu perfil.",
    };
  }
}
