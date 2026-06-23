import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { PrismaClient, Role } from '@prisma/client';

import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUserById,
  getUserList,
  getUserWithEmailToken,
  getUserWithPasswordToken,
} from '../../services/user';

import { setupDatabase, teardownDatabase } from '../global-setup';

let prisma: PrismaClient;

describe('UserService Integration', () => {
  beforeAll(async () => {
    prisma = await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  async function createTestUser() {
    return createUser(prisma, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashed-password',
      role: Role.USER,
      emailConfirmationToken: 'email-token',
      emailConfirmationExpire: null,
    });
  }

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = await createUser(prisma, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed-password',
        role: Role.USER,
        emailConfirmationToken: null,
        emailConfirmationExpire: null,
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe('test@example.com');
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const user = await createTestUser();

      const result = await getUserById(prisma, user.id);

      expect(result?.id).toBe(user.id);
    });

    it('should return null when user does not exist', async () => {
      const result = await getUserById(prisma, 'unknown-id');

      expect(result).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const user = await createTestUser();

      const result = await getUserByEmail(prisma, user.email);

      expect(result?.id).toBe(user.id);
    });
  });

  describe('getUserWithEmailToken', () => {
    it('should return user by email token', async () => {
      await createTestUser();

      const result = await getUserWithEmailToken(
        prisma,
        'email-token',
      );

      expect(result).not.toBeNull();

      expect(result?.emailConfirmationToken).toBe('email-token');
    });
  });

  describe('getUserWithPasswordToken', () => {
    it('should return user by password token', async () => {
      const user = await createTestUser();

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: 'password-token',
        },
      });

      const result = await getUserWithPasswordToken(
        prisma,
        'password-token',
      );

      expect(result).not.toBeNull();

      expect(result?.resetPasswordToken).toBe('password-token');
    });
  });

  describe('updateUser', () => {
    it('should update username', async () => {
      const user = await createTestUser();

      await updateUser(prisma, user.id, {
        username: 'updated-user',
      });

      const updated = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      expect(updated?.username).toBe('updated-user');
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user', async () => {
      const user = await createTestUser();

      await deleteUserById(prisma, user.id);

      const deleted = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      expect(deleted).toBeNull();
    });
  });

  describe('getUserList', () => {
    it('should return all users', async () => {
      await createUser(prisma, {
        username: 'user1',
        email: 'user1@test.com',
        password: 'password',
        role: Role.USER,
        emailConfirmationToken: null,
        emailConfirmationExpire: null,
      });

      await createUser(prisma, {
        username: 'user2',
        email: 'user2@test.com',
        password: 'password',
        role: Role.USER,
        emailConfirmationToken: null,
        emailConfirmationExpire: null,
      });

      const users = await getUserList(prisma);

      expect(users).toHaveLength(2);
    });
  });
});
