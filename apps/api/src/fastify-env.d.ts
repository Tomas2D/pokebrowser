export {};

declare module "fastify" {
  import { UserModel } from "@app/database/models/UserModel";

  interface ContextConfigDefault {
    user: UserModel;
  }

  export interface FastifyContextConfig {
    user: UserModel;
  }

  interface RequestContextData {
    user: UserModel;
  }

  interface FastifyInstance {
    config: {
      PORT: string;
      CORS_ORIGIN: string;
    };
  }
}
