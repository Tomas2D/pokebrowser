import { idArg, inputObjectType, intArg, nullable, stringArg } from "nexus";

import { PokemonSchema, PokemonTypeSchema } from "@app/graphql/schema/Pokemon";
import * as pokemonService from "@app/services/PokemonService";
import { ListPokemonOptions } from "@app/services/PokemonService";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";
import { extractRelationsFactory } from "@app/graphql/helpers/relationsExtractor";
import { PokemonRelations } from "@app/database/models/PokemonModel";

const extractPokemonRelations = extractRelationsFactory(PokemonRelations);

export const pokemonQueryResolver = (t: ObjectDefinitionBlock<"Query">) => {
  t.field("getPokemon", {
    type: nullable(PokemonSchema),
    args: {
      id: intArg(),
    },
    resolve: (query, { id }, _, { fieldNodes }) =>
      pokemonService.getPokemon(id, extractPokemonRelations(fieldNodes)),
  });

  t.field("getPokemonBySlug", {
    type: nullable(PokemonSchema),
    args: {
      slug: stringArg(),
    },
    resolve: (query, { slug }, _, { fieldNodes }) =>
      pokemonService.getPokemonBySlug(
        slug!,
        extractPokemonRelations(fieldNodes)
      ),
  });

  t.connectionField("listPokemon", {
    type: PokemonSchema,
    strictArgs: true,
    cursorFromNode: (node) => String(node.id),
    additionalArgs: {
      filters: inputObjectType({
        name: "ListPokemonFilters",
        definition(t) {
          t.nullable.list.int("typeId");
          t.nullable.string("name");
          t.nullable.boolean("favorite");
        },
      }),
    },
    resolve: async (
      parent,
      { filters, ...cursor },
      { ctx },
      { fieldNodes }
    ) => {
      const favoriteByUserId = filters?.favorite ? ctx.user?.id : null;

      return pokemonService.listPokemon({
        relations: extractPokemonRelations(fieldNodes, "edges.node."),
        cursor,
        filters: {
          ...filters,
          favoriteByUserId,
        } as ListPokemonOptions["filters"],
      });
    },
  });

  t.list.field("listPokemonTypes", {
    type: PokemonTypeSchema,
    resolve: pokemonService.listPokemonTypes,
  });
};

export const pokemonMutationResolver = (
  t: ObjectDefinitionBlock<"Mutation">
) => {
  t.field("votePokemon", {
    type: nullable(PokemonSchema),
    args: {
      id: intArg(),
    },
    resolve: (parent, { id }, { ctx }, { fieldNodes }) =>
      pokemonService.voteForPokemon(
        {
          pokemonId: id,
          userId: ctx.user!.id,
        },
        extractPokemonRelations(fieldNodes)
      ),
  });

  t.field("unVotePokemon", {
    type: nullable(PokemonSchema),
    args: {
      id: intArg(),
    },
    resolve: (parent, { id }, { ctx }, { fieldNodes }) =>
      pokemonService.unVoteForPokemon(
        {
          pokemonId: id,
          userId: ctx.user!.id,
        },
        extractPokemonRelations(fieldNodes)
      ),
  });
};
