import { api } from "@/lib/api-client";

export const getMenuItemsApi = async () => {
  const response = await api.get("/menu");
  return response.data;
};

export const getPageBySlugApi = async (slug: string) => {
  const response = await api.get(`/page/${slug}`);
  return response.data;
};

export const getPagesApi = async () => {
  const response = await api.get("/page/published");
  return response.data;
};
