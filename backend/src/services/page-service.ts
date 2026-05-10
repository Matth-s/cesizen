import { Page, PrismaClient } from '../generated/prisma/client';
import { PageUpdateInput } from '../generated/prisma/models';

export const getAllPageService = async (
  prisma: PrismaClient,
): Promise<Page[]> => {
  return await prisma.page.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getPageByIdService = async (
  prisma: PrismaClient,
  id: string,
  shouldBePublish: boolean,
): Promise<Page | null> => {
  return await prisma.page.findFirst({
    where: {
      id,

      ...(shouldBePublish && {
        isPublished: true,
      }),
    },
  });
};
export const getPageBySlugService = async (
  prisma: PrismaClient,
  slug: string,
): Promise<Page | null> => {
  return await prisma.page.findUnique({
    where: {
      slug,
    },
  });
};

export const savePageService = async (
  prisma: PrismaClient,
  page: Omit<Page, 'id' | 'createdAt'>,
): Promise<Page> => {
  return await prisma.page.create({
    data: page,
  });
};

export const updatePageByIdService = async ({
  prisma,
  id,
  data,
}: {
  prisma: PrismaClient;
  id: string;
  data: PageUpdateInput;
}): Promise<Page> => {
  return await prisma.page.update({
    where: {
      id,
    },
    data,
  });
};

export const getAllPageWithMenuIdService = async (
  prisma: PrismaClient,
  id: string,
): Promise<Page[]> => {
  return await prisma.page.findMany({
    where: {
      menuItemId: id,
      isPublished: true,
    },
  });
};
