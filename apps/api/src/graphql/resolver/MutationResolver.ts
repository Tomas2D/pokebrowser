import { mutationType } from "nexus";
import { pokemonMutationResolver } from "@app/graphql/resolver/PokemonQueryResolver";

const resolvers = [pokemonMutationResolver] as const;

export const MutationResolver = mutationType({
  definition(t) {
    resolvers.forEach((resolver) => resolver(t));
  },
});
