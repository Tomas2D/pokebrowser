import { Model } from "objection";
import { PokemonModel } from "@app/database/models/PokemonModel";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";

export class UserModel extends Model {
  id!: string;
  createdAt!: Date;

  static get idColumn() {
    return "id";
  }

  static get tableName() {
    return "user";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
        createdAt: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      voteIds: {
        relation: Model.HasManyRelation,
        modelClass: PokemonVoteModel,
        join: {
          from: "user.id",
          to: "pokemon_vote.userId",
        },
      },
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonModel,
        join: {
          from: "user.id",
          through: {
            from: "pokemon_vote.userId",
            to: "pokemon_vote.pokemonId",
          },
          to: "pokemon.id",
        },
      },
    };
  }
}
