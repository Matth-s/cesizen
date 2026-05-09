import { api } from "@/lib/api-client";
import {
  dynamicPageArraySchema,
  dynamicPageObjectSchema,
  type IDynamicPageArray,
  type IDynamicPageObject,
} from "../schema/dynamic-page-schema";

export const getDynamicPageApi = async (
  id?: string,
): Promise<IDynamicPageArray> => {
  const { data } = await api.get(`/page/published/${id}`);

  const validatedData = dynamicPageArraySchema.parse(data);

  return validatedData;
};

export const getDynamicPageByIdApi = async (
  id?: string,
): Promise<IDynamicPageObject> => {
  const { data } = await api.get(`/page/by-id/${id}`);

  const validatedData = dynamicPageObjectSchema.parse(data);

  return validatedData;
};
