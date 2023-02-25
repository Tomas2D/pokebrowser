import {
  PokemonModel,
  PokemonRelations,
  PokemonRelationsType,
} from "@app/database/models/PokemonModel";
import { isEmpty } from "rambda";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";
import { PokemonTypeModel } from "@app/database/models/PokemonTypeModel";
import { pickFirstKey } from "@app/graphql/utilities";
import { getRelationPrimaryKey } from "@app/helpers";
import { PokemonAttackModel } from "@app/database/models/PokemonAttackModel";

export async function getPokemon(
  id: number,
  relations: PokemonRelationsType[] = []
) {
  const query = PokemonModel.query();
  relations.forEach((relation) =>
    query.withGraphFetched(relation).modifyGraph(relation, (builder) => {
      const modelClass = query.modelClass();
      if (relation === PokemonRelations.ATTACKS) {
        const attackTypeRelation = PokemonAttackModel.getRelation("type").name;
        builder.withGraphFetched(attackTypeRelation);
      }
      builder.orderBy(getRelationPrimaryKey(modelClass, relation));
    })
  );

  const result = await query.findById(id);
  return result || null;
}

export async function getPokemonBySlug(
  slug: string,
  relations: PokemonRelationsType[] = []
) {
  const pokemon = await PokemonModel.query()
    .select("id")
    .findOne({
      slug,
    })
    .first();

  return pokemon ? getPokemon(pokemon.id, relations) : null;
}

export interface ListPokemonOptions {
  filters: {
    typeId?: number[];
    name?: string;
    offset?: number;
    size?: number;
    favoriteByUserId?: number;
  };
  relations: PokemonRelationsType[];
}

export async function listPokemon({
  relations,
  filters: { typeId = [], offset = 0, size = 20, name = "", favoriteByUserId },
}: ListPokemonOptions) {
  const query = PokemonModel.query().leftJoinRelated(PokemonRelations.TYPES);

  if (name?.trim()) {
    query.where(PokemonModel.ref("name"), "LIKE", `%${name!.trim()}%`);
  }

  if (!isEmpty(typeId)) {
    query.where(`types.id`, "IN", typeId);
  }

  if (favoriteByUserId) {
    query.whereExists(
      PokemonVoteModel.query()
        .select(1)
        .where(PokemonVoteModel.ref("pokemonId"), PokemonModel.ref("id"))
        .andWhere(PokemonVoteModel.ref("userId"), "=", favoriteByUserId!)
    );
  }

  const [total, results] = await Promise.all([
    query
      .clone()
      .clearSelect()
      .countDistinct(PokemonModel.ref("id"))
      .first()
      .then(pickFirstKey<number>),
    query
      .limit(size)
      .offset(offset)
      .orderBy(PokemonModel.ref("id"))
      .groupBy(PokemonModel.ref("id")),
  ]);

  const resultsWithRelations: PokemonModel[] = await Promise.all(
    results.map(async (result: PokemonModel) => {
      await Promise.all(
        relations.map((relation) =>
          result
            .$fetchGraph(relation)
            .orderBy(getRelationPrimaryKey(result, relation))
        )
      );
      return result;
    })
  );

  return {
    edges: resultsWithRelations,
    meta: {
      total,
      hasMore: Math.max(0, total - (resultsWithRelations.length + offset)) > 0,
    },
  };
}

export async function listPokemonTypes(): Promise<PokemonTypeModel[]> {
  return PokemonTypeModel.query().limit(1_000);
}

export interface VotePokemonOptions {
  userId: string;
  pokemonId: number;
}

export async function hasVotedForPokemon({
  userId,
  pokemonId,
}: VotePokemonOptions) {
  const result = await PokemonVoteModel.query()
    .select(1)
    .where({
      userId,
      pokemonId,
    })
    .limit(1);

  return result.length > 0;
}

export async function voteForPokemon(options: VotePokemonOptions) {
  if (!(await hasVotedForPokemon(options))) {
    await PokemonVoteModel.query().insert(options).limit(1);
  }

  return getPokemon(options.pokemonId);
}

export async function unVoteForPokemon(options: VotePokemonOptions) {
  if (await hasVotedForPokemon(options)) {
    await PokemonVoteModel.query().delete().where(options).limit(1);
  }

  return getPokemon(options.pokemonId);
}
