import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve possuir pelo menos 2 caracteres.")
    .max(50, "O nome deve possuir no máximo 50 caracteres."),
});

export type CategorySchema = z.infer<typeof categorySchema>;
