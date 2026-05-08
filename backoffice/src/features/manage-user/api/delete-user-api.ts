import { api } from '@/lib/api-client';

export const deleteUserApi = async (
  userId: string,
): Promise<void> => {
  await api.delete(`/admin/delete-user?userId=${userId}`);
};
