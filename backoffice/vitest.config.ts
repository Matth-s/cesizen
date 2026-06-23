import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',

    exclude: ['node_modules/**', 'dist/**', 'src/__test__/e2e/**'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],

      exclude: [
        'node_modules/**',
        'src/assets/**',
        '**/*.config.ts',
        '**/*.d.ts',
        'dist/',
        'src/__test__/e2e/**',
        '**/components/**',
        '**/pages/**',
        '**/constants/**',
        '**/lib/**',
        '**/store/**',
        'src/App.tsx',
        'src/main.tsx',
        '**/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
