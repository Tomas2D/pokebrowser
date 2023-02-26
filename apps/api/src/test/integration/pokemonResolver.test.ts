import { parse } from "graphql";
import { assertSingleValue, sortById } from "@app/test/utils/graphql";
import { destroyTestApp, initTestApp, TestApp } from "@app/test/utils/app";
import { PokemonFilters } from "@app/graphql";
import { PokemonModel } from "@app/database/models/PokemonModel";

describe("Pokemon", async () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it("returns list of pokemons", async () => {
    const result = await app.executor({
      variables: {
        filters: {
          size: 2,
          offset: 0,
        } as PokemonFilters,
      },
      document: parse(/* GraphQL */ `
        query listPokemon($filters: ListPokemonFilters!) {
          listPokemon(filters: $filters) {
            meta {
              total
              hasMore
            }
            edges {
              id
              name
              slug
              types {
                id
                name
              }
              maxHp
              maxCp
            }
          }
        }
      `),
    });

    assertSingleValue(result);

    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    expect(result.data.listPokemon.edges).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "maxCp": 951,
          "maxHp": 1071,
          "name": "Bulbasaur",
          "slug": "bulbasaur",
          "types": [
            {
              "id": 1,
              "name": "Grass",
            },
            {
              "id": 2,
              "name": "Poison",
            },
          ],
        },
        {
          "id": 2,
          "maxCp": 1483,
          "maxHp": 1632,
          "name": "Ivysaur",
          "slug": "ivysaur",
          "types": [
            {
              "id": 1,
              "name": "Grass",
            },
            {
              "id": 2,
              "name": "Poison",
            },
          ],
        },
      ]
    `);
    expect(result.data.listPokemon.meta).toMatchInlineSnapshot(`
      {
        "hasMore": true,
        "total": 30,
      }
    `);
  });

  it("paginates correctly", async () => {
    const runQuery = async (offset: number) => {
      const result = await app.executor({
        variables: {
          filters: {
            size: 5,
            offset,
          } as PokemonFilters,
        },
        document: parse(/* GraphQL */ `
          query listPokemon($filters: ListPokemonFilters!) {
            listPokemon(filters: $filters) {
              meta {
                total
                hasMore
              }
              edges {
                id
                types {
                  id
                  name
                }
                attacks {
                  id
                  name
                  damage
                }
                nextEvolution {
                  id
                }
                previousEvolution {
                  id
                }
              }
            }
          }
        `),
      });

      assertSingleValue(result);

      return result;
    };

    let ids = new Set();
    let totalCount = Infinity;
    let offset = 0;

    while (ids.size < totalCount) {
      const { errors, data } = await runQuery(offset);
      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      if (totalCount === Infinity) {
        totalCount = data.listPokemon.meta.total;
      }
      expect(totalCount).toBe(data.listPokemon.meta.total);

      for (const { id } of data.listPokemon.edges) {
        expect(ids.has(id)).toBe(false);
        ids.add(id);
        offset++;
      }

      if (ids.size < totalCount) {
        expect(data.listPokemon.meta.hasMore).toBe(true);
      } else {
        expect(data.listPokemon.meta.hasMore).toBe(false);
      }
    }
  });

  it("filters pokemons by type", async () => {
    const type = { id: 1, name: "Electric" };
    const size = 3;

    const result = await app.executor({
      variables: {
        filters: {
          size,
          typeId: [type.id],
        } as PokemonFilters,
      },
      document: parse(/* GraphQL */ `
        query listPokemon($filters: ListPokemonFilters!) {
          listPokemon(filters: $filters) {
            edges {
              id
              types {
                id
                name
              }
            }
          }
        }
      `),
    });

    assertSingleValue(result);

    const { data, errors } = result;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();

    expect(data.listPokemon.edges).toHaveLength(size);
    expect(
      data.listPokemon.edges.every((edge: any) =>
        edge.types.some(({ id }: typeof edge) => id === type.id)
      )
    ).toBe(true);
  });

  it("filters pokemons by name", async () => {
    const result = await app.executor({
      variables: {
        filters: {
          name: "charm",
        } as PokemonFilters,
      },
      document: parse(/* GraphQL */ `
        query listPokemon($filters: ListPokemonFilters!) {
          listPokemon(filters: $filters) {
            edges {
              id
              name
            }
          }
        }
      `),
    });

    assertSingleValue(result);

    const { data, errors } = result;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();

    expect(
      data.listPokemon.edges.every((edge: PokemonModel) =>
        edge.name.startsWith("Charm")
      )
    ).toBe(true);
  });

  it("retrieves user's favorite pokemons", async () => {
    const result = await app.executor({
      variables: {
        filters: {
          favorite: true,
        } as PokemonFilters,
      },
      document: parse(/* GraphQL */ `
        query listPokemon($filters: ListPokemonFilters!) {
          listPokemon(filters: $filters) {
            edges {
              id
              name
            }
          }
        }
      `),
    });

    assertSingleValue(result);

    const { data, errors } = result;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();

    expect(data.listPokemon.edges.map((edge: PokemonModel) => edge.name))
      .toMatchInlineSnapshot(`
      [
        "Venusaur",
        "Charmander",
        "Charmeleon",
      ]
    `);
  });

  it("retrieves pokemon by id/slug", async () => {
    const searchItem = {
      id: 4,
      slug: "charmander",
    };

    const resultSlug = await app.executor({
      variables: {
        slug: searchItem.slug,
      },
      document: parse(/* GraphQL */ `
        query ($slug: String!) {
          getPokemonBySlug(slug: $slug) {
            id
            slug
            name
            types {
              id
              name
            }
            attacks {
              id
              name
              category
              damage
              type {
                id
                name
              }
            }
            classification
            commonCaptureArea
            previousEvolution {
              id
              name
              slug
            }
            nextEvolution {
              id
              name
              slug
            }
            evolutionRequirement {
              name
              amount
            }
            maxCp
            maxHp
            fleeRate
            height {
              minimum
              maximum
            }
            weight {
              minimum
              maximum
            }
            resistants {
              id
              name
            }
            votesCount
            weaknesses {
              id
              name
            }
          }
        }
      `),
    });

    assertSingleValue(resultSlug);
    const { data, errors } = resultSlug;
    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.getPokemonBySlug.id).toBe(searchItem.id);
    expect(data.getPokemonBySlug.slug).toBe(searchItem.slug);
    sortById(data.getPokemonBySlug.attacks);
    sortById(data.getPokemonBySlug.weaknesses);
    sortById(data.getPokemonBySlug.resistants);
    sortById(data.getPokemonBySlug.types);
    expect(data.getPokemonBySlug).toMatchSnapshot();

    const resultId = await app.executor({
      variables: {
        id: searchItem.id,
      },
      document: parse(/* GraphQL */ `
        query ($id: Int!) {
          getPokemon(id: $id) {
            id
            slug
          }
        }
      `),
    });

    assertSingleValue(resultId);
    expect(resultId.errors).toBeUndefined();
    expect(resultId.data).toBeDefined();
    expect(resultId.data.getPokemon.slug).toBe(searchItem.slug);
    expect(resultId.data.getPokemon.id).toBe(searchItem.id);
  });
});
