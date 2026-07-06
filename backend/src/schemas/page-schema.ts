import { Type, Static } from '@sinclair/typebox';

export const createPageSchema = {
  body: Type.Object({
    title: Type.String({ minLength: 3, maxLength: 150 }),
    description: Type.Optional(Type.String({ maxLength: 255 })),
    content: Type.String({
      minLength: 1,
      pattern: '^((?!--).)*$',
    }),
    imageUrl: Type.Optional(Type.String({ format: 'uri' })),
    slug: Type.String({
      minLength: 3,
      pattern: '^[a-z0-9-]+$',
    }),
    isPublished: Type.Boolean(),
    menuItemId: Type.String(),
  }),
};

export const updatePageSchema = {
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Partial(createPageSchema.body),
};

export const pageIdParams = {
  params: Type.Object({
    id: Type.String(),
  }),
};

export const pageSlugParams = {
  params: Type.Object({
    slug: Type.String(),
  }),
};

export type ICreatePage = Static<typeof createPageSchema.body>;
export type IUpdatePage = Static<typeof updatePageSchema.body>;
