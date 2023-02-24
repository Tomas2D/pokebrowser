import { FastifyInstance } from "fastify";
import { YogaServerInstance } from "graphql-yoga";

export function registerGraphqlEndpoint(
  app: FastifyInstance,
  yoga: YogaServerInstance<any, any>
) {
  app.route({
    url: "/graphql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
        ctx: req.routeConfig,
      } as any);

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);
      reply.send(response.body);

      return reply;
    },
  });
}
