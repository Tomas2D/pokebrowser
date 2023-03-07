import {
  PokemonModel,
  PokemonRelations,
} from "@app/database/models/PokemonModel";
import { isEmpty } from "rambda";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";
import { PokemonTypeModel } from "@app/database/models/PokemonTypeModel";
import { getRelationPrimaryKey } from "@app/helpers";
import type { Connection, ConnectionArguments } from "graphql-relay";

export async function getPokemon(
  id: number | string,
  relations: string[] = []
) {
  const query = PokemonModel.query();

  for (const relation of relations) {
    query.withGraphFetched(relation).modifyGraph(relation, (builder) => {
      const modelClass = query.modelClass();
      const relationName = relation.split(".").pop()!;
      if (relationName === PokemonRelations.ATTACKS) {
        builder.withGraphFetched("type");
      }
      builder.orderBy(getRelationPrimaryKey(modelClass, relationName));
    });
  }

  const result = await query.findById(id);
  return result || null;
}

export async function getPokemonBySlug(slug: string, relations: string[] = []) {
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
    favoriteByUserId?: number;
  };
  cursor: ConnectionArguments;
  relations: string[];
}

export async function listPokemon({
  relations,
  cursor,
  filters: { typeId = [], name = "", favoriteByUserId },
}: ListPokemonOptions): Promise<Connection<PokemonModel>> {
  const query = PokemonModel.query().leftJoinRelated(PokemonRelations.TYPES);

  if (name?.trim()) {
    query.where(PokemonModel.ref("name"), "LIKE", `%${name.trim()}%`);
  }

  if (!isEmpty(typeId)) {
    query.where(`types.id`, "IN", typeId);
  }

  if (favoriteByUserId) {
    query.whereExists(
      PokemonVoteModel.query()
        .select(1)
        .where(PokemonVoteModel.ref("pokemonId"), PokemonModel.ref("id"))
        .andWhere(PokemonVoteModel.ref("userId"), "=", favoriteByUserId)
    );
  }

  query.limit(cursor.first! ?? cursor.last!);

  const { pageInfo, nodes = [] } = await (cursor.before !== undefined
    ? query.previousCursorPage(cursor.before)
    : query.cursorPage(cursor.after)
  )
    .orderBy(PokemonModel.ref("id"), "ASC")
    .groupBy(PokemonModel.ref("id"));

  await Promise.all(
    nodes.map(async (result: { data: PokemonModel }) => {
      for (const relation of relations) {
        await result.data.$fetchGraph(relation, {
          skipFetched: true,
        });
        if (relation.split(".").pop()! === PokemonRelations.ATTACKS) {
          await result.data.$fetchGraph(`${relation}.type`, {
            skipFetched: true,
          });
        }
      }
      return result;
    })
  );

  return {
    edges: nodes.map(({ cursor, data: node }) => ({ cursor, node })),
    pageInfo: {
      hasNextPage: Boolean(pageInfo?.hasNext),
      hasPreviousPage: Boolean(pageInfo?.hasPrevious),
      startCursor: pageInfo?.previous,
      endCursor: pageInfo?.next,
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

export async function voteForPokemon(
  options: VotePokemonOptions,
  relations: string[]
) {
  if (!(await hasVotedForPokemon(options))) {
    await PokemonVoteModel.query().insert(options).limit(1);
  }

  return getPokemon(options.pokemonId, relations);
}

export async function unVoteForPokemon(
  options: VotePokemonOptions,
  relations: string[]
) {
  if (await hasVotedForPokemon(options)) {
    await PokemonVoteModel.query().delete().where(options).limit(1);
  }

  return getPokemon(options.pokemonId, relations);
}
