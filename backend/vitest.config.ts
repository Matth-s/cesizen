import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 60000,
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'src/generated/**',
        'src/types/**',
        'dist',
        '**/*.config.ts',
        '**/*.d.ts',
        'src/test-setup.ts',
        'src/libs',
        'src/plugins',
        'src/routes',
        '**/schemas/**',
      ],
    },
  },
});
