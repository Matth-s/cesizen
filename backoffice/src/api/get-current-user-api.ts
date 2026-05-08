import {
  currentUserSchema,
  type ICurrentUserResponse,
} from '@/features/auth/schemas/auth-schema';
import { api } from '@/lib/api-client';

export const getCurrentUserApi =
  async (): Promise<ICurrentUserResponse> => {
    const { data } = await api.get('/user/current');

    const validatedData = currentUserSchema.parse(data);

    return validatedData;
  };
