import { z } from 'zod';

export const pageObjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  content: z.string(),
  imageUrl: z.string().optional(),
  slug: z.string(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  menuItemId: z.string(),
});

export const createPageSchema = z.object({
  title: z.string().trim().min(1, {
    error: 'Veuillez entrer le titre de la page',
  }),
  description: z.string().optional(),
  content: z.string().trim().min(1, {
    error: 'Le contenue ne peut être vide',
  }),
  imageUrl: z.string().optional(),
  slug: z.string(),
  isPublished: z.boolean(),
  menuItemId: z.string().min(1, {
    error: 'Veuillez sélectionner le lien de la page',
  }),
});

export const updatePageSchema = z.object({
  title: z.string().trim().min(1, {
    error: 'Veuillez entrer le titre de la page',
  }),
  description: z.string().optional(),
  content: z.string().trim().min(1, {
    error: 'Le contenue ne peut être vide',
  }),
  imageUrl: z.string().optional(),
  slug: z.string(),
  isPublished: z.boolean(),
  id: z.string(),
  createdAt: z.string(),
  menuItemId: z.string().min(1, {
    error: 'Veuillez sélectionner le lien de la page',
  }),
});

export const pageArraySchema = z.array(pageObjectSchema);

export type IUpdatePage = z.infer<typeof updatePageSchema>;
export type ICreatePage = z.infer<typeof createPageSchema>;
export type IPageObject = z.infer<typeof pageObjectSchema>;
export type IPageArray = z.infer<typeof pageArraySchema>;
