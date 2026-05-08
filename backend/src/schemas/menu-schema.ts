import { Type, Static } from '@sinclair/typebox';

export const createMenuItemSchema = {
  body: Type.Object({
    label: Type.String(),
    path: Type.String(),
    order: Type.Number(),
    pageId: Type.Optional(Type.String()),
  }),
};

export const updateMenuItemSchema = {
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Partial(createMenuItemSchema.body),
};

export const menuItemIdParams = {
  params: Type.Object({
    id: Type.String(),
  }),
};

export type ICreateMenuItem = Static<typeof createMenuItemSchema.body>;
export type IUpdateMenuItem = Static<typeof updateMenuItemSchema.body>;
