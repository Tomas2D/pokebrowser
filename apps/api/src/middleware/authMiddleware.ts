import { FastifyReply, FastifyRequest } from "fastify";
import { UserModel } from "@app/database/models/UserModel";
import { createUser, getUser } from "@app/services/UserService";

export const USER_ID_COOKIE_NAME = `userId` as const;

export async function authMiddleware(
  request: FastifyRequest,
  response: FastifyReply
) {
  let user: UserModel | null = null;

  if (request.cookies[USER_ID_COOKIE_NAME]) {
    user = await getUser(request.cookies[USER_ID_COOKIE_NAME]);
  }

  if (!user) {
    user = await createUser();
  }

  request.routeConfig.user = user;
  response.setCookie(USER_ID_COOKIE_NAME, user.id, {
    // "never expires" date
    expires: new Date(2147483647 * 1000),
    path: "/",
  });
}
