import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    scrollBehavior: "center",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
