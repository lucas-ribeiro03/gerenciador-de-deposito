import { z } from "zod";

import { dashboardPeriods } from "@/lib/dashboard-period";

export const dashboardFilterSchema = z.object({
  period: z.enum(dashboardPeriods).default("week"),
});

export type DashboardFilter = z.infer<typeof dashboardFilterSchema>;
