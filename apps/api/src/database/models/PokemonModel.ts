import { Model } from "objection";
import { PokemonAttackModel } from "./PokemonAttackModel";
import { PokemonTypeModel } from "./PokemonTypeModel";
import { PokemonClassificationModel } from "@app/database/models/PokemonClassificationModel";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";
import { UserModel } from "@app/database/models/UserModel";

export const PokemonRelations = {
  VOTES: "votes",
  ATTACKS: "attacks",
  PREVIOUS_EVOLUTION: "previousEvolution",
  NEXT_EVOLUTION: "nextEvolution",
  WEAKNESSES: "weaknesses",
  RESISTANTS: "resistants",
  CLASSIFICATION: "classification",
  TYPES: "types",
};

import cursor from "objection-cursor";
const cursorMixin = cursor({
  nodes: true,
  pageInfo: {
    hasNext: true,
    hasPrevious: true,
  },
});

export class PokemonModel extends cursorMixin(Model) {
  id!: number;
  name!: string;
  slug!: string;
  classification!: PokemonClassificationModel;
  commonCaptureArea!: string | null;
  evolutionRequirementAmount!: number | null;
  evolutionRequirementName!: string | null;
  weightMaximum!: number;
  weightMinimum!: number;
  heightMaximum!: number;
  heightMinimum!: number;
  fleeRate!: number;
  maxCp!: number;
  maxHp!: number;
  types!: PokemonTypeModel[];
  resistants!: PokemonTypeModel[];
  weaknesses!: PokemonTypeModel[];
  attacks!: PokemonAttackModel[];
  nextEvolution!: PokemonModel | null;
  previousEvolution!: PokemonModel | null;
  votes!: PokemonVoteModel[];

  static get idColumn() {
    return "id";
  }
  static get tableName() {
    return "pokemon";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "slug"],
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        slug: { type: "string" },
        evolutionRequirementAmount: { type: ["number", "null"] },
        evolutionRequirementName: { type: ["string", "null"] },
        commonCaptureArea: { type: ["string", "null"] },
        weightMinimum: { type: "number" },
        weightMaximum: { type: "number" },
        heightMinimum: { type: "number" },
        heightMaximum: { type: "number" },
        fleeRate: { type: "number" },
        maxCp: { type: "number" },
        maxHp: { type: "number" },
      },
    };
  }

  // @ts-expect-error recursive circular dependency due to "self-to-self" relations
  static get relationMappings() {
    return {
      [PokemonRelations.TYPES]: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonTypeModel,
        join: {
          from: "pokemon.id",
          through: {
            from: "pokemon_type_pokemon.pokemonId",
            to: "pokemon_type_pokemon.typeId",
          },
          to: "pokemon_type.id",
          orderBy: "pokemon_type.id",
        },
      },
      [PokemonRelations.RESISTANTS]: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonTypeModel,
        join: {
          from: "pokemon.id",
          through: {
            from: "pokemon_resistant_pokemon.pokemonId",
            to: "pokemon_resistant_pokemon.typeId",
          },
          to: "pokemon_type.id",
          orderBy: "pokemon_type.id",
        },
      },
      [PokemonRelations.WEAKNESSES]: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonTypeModel,
        join: {
          from: "pokemon.id",
          through: {
            from: "pokemon_weakness_pokemon.pokemonId",
            to: "pokemon_weakness_pokemon.typeId",
          },
          to: "pokemon_type.id",
          orderBy: "pokemon_type.id",
        },
      },
      [PokemonRelations.CLASSIFICATION]: {
        relation: Model.BelongsToOneRelation,
        modelClass: PokemonClassificationModel,
        join: {
          from: `pokemon.classificationId`,
          to: `pokemon_classification.id`,
          orderBy: "pokemon_classification.id",
        },
      },
      [PokemonRelations.ATTACKS]: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonAttackModel,
        join: {
          from: "pokemon.id",
          through: {
            from: "pokemon_attack_pokemon.pokemonId",
            to: "pokemon_attack_pokemon.attackId",
          },
          to: "pokemon_attack.id",
          orderBy: "pokemon_attack.id",
        },
      },
      [PokemonRelations.PREVIOUS_EVOLUTION]: {
        relation: Model.BelongsToOneRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon.id",
          to: "pokemon.nextEvolutionId",
        },
      },
      [PokemonRelations.NEXT_EVOLUTION]: {
        relation: Model.BelongsToOneRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon.nextEvolutionId",
          to: "pokemon.id",
        },
      },
      [PokemonRelations.VOTES]: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: "pokemon.id",
          through: {
            from: "pokemon_vote.pokemonId",
            to: "pokemon_vote.userId",
          },
          to: "user.id",
          orderBy: "user.id",
        },
      },
    };
  }
}
