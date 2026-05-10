import { api } from '@/lib/api-client';

export const logOutApi = async (): Promise<void> => {
  await api.post('/user/logout');
};
