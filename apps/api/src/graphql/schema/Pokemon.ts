import { enumType, objectType } from "nexus";
import { PokemonModel } from "@app/database/models/PokemonModel";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";
import { typedResolver } from "@app/graphql/utilities";

export const EvolutionRequirementSchema = objectType({
  name: "EvolutionRequirement",
  definition(t) {
    t.nullable.string("name");
    t.nullable.int("amount");
  },
});

export const WeightSchema = objectType({
  name: "Weight",
  definition(t) {
    t.float("maximum");
    t.float("minimum");
  },
});

export const HeightSchema = objectType({
  name: "Height",
  definition(t) {
    t.int("maximum");
    t.int("minimum");
  },
});

export const PokemonTypeSchema = objectType({
  name: "PokemonType",
  definition(t) {
    t.int("id");
    t.string("name");
  },
});

export const PokemonAttackSchema = objectType({
  name: "Attack",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("damage");
    t.field("type", {
      type: PokemonTypeSchema,
    });
    t.nonNull.field("category", {
      type: enumType({
        name: "attackCategory",
        members: ["fast", "special"] as const,
      }),
    });
  },
});

export const PokemonSchema = objectType({
  name: "Pokemon",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("slug");
    t.nullable.string("commonCaptureArea");
    t.nullable.field("evolutionRequirement", {
      type: EvolutionRequirementSchema,
      resolve: typedResolver((root: PokemonModel) => ({
        name: root.evolutionRequirementName!,
        amount: root.evolutionRequirementAmount!,
      })),
    });
    t.field("weight", {
      type: WeightSchema,
      resolve: typedResolver(async (parent: PokemonModel) => ({
        maximum: parent.weightMaximum,
        minimum: parent.weightMinimum,
      })),
    });
    t.field("height", {
      type: HeightSchema,
      resolve: typedResolver(async (parent: PokemonModel) => ({
        maximum: parent.heightMaximum,
        minimum: parent.heightMinimum,
      })),
    });
    t.nullable.float("fleeRate");
    t.int("maxCp");
    t.int("maxHp");
    t.list.field("resistants", {
      type: PokemonTypeSchema,
      resolve: typedResolver(async (parent: PokemonModel) => {
        return parent.$relatedQuery("resistants");
      }),
    });
    t.list.field("types", {
      type: PokemonTypeSchema,
    });
    t.list.field("weaknesses", {
      type: PokemonTypeSchema,
    });
    t.list.field("attacks", {
      type: PokemonAttackSchema,
    });
    t.nullable.field("nextEvolution", {
      type: PokemonSchema,
    });
    t.nullable.field("previousEvolution", {
      type: PokemonSchema,
    });
    t.nullable.int("votesCount", {
      resolve: typedResolver(async (parent: PokemonModel) => {
        const result = await PokemonVoteModel.query()
          .count("*", {
            as: "count",
          })
          .where("pokemonId", parent.id)
          .first();

        // @ts-expect-error cannot infer "count" property
        return result.count!;
      }),
    });
    t.string("classification", {
      resolve: typedResolver(async (parent: PokemonModel) => {
        const response = await parent.$relatedQuery("classification");
        return response.name;
      }),
    });
  },
});
