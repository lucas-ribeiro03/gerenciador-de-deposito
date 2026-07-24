import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "O nome deve possuir no mínimo 3 caracteres."),

    email: z.email("E-mail inválido."),

    phone: z.string().trim().min(10, "Telefone inválido."),

    password: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
