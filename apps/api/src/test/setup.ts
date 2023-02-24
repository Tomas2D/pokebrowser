import { beforeAll, vi } from "vitest";
import { initializeServices } from "@app/setup";
import knexConfig from "../database/knexfile.js";

vi.useRealTimers();

beforeAll(async () => {
  await initializeServices(knexConfig.test);
});
