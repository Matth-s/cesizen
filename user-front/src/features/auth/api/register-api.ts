import { api } from '@/libs/api-client';
import {
  registerResponseSchema,
  type registerResponseType,
  type registerType,
} from '../schemas/register-schema';

export const registerApi = async (
  userData: registerType,
): Promise<registerResponseType> => {
  const { data } = await api.post(
    '/authentication/register',
    userData,
  );

  const validatedData = registerResponseSchema.parse(data);

  return validatedData;
};
