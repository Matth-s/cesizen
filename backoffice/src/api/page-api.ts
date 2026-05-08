import { api } from '@/lib/api-client';

export const getPagesApi = async () => {
  const response = await api.get('/page');
  return response.data;
};

export const getPageBySlugApi = async (slug: string) => {
  const response = await api.get(`/page/${slug}`);
  return response.data;
};

export const createPageApi = async (data: any) => {
  const response = await api.post('/page', data);
  return response.data;
};

export const updatePageApi = async ({ id, ...data }: any) => {
  const response = await api.put(`/page/${id}`, data);
  return response.data;
};

export const deletePageApi = async (id: string) => {
  const response = await api.delete(`/page/${id}`);
  return response.data;
};
