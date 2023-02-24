import { Pokemon } from "@pokemons/api/graphql";

export interface BrowsingViewProps {
  data: Pokemon[];
}

export interface BrowsingViewSkeletonProps {
  count: number;
}
