import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres"),

  phone: z.string().trim().min(10, "Informe um telefone válido"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
