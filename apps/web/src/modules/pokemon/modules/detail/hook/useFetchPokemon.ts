import { gql, useQuery } from "@apollo/client";
import { Pokemon } from "@pokemons/api/graphql";

export const FETCH_POKEMON_BY_SLUG_QUERY = gql`
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
`;

export function useFetchPokemon(slug: string) {
  const query = useQuery<{ getPokemonBySlug: Pokemon | null }>(
    FETCH_POKEMON_BY_SLUG_QUERY,
    {
      variables: { slug },
      notifyOnNetworkStatusChange: true,
    }
  );

  const data = query?.data?.getPokemonBySlug;
  const isEmpty = !query.loading && !data;
  const isLoading = isEmpty && query.loading;

  return {
    ...query,
    loading: isLoading,
    data,
    isEmpty,
  };
}
