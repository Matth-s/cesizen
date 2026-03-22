import { api } from '@/libs/api-client';
import type { loginType } from '../schemas/login-schema';

export const loginApi = async (credentials: loginType) => {
  const { data } = await api.post(
    '/authentication/login',
    credentials,
  );

  return data;
};
