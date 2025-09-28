import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    exclude: ['test/**/*'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/main.ts'],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    }
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});