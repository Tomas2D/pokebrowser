import "reflect-metadata";
import "tsconfig-paths/register";
import { initializeServices } from "@app/setup";
import knexConfig from "./database/knexfile.js";

initializeServices(knexConfig.development).then(async () => {
  const { main } = await import("./server");
  await main();
});
