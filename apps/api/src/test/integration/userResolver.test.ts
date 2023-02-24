import { parse } from "graphql";
import { assertSingleValue } from "@app/test/utils/graphql";
import { destroyTestApp, initTestApp, TestApp } from "@app/test/utils/app";
import { Pokemon } from "@app/graphql";

describe("User", async () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it("retrieves user", async () => {
    const result = await app.executor({
      variables: {
        id: "1",
      },
      document: parse(/* GraphQL */ `
        query getUser($id: String!) {
          getUser(id: $id) {
            id
            voteIds
          }
        }
      `),
    });

    assertSingleValue(result);

    const { data, errors } = result;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();

    expect(data.getUser).toMatchInlineSnapshot(`
      {
        "id": "1",
        "voteIds": [
          3,
          4,
          5,
        ],
      }
    `);
  });

  it("retrieves current user", async () => {
    const result = await app.executor({
      document: parse(/* GraphQL */ `
        query {
          getSelf {
            id
            voteIds
          }
        }
      `),
    });

    assertSingleValue(result);
    const { data, errors } = result;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();

    expect(data.getSelf).toMatchInlineSnapshot(`
      {
        "id": "1",
        "voteIds": [
          3,
          4,
          5,
        ],
      }
    `);
  });

  it("vote for pokemon", async () => {
    const pokemonResult = await app.executor({
      variables: {
        id: 2,
      },
      document: parse(/* GraphQL */ `
        query getPokemon($id: Int!) {
          getPokemon(id: $id) {
            id
            votesCount
          }
        }
      `),
    });

    assertSingleValue(pokemonResult);
    expect(pokemonResult.errors).toBeUndefined();
    expect(pokemonResult.data).toBeDefined();

    const voteResult = await app.executor({
      variables: {
        id: (pokemonResult.data.getPokemon as Pokemon).id,
      },
      document: parse(/* GraphQL */ `
        mutation votePokemon($id: Int!) {
          votePokemon(id: $id) {
            id
            votesCount
          }
        }
      `),
    });

    assertSingleValue(voteResult);
    expect(voteResult.errors).toBeUndefined();
    expect(voteResult.data).toBeDefined();

    expect(voteResult.data.votePokemon.id).toBe(
      pokemonResult.data.getPokemon.id
    );
    expect(voteResult.data.votePokemon.votesCount).toBe(
      pokemonResult.data.getPokemon.votesCount + 1
    );
  });

  it("unvote for pokemon", async () => {
    const pokemonResult = await app.executor({
      variables: {
        id: 3,
      },
      document: parse(/* GraphQL */ `
        query getPokemon($id: Int!) {
          getPokemon(id: $id) {
            id
            votesCount
          }
        }
      `),
    });

    assertSingleValue(pokemonResult);
    expect(pokemonResult.errors).toBeUndefined();
    expect(pokemonResult.data).toBeDefined();

    const voteResult = await app.executor({
      variables: {
        id: (pokemonResult.data.getPokemon as Pokemon).id,
      },
      document: parse(/* GraphQL */ `
        mutation unVotePokemon($id: Int!) {
          unVotePokemon(id: $id) {
            id
            votesCount
          }
        }
      `),
    });

    assertSingleValue(voteResult);
    expect(voteResult.errors).toBeUndefined();
    expect(voteResult.data).toBeDefined();

    expect(voteResult.data.unVotePokemon.id).toBe(
      pokemonResult.data.getPokemon.id
    );
    expect(voteResult.data.unVotePokemon.votesCount).toBe(
      pokemonResult.data.getPokemon.votesCount - 1
    );
  });

  it("creates a user if not provided", async () => {
    const user = await app.executor({
      context: {
        headers: {
          Cookie: "",
        },
      },
      document: parse(/* GraphQL */ `
        query {
          getSelf {
            id
            voteIds
          }
        }
      `),
    });

    assertSingleValue(user);
    expect(user.errors).toBeUndefined();
    expect(user.data).toBeDefined();
    expect(user.data.getSelf).toBeDefined();
    expect(user.data.getSelf.id).toEqual(expect.any(String));
    expect(user.data.getSelf.voteIds).toStrictEqual([]);
  });
});
