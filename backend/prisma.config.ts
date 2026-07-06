import { defineConfig } from 'prisma/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DIRECT_URL!,
  },
  migrations: {
    seed: isProd
      ? 'echo "Pas de seed en prod"'
      : 'tsx ./prisma/e2e-seed.ts',
  },
});
