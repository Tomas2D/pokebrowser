import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { FETCH_CURRENT_USER_QUERY } from "@module/user/hooks/useFetchCurrentUser";
import { FETCH_POKEMONS_QUERY } from "@module/pokemon/modules/browsing/hooks/useFetchPokemons";
import { useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";
import { FETCH_POKEMON_BY_SLUG_QUERY } from "@module/pokemon/modules/detail/hook/useFetchPokemon";
import { Pokemon } from "@pokemons/api/graphql";

const UNVOTE_POKEMON_MUTATION = gql`
  mutation unVotePokemon($id: Int!) {
    unVotePokemon(id: $id) {
      id
      votesCount
    }
  }
`;

const VOTE_POKEMON_MUTATION = gql`
  mutation votePokemon($id: Int!) {
    votePokemon(id: $id) {
      id
      votesCount
    }
  }
`;

interface UsePokemonActionsOptions {
  id: number;
  slug: string;
}

enum VoteType {
  VOTE,
  UNVOTE,
}

export function usePokemonActions({ id, slug }: UsePokemonActionsOptions) {
  const { filters } = useContext(PokemonContext);

  const mutationOptions = (
    voteType: VoteType
  ): Partial<MutationHookOptions> => {
    return {
      variables: { id },
      refetchQueries: [
        {
          query: FETCH_CURRENT_USER_QUERY,
        },
      ],
      update(cache, { data }) {
        cache.updateQuery(
          {
            query: FETCH_POKEMON_BY_SLUG_QUERY,
            variables: { slug },
          },
          (oldData) => {
            if (!oldData) {
              return oldData;
            }
            return { ...oldData, ...data };
          }
        );
        if (filters.favorite) {
          cache.updateQuery(
            {
              query: FETCH_POKEMONS_QUERY,
              variables: { filters },
            },
            (oldData) => {
              if (!oldData) {
                return oldData;
              }

              return {
                ...oldData,
                listPokemon: {
                  ...oldData.listPokemon,
                  meta: {
                    ...oldData.listPokemon.meta,
                    total: oldData.listPokemon.meta.total - 1,
                  },
                  edges:
                    voteType === VoteType.VOTE
                      ? oldData.listPokemon.edges.filter(
                          (pokemon: Pokemon) => pokemon.id === id
                        )
                      : oldData.listPokemon.edges.filter(
                          (pokemon: Pokemon) => pokemon.id !== id
                        ),
                },
              };
            }
          );
        }
      },
    };
  };

  const [onUnVote, unVoteMeta] = useMutation(
    UNVOTE_POKEMON_MUTATION,
    mutationOptions(VoteType.UNVOTE)
  );
  const [onVote, voteMeta] = useMutation(
    VOTE_POKEMON_MUTATION,
    mutationOptions(VoteType.VOTE)
  );

  return {
    onUnVote,
    unVoteMeta,

    onVote,
    voteMeta,
  };
}
