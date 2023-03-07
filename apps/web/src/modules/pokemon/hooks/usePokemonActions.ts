import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { FETCH_CURRENT_USER_QUERY } from "@module/user/hooks/useFetchCurrentUser";
import { useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";

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

export function usePokemonActions({ id }: UsePokemonActionsOptions) {
  const mutationOptions: Partial<MutationHookOptions> = {
    variables: { id },
    refetchQueries: [
      {
        query: FETCH_CURRENT_USER_QUERY,
      },
    ],
  };

  const [onUnVote, unVoteMeta] = useMutation(
    UNVOTE_POKEMON_MUTATION,
    mutationOptions
  );
  const [onVote, voteMeta] = useMutation(
    VOTE_POKEMON_MUTATION,
    mutationOptions
  );

  return {
    onUnVote,
    unVoteMeta,

    onVote,
    voteMeta,
  };
}
