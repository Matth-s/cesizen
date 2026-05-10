import { Type, Static } from '@sinclair/typebox';

export const createMenuItemSchema = {
  body: Type.Object({
    label: Type.String(),
    path: Type.String(),
    show: Type.Boolean(),
  }),
};

export const updateMenuItemSchema = {
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    id: Type.String(),
    label: Type.String(),
    path: Type.String(),
    show: Type.Boolean(),
  }),
};

export const menuItemIdParams = {
  params: Type.Object({
    id: Type.String(),
  }),
};

export type ICreateMenuItem = Static<
  typeof createMenuItemSchema.body
>;
export type IUpdateMenuItem = Static<
  typeof updateMenuItemSchema.body
>;
