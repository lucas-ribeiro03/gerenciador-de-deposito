import { z } from "zod";

export const createAddressSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe um título para o endereço.")
    .max(50, "O título deve ter no máximo 50 caracteres."),

  street: z.string().trim().min(1, "Informe a rua."),

  number: z.string().trim().min(1, "Informe o número."),

  district: z.string().trim().min(1, "Informe o bairro."),

  zipCode: z
    .string()
    .trim()
    .max(9, "CEP Possui no máximo 9 caractéres")
    .optional()
    .or(z.literal("")),

  complement: z.string().trim().optional().or(z.literal("")),
});

export type CreateAddressSchema = z.infer<typeof createAddressSchema>;
