import { retrieveSound } from "@app/services/SoundService";
import { FastifyInstance } from "fastify";

export function initRouter(app: FastifyInstance) {
  app.route({
    url: "/",
    method: ["GET", "POST", "HEAD", "OPTIONS"],
    handler: async (req, reply) => {
      reply.send({
        message: "Hello!",
      });
    },
  });

  app.route({
    url: "/sound/:id",
    method: ["GET", "OPTIONS"],
    handler: async (req, reply) => {
      const id = parseInt((req.params as Record<string, string>).id, 10);

      try {
        const stream = await retrieveSound(id);
        reply.type("audio/mpeg");
        reply.send(stream);
      } catch (err) {
        reply.status(404).send();
      }
      return reply;
    },
  });
}
