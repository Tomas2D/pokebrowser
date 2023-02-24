import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    reporters: ["verbose"],
    setupFiles: ["./src/test/setup"],
    globalSetup: ["./src/test/globalSetup"],
    testTimeout: 15_000,
    allowOnly: true,
    threads: false,
    cache: false,
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/test/utils/**",
        "**/test/setup.ts",
      ],
      provider: "c8",
    },
  },
});
