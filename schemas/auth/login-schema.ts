import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
