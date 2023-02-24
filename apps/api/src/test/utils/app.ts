import { Knex } from "knex";
import { main } from "@app/server";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import Container from "typedi";
import { USER_ID_COOKIE_NAME } from "@app/middleware/authMiddleware";

export async function initTestApp() {
  const knex: Knex = Container.get("knex");
  const { graphql, app } = await main();

  const executor = buildHTTPExecutor({
    endpoint: `http://localhost:${process.env.PORT}/graphql`,
    headers: (context) => {
      return {
        Cookie: `${USER_ID_COOKIE_NAME}=1`,
        ...context?.context?.headers,
      };
    },
  });

  return {
    app,
    knex,
    graphql,
    executor,
  };
}

export async function destroyTestApp({ app, knex }: Partial<TestApp> = {}) {
  if (app) {
    await app.close();
  }
  if (knex) {
    await knex.destroy();
  }
}

export type TestApp = Awaited<ReturnType<typeof initTestApp>>;
