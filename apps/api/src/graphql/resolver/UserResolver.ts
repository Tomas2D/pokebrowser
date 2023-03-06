import { nullable, stringArg } from "nexus";
import * as userService from "@app/services/UserService";
import { UserSchema } from "@app/graphql/schema/User";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";

export const userResolver = (t: ObjectDefinitionBlock<"Query">) => {
  t.field("getUser", {
    type: nullable(UserSchema),
    args: {
      id: stringArg(),
    },
    resolve: async (parent, { id }) => userService.getUser(id),
  });

  t.field("getSelf", {
    type: nullable(UserSchema),
    resolve: async (parent, _, { req }) => {
      return userService.getUser(req.routeConfig.user.id);
    },
  });
};
