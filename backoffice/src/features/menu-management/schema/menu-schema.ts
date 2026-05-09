import { z } from 'zod';

export const menuObjectSchema = z.object({
  id: z.string(),
  label: z.string(),
  path: z.string(),
  show: z.boolean(),
});

export const createMenuSchema = z.object({
  label: z.string().min(1, {
    error: 'Veuillez entre le texte du lien',
  }),
  path: z.string().min(1, {
    error: 'Veuillez entrer une url',
  }),
  show: z.boolean(),
});

export const updateMenuSchema = z.object({
  id: z.string(),
  label: z.string().min(1, {
    error: 'Veuillez entre le texte du lien',
  }),
  path: z.string().min(1, {
    error: 'Veuillez entrer une url',
  }),
  show: z.boolean(),
});

export const menuArraySchema = z.array(menuObjectSchema);

export type IUpdateMenu = z.infer<typeof updateMenuSchema>;
export type IMenuArray = z.infer<typeof menuArraySchema>;
export type ICreateMenu = z.infer<typeof createMenuSchema>;
export type IMenuObject = z.infer<typeof menuObjectSchema>;
