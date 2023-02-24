import { gql, useQuery } from "@apollo/client";
import { User } from "@pokemons/api/graphql";

export const FETCH_CURRENT_USER_QUERY = gql`
  query {
    getSelf {
      id
      voteIds
    }
  }
`;

export function useFetchCurrentUser() {
  const query = useQuery<{ getSelf: User }>(FETCH_CURRENT_USER_QUERY, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "cache-and-network",
  });

  return {
    ...query,
    data: query.data?.getSelf || null,
  };
}
