import { api } from '@/lib/api-client';
import {
  userArraySchema,
  type IUserArray,
} from '../schemas/user-list-schema';

export const getUserList = async (): Promise<IUserArray> => {
  const { data } = await api.get('/admin/user-list');

  const validatedData = userArraySchema.parse(data);

  return validatedData;
};
