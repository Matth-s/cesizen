import { api } from '@/lib/api-client';
import {
  dashboardStatsSchema,
  type IDashboardStats,
} from '../schemas/dashboard-schema';

export const getStatsApi = async (): Promise<IDashboardStats> => {
  const { data } = await api.get('/dashboard');

  const validatedData = dashboardStatsSchema.parse(data);

  return validatedData;
};
