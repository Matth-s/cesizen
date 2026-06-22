import { PrismaClient } from '../generated/prisma/client';
import { beforeEach, vi } from 'vitest';
import {
  mockDeep,
  mockReset,
  DeepMockProxy,
} from 'vitest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

vi.mock('../libs/prisma', () => ({
  prisma: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});
