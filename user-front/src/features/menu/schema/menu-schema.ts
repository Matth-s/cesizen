import { z } from "zod";

export const menuObjectSchema = z.object({
  id: z.string(),
  label: z.string(),
  path: z.string(),
  show: z.boolean(),
});

export const menuArraySchema = z.array(menuObjectSchema);

export type IMenuArray = z.infer<typeof menuArraySchema>;
