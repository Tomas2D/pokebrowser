import { Model } from "objection";
import { PokemonModel } from "./PokemonModel";
import { PokemonTypeModel } from "@app/database/models/PokemonTypeModel";

export class PokemonAttackModel extends Model {
  id!: number;
  name!: string;
  type!: PokemonTypeModel;
  damage!: number;
  category!: "fast" | "special";

  static get tableName() {
    return "pokemon_attack";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "type", "damage", "category"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string", minLength: 1, maxLength: 255 },
        damage: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: PokemonModel,
        join: {
          from: "pokemon_attack.id",
          through: {
            from: "pokemon_attack_pokemon.attackId",
            to: "pokemon_attack_pokemon.pokemonId",
          },
          to: "pokemon.id",
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: PokemonTypeModel,
        join: {
          from: `pokemon_attack.typeId`,
          to: `pokemon_type.id`,
        },
      },
    };
  }
}
