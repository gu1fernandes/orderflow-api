
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "src/domain/**/*.ts",
        "src/application/**/*.ts",
        "src/infrastructure/**/*.ts"
      ],
      exclude: [
        "src/server.ts"
      ],
      thresholds: {
        lines: 80,
        functions: 80
      }
    }
  }
});
