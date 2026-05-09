import { api } from '@/lib/api-client';
import {
  pageArraySchema,
  pageObjectSchema,
  type ICreatePage,
  type IPageArray,
  type IPageObject,
  type IUpdatePage,
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

export const getPagePageById = async (
  id?: string,
): Promise<IPageObject> => {
  const { data } = await api.get(`/page/by-id/${id}`);

  const validatedData = pageObjectSchema.parse(data);

  return validatedData;
};

export const updatePageApi = async (formData: IUpdatePage) => {
  await await api.put(`/page/${formData.id}`, formData);
};

export const getPageBySlugApi = async (slug: string) => {
  const response = await api.get(`/page/${slug}`);
  return response.data;
};

export const deletePageApi = async (id: string) => {
  const response = await api.delete(`/page/${id}`);
  return response.data;
};
