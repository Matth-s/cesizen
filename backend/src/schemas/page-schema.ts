import { Type, Static } from '@sinclair/typebox';

export const createPageSchema = {
  body: Type.Object({
    title: Type.String(),
    content: Type.String(),
    imageUrl: Type.Optional(Type.String()),
    slug: Type.String(),
    isPublished: Type.Optional(Type.Boolean()),
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
