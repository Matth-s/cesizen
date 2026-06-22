import { Prisma, PrismaClient, User } from '@prisma/client';

export const createUser = async (
  prisma: PrismaClient,
  userData: Pick<
    User,
    | 'username'
    | 'email'
    | 'password'
    | 'role'
    | 'emailConfirmationExpire'
    | 'emailConfirmationToken'
  >,
): Promise<User> => {
  return await prisma.user.create({
    data: userData,
  });
};

export const getUserById = async (
  prisma: PrismaClient,
  userId: string,
): Promise<User | null> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return existingUser;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getUserByEmail = async (
  prisma: PrismaClient,
  email: string,
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserWithEmailToken = async (
  prisma: PrismaClient,
  token: string,
): Promise<User | null> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        emailConfirmationToken: token,
      },
    });

    return existingUser;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getUserWithPasswordToken = async (
  prisma: PrismaClient,
  token: string,
): Promise<User | null> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
      },
    });

    return existingUser;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const updateUser = async (
  prisma: PrismaClient,
  userId: string,
  user: Prisma.UserUpdateInput,
): Promise<void> => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  } catch {
    throw new Error(
      "Une erreur est survenue lors de la mise a jour de l'utilisateur",
    );
  }
};

export const deleteUserById = async (
  prisma: PrismaClient,
  userId: string,
): Promise<void> => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getUserList = async (
  prisma: PrismaClient,
): Promise<
  Pick<
    User,
    | 'username'
    | 'id'
    | 'email'
    | 'isActive'
    | 'emailVerified'
    | 'createAt'
    | 'role'
  >[]
> => {
  try {
    return await prisma.user.findMany({
      select: {
        username: true,
        id: true,
        email: true,
        isActive: true,
        emailVerified: true,
        createAt: true,
        role: true,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
