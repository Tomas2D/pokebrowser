import { gql, useQuery } from "@apollo/client";
import type { Pokemon } from "@pokemons/api/graphql";

export const FETCH_POKEMON_TYPES_QUERY = gql`
  query {
    listPokemonTypes {
      id
      name
    }
  }
`;

export function useFetchPokemonTypes() {
  const query = useQuery<{
    listPokemonTypes: Pokemon["types"];
  }>(FETCH_POKEMON_TYPES_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const data = query?.data?.listPokemonTypes || [];
  const isEmpty = !query.loading && data.length === 0;
  const isLoading = isEmpty && query.loading;
  const isLoadingMore = data.length > 0 && query.loading;

  return {
    ...query,
    data,
    loading: isLoading,
    isLoadingMore,
    isEmpty,
  };
}
