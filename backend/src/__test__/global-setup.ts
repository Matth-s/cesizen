import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'node:child_process';

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

export async function setupDatabase() {
  container = await new PostgreSqlContainer('postgres:17-alpine')
    .withDatabase('testdb')
    .withUsername('postgres')
    .withPassword('postgres')
    .start();

  const databaseUrl = container.getConnectionUri();

  process.env.DATABASE_URL = databaseUrl;

  execSync('npx prisma db push', {
    env: process.env,
    stdio: 'inherit',
  });

  prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: databaseUrl,
    }),
  });

  return prisma;
}

export async function teardownDatabase() {
  await prisma?.$disconnect();
  await container?.stop();
}

export function getPrisma() {
  return prisma;
}
