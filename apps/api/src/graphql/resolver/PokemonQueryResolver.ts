import {
  inputObjectType,
  intArg,
  nullable,
  objectType,
  stringArg,
} from "nexus";

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
      pokemonService.getPokemon(id!, extractPokemonRelations(fieldNodes)),
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

  t.field("listPokemon", {
    type: objectType({
      name: "ListPokemon",
      definition(t) {
        t.list.field("edges", {
          type: PokemonSchema,
        });
        t.field("meta", {
          type: objectType({
            name: "ListPokemonMeta",
            definition(t) {
              t.int("total");
              t.boolean("hasMore");
            },
          }),
        });
      },
    }),
    args: {
      filters: inputObjectType({
        name: "ListPokemonFilters",
        definition(t) {
          t.nullable.list.int("typeId");
          t.nullable.string("name");
          t.nullable.int("offset");
          t.nullable.int("size");
          t.nullable.boolean("favorite");
        },
      }),
    },
    resolve: async (parent, { filters }, { ctx }, { fieldNodes }) => {
      const favoriteByUserId = filters?.favorite ? ctx.user?.id : null;

      return pokemonService.listPokemon({
        filters: {
          ...filters,
          favoriteByUserId,
        } as ListPokemonOptions["filters"],
        relations: extractPokemonRelations(fieldNodes, "edges."),
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
    resolve: (parent, { id }, { ctx }) =>
      pokemonService.voteForPokemon({
        pokemonId: id!,
        userId: ctx.user!.id,
      }),
  });

  t.field("unVotePokemon", {
    type: nullable(PokemonSchema),
    args: {
      id: intArg(),
    },
    resolve: (parent, { id }, { ctx }) =>
      pokemonService.unVoteForPokemon({
        pokemonId: id!,
        userId: ctx.user!.id,
      }),
  });
};
