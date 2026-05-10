import { describe, it, expect, vi } from 'vitest';
import { prismaMock } from '../../__mocks__/prisma';
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUserById,
  getUserList,
  getUserWithEmailToken,
  getUserWithPasswordToken,
} from '../user';
import { Role } from '../../generated/prisma/enums';

describe('UserService', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    password: 'hashed-password',
    role: Role.USER,
    username: 'testuser',
    createAt: new Date(),
    isActive: true,
    emailVerified: null,
    emailConfirmationToken: 'email-token',
    emailConfirmationExpire: null,
    resetPasswordToken: 'password-token',
    resetPasswordExpire: null,
  };

  describe('createUser', () => {
    it('should create a new user', async () => {
      prismaMock.user.create.mockResolvedValue(mockUser);

      const result = await createUser(prismaMock, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        role: Role.USER,
        emailConfirmationExpire: null,
        emailConfirmationToken: null,
      });

      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserById(prismaMock, 'user-1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error when prisma fails', async () => {
      prismaMock.user.findUnique.mockRejectedValue(
        new Error('Prisma error'),
      );

      await expect(getUserById(prismaMock, 'user-1')).rejects.toThrow(
        'Une erreur est survenue',
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserByEmail(
        prismaMock,
        'test@example.com',
      );

      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserWithEmailToken', () => {
    it('should return a user by email token', async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUser);

      const result = await getUserWithEmailToken(
        prismaMock,
        'email-token',
      );

      expect(result).toEqual(mockUser);
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { emailConfirmationToken: 'email-token' },
      });
    });

    it('should throw an error on failure', async () => {
      prismaMock.user.findFirst.mockRejectedValue(new Error());
      await expect(
        getUserWithEmailToken(prismaMock, 'token'),
      ).rejects.toThrow('Une erreur est survenue');
    });
  });

  describe('getUserWithPasswordToken', () => {
    it('should return a user by password token', async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUser);

      const result = await getUserWithPasswordToken(
        prismaMock,
        'password-token',
      );

      expect(result).toEqual(mockUser);
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { resetPasswordToken: 'password-token' },
      });
    });

    it('should throw an error on failure', async () => {
      prismaMock.user.findFirst.mockRejectedValue(new Error());
      await expect(
        getUserWithPasswordToken(prismaMock, 'token'),
      ).rejects.toThrow('Une erreur est survenue');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      prismaMock.user.update.mockResolvedValue(mockUser);

      await updateUser(prismaMock, 'user-1', { username: 'updated' });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { username: 'updated' },
      });
    });

    it('should throw an error when update fails', async () => {
      prismaMock.user.update.mockRejectedValue(
        new Error('Prisma error'),
      );

      await expect(
        updateUser(prismaMock, 'user-1', {}),
      ).rejects.toThrow(
        "Une erreur est survenue lors de la mise a jour de l'utilisateur",
      );
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user', async () => {
      prismaMock.user.delete.mockResolvedValue(mockUser);

      await deleteUserById(prismaMock, 'user-1');

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
    });

    it('should throw an error when delete fails', async () => {
      prismaMock.user.delete.mockRejectedValue(
        new Error('Prisma error'),
      );

      await expect(
        deleteUserById(prismaMock, 'user-1'),
      ).rejects.toThrow('Une erreur est survenue');
    });
  });

  describe('getUserList', () => {
    it('should return a list of users', async () => {
      const users = [mockUser];
      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await getUserList(prismaMock);

      expect(result).toEqual(users);
    });

    it('should throw an error when findMany fails', async () => {
      prismaMock.user.findMany.mockRejectedValue(
        new Error('Prisma error'),
      );

      await expect(getUserList(prismaMock)).rejects.toThrow(
        'Une erreur est survenue',
      );
    });
  });
});
