import { setup, teardown } from "./globalSetup";
import { initializeServices } from "@app/setup";
import knexConfig from "@app/database/knexfile";

(async () => {
  await setup();
  try {
    await initializeServices(knexConfig.test);
    const { main } = await import("../server");
    await main(teardown);
  } catch {
    await teardown();
  }
})();
