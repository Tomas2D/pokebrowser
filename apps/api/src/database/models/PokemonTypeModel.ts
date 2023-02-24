import { Model } from "objection";
import { PokemonModel } from "./PokemonModel";

export class PokemonTypeModel extends Model {
  id!: number;
  name!: string;

  static get tableName() {
    return "pokemon_type";
  }

  static get relationMappings() {
    return {
      pokemon: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon_type.id",
          through: {
            from: "pokemon_type_pokemon.typeId",
            to: "pokemon_type_pokemon.pokemonId",
          },
          to: "pokemon.id",
        },
      },
    };
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
}
