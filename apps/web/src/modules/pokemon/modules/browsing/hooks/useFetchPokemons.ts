import { gql, useQuery } from "@apollo/client";
import { Pokemon, PageInfo } from "@pokemons/api/graphql";
import { useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";

export const FETCH_POKEMONS_QUERY = gql`
  query listPokemon(
    $first: Int!
    $after: String!
    $filters: ListPokemonFilters!
  ) {
    listPokemon(first: $first, after: $after, filters: $filters) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
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
  }
`;

export function useFetchPokemons() {
  const { filters, pagination } = useContext(PokemonContext);
  const query = useQuery<{
    listPokemon: { edges: Array<{ node: Pokemon }>; pageInfo: PageInfo };
  }>(FETCH_POKEMONS_QUERY, {
    variables: {
      first: pagination.size,
      after: "",
      filters,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const data = query?.data?.listPokemon.edges || [];
  const pageInfo = query?.data?.listPokemon.pageInfo!;

  const isEmpty = !query.loading && data.length === 0;
  const isLoading = isEmpty && query.loading;
  const isLoadingMore = data.length > 0 && query.loading;

  const handleFetchMore = () => {
    if (!pageInfo.hasNextPage) {
      return;
    }

    return query.fetchMore({
      variables: {
        filters,
        first: pagination.size,
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.listPokemon?.pageInfo?.hasNextPage) {
          return prev;
        }

        let existingIds = new Set();

        return {
          ...prev,
          listPokemon: {
            pageInfo: {
              ...prev.listPokemon.pageInfo,
              ...fetchMoreResult.listPokemon.pageInfo,
            },
            edges: [
              ...prev.listPokemon.edges,
              ...fetchMoreResult.listPokemon.edges,
            ].filter(({ node }) => {
              if (existingIds.has(node.id)) {
                return false;
              }
              existingIds.add(node.id);
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
    meta: pageInfo,
    fetchMore: handleFetchMore,
    data: data.map((d) => d.node),
    isEmpty,
    pageSize: pagination.size,
  };
}
