import { api } from "@/lib/api-client";
import { menuArraySchema, type IMenuArray } from "../schema/menu-schema";

export const getMenuItemsApi = async (): Promise<IMenuArray> => {
  const { data } = await api.get("/menu");
  const validatedData = menuArraySchema.parse(data);

  return validatedData;
};

export const getPageBySlugApi = async (slug: string) => {
  const response = await api.get(`/page/${slug}`);
  return response.data;
};

export const getPagesApi = async () => {
  const response = await api.get("/page/published");
  return response.data;
};
