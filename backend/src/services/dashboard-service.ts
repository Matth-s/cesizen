import { PrismaClient } from '@prisma/client';

interface IStat {
  totalPages: number;
  totalPublishedPages: number;
  totalMenus: number;
  totalUsers: number;
  totalQuiz: number;
}

export const getStatsService = async (
  prisma: PrismaClient,
): Promise<IStat> => {
  const [
    totalPages,
    totalPublishedPages,
    totalMenus,
    totalUsers,
    totalQuiz,
  ] = await Promise.all([
    prisma.page.count(),

    prisma.page.count({
      where: {
        isPublished: true,
      },
    }),

    prisma.menuItem.count(),

    prisma.user.count(),

    prisma.quiz.count(),
  ]);

  return {
    totalPages,
    totalPublishedPages,
    totalMenus,
    totalUsers,
    totalQuiz,
  };
};
