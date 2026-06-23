import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/api/**/*.ts', 'src/features/**/api/*.ts'],

      exclude: [
        'node_modules/**',
        'src/assets/**',
        '**/*.config.ts',
        '**/*.d.ts',
        'dist/',
        'src/__test__/e2e/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
