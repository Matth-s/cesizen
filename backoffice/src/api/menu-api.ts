import { api } from '@/lib/api-client';

export const getMenuItemsApi = async () => {
  const response = await api.get('/menu');
  return response.data;
};

export const createMenuItemApi = async (data: any) => {
  const response = await api.post('/menu', data);
  return response.data;
};

export const updateMenuItemApi = async ({ id, ...data }: any) => {
  const response = await api.put(`/menu/${id}`, data);
  return response.data;
};

export const deleteMenuItemApi = async (id: string) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};
