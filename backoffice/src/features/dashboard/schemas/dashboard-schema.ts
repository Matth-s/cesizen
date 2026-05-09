import { z } from 'zod';

export const dashboardStatsSchema = z.object({
  totalPages: z.number(),
  totalPublishedPages: z.number(),
  totalMenus: z.number(),
  totalUsers: z.number(),
  totalQuiz: z.number(),
});

export type IDashboardStats = z.infer<typeof dashboardStatsSchema>;
