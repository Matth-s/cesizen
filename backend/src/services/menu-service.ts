import { MenuItem, Prisma, PrismaClient } from '@prisma/client';

export const createMenuService = async (
  prisma: PrismaClient,
  data: Omit<MenuItem, 'id'>,
): Promise<MenuItem> => {
  return await prisma.menuItem.create({
    data,
  });
};

export const existingMenuPathService = async (
  prisma: PrismaClient,
  path: string,
): Promise<MenuItem | null> => {
  return await prisma.menuItem.findFirst({
    where: {
      path,
    },
  });
};

export const getMenuItemService = async (
  prisma: PrismaClient,
  withHidden: boolean,
): Promise<MenuItem[]> => {
  return await prisma.menuItem.findMany({
    where: withHidden
      ? {}
      : {
          show: true,
        },
  });
};

export const updateMenuItemService = async (
  prisma: PrismaClient,
  data: MenuItem,
): Promise<MenuItem> => {
  return await prisma.menuItem.update({
    where: {
      id: data.id,
    },
    data,
  });
};

export const deleteMenuItemService = async (
  prisma: PrismaClient,
  id: string,
): Promise<void> => {
  await prisma.menuItem.delete({
    where: {
      id,
    },
  });
};
