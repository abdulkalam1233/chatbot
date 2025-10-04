import { resolve } from "path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.e2e-spec.ts"],
    testTimeout: 60000,
    hookTimeout: 60000,
    setupFiles: ["./test/test-db.setup.ts"],
    env: {
      NODE_ENV: "test",
      DATABASE_URL: process.env.DATABASE_URL,
    },
    maxConcurrency: 1,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
