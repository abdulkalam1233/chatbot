import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
    exclude: ["test/**/*"],
    coverage: {
      provider: "v8",
      include: ["src/**/*"],
      exclude: ["src/**/*.spec.ts", "src/**/*.test.ts", "src/main.ts"],
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
