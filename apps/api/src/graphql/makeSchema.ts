import { QueryResolver } from "@app/graphql/resolver/QueryResolver";
import { MutationResolver } from "@app/graphql/resolver/MutationResolver";
import { connectionPlugin, makeSchema as graphqlMakeSchema } from "nexus";
import * as schemaTypes from "./schema/types";

export function makeSchema() {
  return graphqlMakeSchema({
    plugins: [connectionPlugin()],
    types: [Object.values(schemaTypes), QueryResolver, MutationResolver],
    nonNullDefaults: {
      input: true,
      output: true,
    },
    outputs: {
      schema: __dirname + "/generated/schema.graphql",
      typegen: __dirname + "/generated/typings.ts",
    },
  });
}
