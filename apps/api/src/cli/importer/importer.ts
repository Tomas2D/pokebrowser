import "tsconfig-paths/register";
import pokemons from "./pokemons.json";
import { destroyServices, initializeServices } from "@app/setup";
import { PokemonTypeModel } from "@app/database/models/PokemonTypeModel";
import { PokemonAttackModel } from "@app/database/models/PokemonAttackModel";
import { PokemonModel } from "@app/database/models/PokemonModel";
import { PokemonClassificationModel } from "@app/database/models/PokemonClassificationModel";
import { uniq } from "rambda";
import { UserModel } from "@app/database/models/UserModel";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";
import knexConfig from "@app/database/knexfile";

function extractAllTypes() {
  return Array.from(
    uniq(
      pokemons.flatMap((pokemon) => [
        ...pokemon.types,
        ...pokemon.resistant,
        ...pokemon.weaknesses,
        ...Object.values(pokemon.attacks).flatMap((attackByType) =>
          attackByType.map((attack) => attack.type)
        ),
      ])
    )
  );
}

function extractClassifications() {
  return uniq(
    pokemons.map((pokemon) => pokemon.classification).filter(Boolean)
  );
}

function extractAttacks(typeMap: Map<string, number>) {
  return uniq(
    pokemons.flatMap((pokemon) => [
      ...Object.entries(pokemon.attacks).flatMap(([category, values]) =>
        values.map((attack) => ({
          ...attack,
          name: attack.name,
          typeId: typeMap.get(attack.type),
          category: category,
          damage: attack.damage,
        }))
      ),
    ])
  );
}

(async () => {
  await initializeServices(knexConfig.development);

  await PokemonModel.knex().transaction(async (trx) => {
    await PokemonModel.query().delete().transacting(trx);
    await PokemonModel.knex()
      .raw(`ALTER TABLE ${PokemonModel.tableName} AUTO_INCREMENT = 1`)
      .transacting(trx);
  });
  await PokemonModel.query().delete();
  await PokemonTypeModel.query().delete();
  await PokemonAttackModel.query().delete();
  await PokemonClassificationModel.query().delete();
  await PokemonVoteModel.query().delete();
  await UserModel.query().delete();

  const typesMap = new Map();
  for (const name of extractAllTypes()) {
    const response = await PokemonTypeModel.query().insert({
      name,
    });
    typesMap.set(name, response.id);
  }

  const classificationMap = new Map();
  for (const name of extractClassifications()) {
    const response = await PokemonClassificationModel.query().insert({
      name,
    });
    classificationMap.set(name, response.id);
  }

  const attacksMap = new Map();
  for (const attack of extractAttacks(typesMap)) {
    const response = await PokemonAttackModel.query().insert(attack as any);
    attacksMap.set(attack.name, response.id);
  }

  const pokemonsMap = new Map<string, number>();

  for (const {
    attacks,
    weaknesses,
    resistant,
    evolutionRequirements,
    height,
    weight,
    types,
    name,
    maxCP,
    fleeRate,
    classification,
    maxHP,
    ["Common Capture Area"]: commonCaptureArea,
  } of pokemons) {
    const pokemon: Partial<PokemonModel> = {
      name,
      slug: name
        .toLowerCase()
        .replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(" ", "-"),
      commonCaptureArea,
      heightMaximum: Math.round(parseFloat(height.maximum) * 100),
      heightMinimum: Math.round(parseFloat(height.minimum) * 100),
      weightMinimum: parseFloat(weight.minimum),
      weightMaximum: parseFloat(weight.maximum),
      fleeRate,
      maxCp: maxCP,
      maxHp: maxHP,
      evolutionRequirementAmount: evolutionRequirements?.amount ?? null,
      evolutionRequirementName: evolutionRequirements?.name ?? null,
    };

    const trx = await PokemonModel.knex().transaction();

    try {
      const response = await PokemonModel.query()
        .insert(pokemon as any)
        .transacting(trx);

      await response
        .$relatedQuery("classification")
        .relate(classificationMap.get(classification))
        .transacting(trx);
      for (const attackId of Object.values(attacks)
        .flat()
        .filter(Boolean)
        .map((attack) => attacksMap.get(attack.name))) {
        await response
          .$relatedQuery("attacks")
          .relate(attackId)
          .transacting(trx);
      }
      for (const typeId of Object.values(types).map((type) =>
        typesMap.get(type)
      )) {
        await response.$relatedQuery("types").relate(typeId).transacting(trx);
      }
      for (const resistantId of resistant.map((value) => typesMap.get(value))) {
        await response
          .$relatedQuery("resistants")
          .relate(resistantId)
          .transacting(trx);
      }
      for (const weaknessId of weaknesses.map((value) => typesMap.get(value))) {
        await response
          .$relatedQuery("weaknesses")
          .relate(weaknessId)
          .transacting(trx);
      }

      console.info(`Pokemon "${response.id}" inserted`);
      pokemonsMap.set(response.name, response.id);
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      console.error(`Pokemon failed to insert`, pokemon, e);
      throw e;
    }
  }

  for (const { name, evolutions = [] } of pokemons) {
    const id = pokemonsMap.get(name);
    const nextEvolution = evolutions[0];

    if (nextEvolution) {
      const nextId = pokemonsMap.get(nextEvolution.name);
      const relationKey =
        PokemonModel.getRelation("nextEvolution").ownerProp.cols[0];

      await PokemonModel.query()
        .patch({
          [relationKey]: nextId!,
        })
        .where({
          id,
        })
        .limit(1);
    }
  }
})().finally(destroyServices);
