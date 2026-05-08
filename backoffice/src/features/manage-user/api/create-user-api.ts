import { api } from '@/lib/api-client';
import type { ICreateUser } from '../schemas/create-user-schema';

export const createUserApi = async (
  formData: ICreateUser,
): Promise<void> => {
  await api.post('/admin/create-admin-account', formData);
};
