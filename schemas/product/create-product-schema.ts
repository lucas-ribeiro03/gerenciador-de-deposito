import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome deve possuir pelo menos 3 caracteres.")
    .max(120),

  description: z.string().trim().max(500).optional(),

  categoryId: z.string(),

  price: z
    .string()
    .min(1, "Informe o preço.")
    .refine((value) => Number(value) > 0, "Preço inválido."),

  promotionalPrice: z
    .string()
    .optional()
    .refine(
      (value) => value === "" || value === undefined || Number(value) > 0,
      "Preço promocional inválido.",
    ),

  isAvailable: z.boolean(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
