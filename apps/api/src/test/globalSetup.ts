import { initializeServices } from "@app/setup";
import { Knex } from "knex";
import Container from "typedi";
import { nop } from "rambda";
import { seedDatabase } from "@app/test/seed/seed";
import { clean as knexCleaner } from "knex-cleaner";
import knexConfig from "../database/knexfile.js";

export async function setup() {
  await initializeServices(knexConfig.test);
  const knex: Knex = Container.get("knex");
  await knexCleaner(knex, {
    mode: "delete",
    restartIdentity: true,
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
  await knex.migrate.latest(knex.client.config).catch(nop);
  await seedDatabase(knex).catch(nop);
}

export async function teardown() {
  await initializeServices(knexConfig.test);
  const knex: Knex = Container.get("knex");
  try {
    await knexCleaner(knex, {
      mode: "delete",
      restartIdentity: true,
      ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    });
  } finally {
    await knex.destroy();
  }
}
