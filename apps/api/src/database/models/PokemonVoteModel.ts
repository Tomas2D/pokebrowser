import { Model } from "objection";
import { UserModel } from "@app/database/models/UserModel";
import { PokemonModel } from "@app/database/models/PokemonModel";

export class PokemonVoteModel extends Model {
  userId!: string;
  pokemonId!: number;

  static get idColumn() {
    return "id";
  }
  static get tableName() {
    return "pokemon_vote";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "pokemonId"],
      properties: {
        userId: { type: "string" },
        pokemonId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "pokemon_vote.userId",
          to: "user.id",
        },
      },
      pokemon: {
        relation: Model.BelongsToOneRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon_vote.pokemonId",
          to: "pokemon.id",
        },
      },
    };
  }
}
