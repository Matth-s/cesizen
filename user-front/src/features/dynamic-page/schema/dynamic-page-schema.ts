import { z } from "zod";

export const dynamicPageObjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  slug: z.string(),
  isPublished: z.boolean(),
  createdAt: z.string(),
});

export const dynamicPageArraySchema = z.array(dynamicPageObjectSchema);

export type IDynamicPageObject = z.infer<typeof dynamicPageObjectSchema>;
export type IDynamicPageArray = z.infer<typeof dynamicPageArraySchema>;
