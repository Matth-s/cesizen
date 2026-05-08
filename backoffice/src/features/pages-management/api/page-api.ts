import { api } from '@/lib/api-client';
import {
  pageArraySchema,
  type ICreatePage,
  type IPageArray,
} from '../schemas/pages-schema';

export const getPageListApi = async (): Promise<IPageArray> => {
  const { data } = await api.get('/page');

  const validatedData = pageArraySchema.parse(data);

  return validatedData;
};

export const createPageApi = async (
  data: ICreatePage,
): Promise<void> => {
  await api.post('/page', data);
};

export const getPageBySlugApi = async (slug: string) => {
  const response = await api.get(`/page/${slug}`);
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
