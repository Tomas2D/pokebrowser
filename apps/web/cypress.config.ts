import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    scrollBehavior: "center",
    video: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
