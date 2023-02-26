import { gql, useQuery } from "@apollo/client";
import { Pokemon, PokemonMeta } from "@pokemons/api/graphql";
import { useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";

export const FETCH_POKEMONS_QUERY = gql`
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
        weaknesses {
          id
          name
        }
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        maxHp
        maxCp
        fleeRate
      }
    }
  }
`;

export function useFetchPokemons() {
  const { filters } = useContext(PokemonContext);
  const query = useQuery<{
    listPokemon: { edges: Pokemon[]; meta: PokemonMeta };
  }>(FETCH_POKEMONS_QUERY, {
    variables: { filters },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const data = query?.data?.listPokemon.edges || [];
  const meta = query?.data?.listPokemon.meta;

  const isEmpty = !query.loading && data.length === 0;
  const isLoading = isEmpty && query.loading;
  const isLoadingMore = data.length > 0 && query.loading;

  const handleFetchMore = () => {
    return query.fetchMore({
      variables: {
        filters: {
          ...filters,
          offset: data.length,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.listPokemon?.meta?.hasMore) {
          return prev;
        }

        let existingIds = new Set();

        return {
          ...prev,
          listPokemon: {
            meta: {
              ...prev.listPokemon.meta,
              ...fetchMoreResult.listPokemon.meta,
            },
            edges: [
              ...prev.listPokemon.edges,
              ...fetchMoreResult.listPokemon.edges,
            ].filter((pokemon) => {
              if (existingIds.has(pokemon.id)) {
                return false;
              }
              existingIds.add(pokemon.id);
              return true;
            }),
          },
        };
      },
    });
  };

  return {
    ...query,
    loading: isLoading,
    isLoadingMore,
    meta,
    fetchMore: handleFetchMore,
    data,
    isEmpty,
    pageSize: filters.size!,
  };
}
