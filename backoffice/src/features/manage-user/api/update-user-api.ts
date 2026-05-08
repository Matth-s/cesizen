import { api } from '@/lib/api-client';
import {
  updateUserResponseSchema,
  type IUpdateUserType,
  type updateUserResponseType,
} from '../schemas/update-user-schema';

export const updateUserApi = async (
  formData: IUpdateUserType,
): Promise<updateUserResponseType> => {
  const { data } = await api.put(
    `/admin/update-user-status?userId=${formData.id}`,
  );

  const validatedRes = updateUserResponseSchema.parse(data);

  return validatedRes;
};
