import { createYoga } from "graphql-yoga";
import { authMiddleware } from "@app/middleware/authMiddleware";
import { fastify, FastifyReply, FastifyRequest } from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { registerGraphqlEndpoint } from "@app/graphql/router";
import { initRouter } from "@app/router";
import { makeSchema } from "./graphql/makeSchema";
import fastifyEnv from "@fastify/env";
import { destroyServices } from "@app/setup";

export async function main() {
  const schema = makeSchema();

  const app = await fastify({
    disableRequestLogging: true,
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  });

  await app.register(fastifyEnv, {
    schema: {
      type: "object",
      required: ["PORT", "CORS_ORIGIN"],
      properties: {
        PORT: {
          type: "string",
        },
        CORS_ORIGIN: {
          type: "string",
        },
      },
    },
  } as any);

  await app.register(cors, {
    origin: [app.config.CORS_ORIGIN],
    credentials: true,
  });

  await app.register(cookie);
  await app.addHook("onRequest", authMiddleware);

  app.addHook("onClose", async () => {
    app.log.info("Terminating server");
    await destroyServices();
  });

  const yoga = createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    schema,
    logging: {
      debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
      info: (...args) => args.forEach((arg) => app.log.info(arg)),
      warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
      error: (...args) => args.forEach((arg) => app.log.error(arg)),
    },
  });

  initRouter(app);
  registerGraphqlEndpoint(app, yoga);

  await app.listen({
    port: parseInt(app.config.PORT),
  });

  return {
    app,
    graphql: yoga,
  };
}