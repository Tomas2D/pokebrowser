import styled from "styled-components";
import {
  ListEntry,
  StyledWrapper as StyledListEntryWrapper,
} from "./ListEntry";
import {
  BrowsingViewProps,
  BrowsingViewSkeletonProps,
} from "@module/pokemon/modules/browsing/components/views/types";

export function List({ data }: BrowsingViewProps) {
  return (
    <StyledWrapper data-cy={"list-wrapper"}>
      {data.map((pokemon) => (
        <ListEntry key={pokemon.id} data={pokemon} />
      ))}
    </StyledWrapper>
  );
}

List.Skeleton = function Skeleton({ count }: BrowsingViewSkeletonProps) {
  return (
    <StyledWrapper data-cy={"list-skeleton-wrapper"}>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <ListEntry.Skeleton key={i} />
        ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${StyledListEntryWrapper} {
    width: 100%;
  }
`;
