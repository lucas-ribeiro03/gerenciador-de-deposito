import { z } from "zod";
export const orderFiltersSchema = z.object({
  search: z.string().optional(),

  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ])
    .optional(),

  period: z.enum(["today", "yesterday", "week", "month"]).default("today"),

  sort: z
    .enum(["newest", "oldest", "highestTotal", "lowestTotal"])
    .default("newest"),
});
