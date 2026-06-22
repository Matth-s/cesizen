import { api } from '@/lib/api-client';
import {
  menuArraySchema,
  type ICreateMenu,
  type IMenuArray,
  type IUpdateMenu,
} from '../schema/menu-schema';

export const getMenuApi = async (): Promise<IMenuArray> => {
  const { data } = await api.get('/menu/all');

  const validatedData = menuArraySchema.parse(data);

  return validatedData;
};

export const createMenuApi = async (
  data: ICreateMenu,
): Promise<void> => {
  await api.post('/menu', data);
};

export const updateMenuApi = async (
  formData: IUpdateMenu,
): Promise<void> => {
  await api.put(`/menu/${formData.id}`, formData);
};

export const deleteMenuItemApi = async (
  id: string,
): Promise<void> => {
  await api.delete(`/menu/${id}`);
};
