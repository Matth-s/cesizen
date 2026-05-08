import { api } from '@/lib/api-client';
import {
  currentUserSchema,
  type ICurrentUserResponse,
  type ILogin,
} from '../schemas/auth-schema';

export const loginApi = async (
  formData: ILogin,
): Promise<ICurrentUserResponse> => {
  const { data } = await api.post(
    '/authentication/admin/login',
    formData,
  );

  const validatedData = currentUserSchema.parse(data);

  return validatedData;
};
