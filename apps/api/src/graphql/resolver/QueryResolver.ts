import { queryType } from "nexus";
import { pokemonQueryResolver } from "@app/graphql/resolver/PokemonQueryResolver";
import { userResolver } from "@app/graphql/resolver/UserResolver";

const resolvers = [pokemonQueryResolver, userResolver] as const;

export const QueryResolver = queryType({
  definition(t) {
    resolvers.forEach((resolver) => resolver(t));
  },
});
