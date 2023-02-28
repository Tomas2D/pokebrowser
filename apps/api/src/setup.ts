import Container from "typedi";
import knex, { Knex } from "knex";
import { Model } from "objection";

export async function initializeServices(config: Knex.Config) {
  /* c8 ignore next 3 */
  if (initializeServices.isInitialized) {
    return;
  }
  initializeServices.isInitialized = true;

  const knexInstance = knex(config);
  Model.knex(knexInstance);
  Container.set("knex", knexInstance);
}

export async function destroyServices() {
  /* c8 ignore next 3 */
  if (!initializeServices.isInitialized) {
    return;
  }

  const knex = Container.get<Knex>("knex");
  await knex.destroy();
}

initializeServices.isInitialized = false;
