import { api } from "@/lib/api-client";
import { menuArraySchema, type IMenuArray } from "../schema/menu-schema";

export const getMenuItemsApi = async (): Promise<IMenuArray> => {
  const { data } = await api.get("/menu");
  const validatedData = menuArraySchema.parse(data);

  return validatedData;
};
