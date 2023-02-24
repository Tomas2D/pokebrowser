import { Model } from "objection";
import { PokemonModel } from "./PokemonModel";

export class PokemonClassificationModel extends Model {
  id!: number;
  name!: string;

  static get tableName() {
    return "pokemon_classification";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      pokemons: {
        relation: Model.HasManyRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon_classification.id",
          to: "pokemon.classificationId",
        },
      },
    };
  }
}
