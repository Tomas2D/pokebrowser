import styled from "styled-components";
import { GridEntry, StyledWrapper as StyledEntryWrapper } from "./GridEntry";
import { BrowsingViewProps, BrowsingViewSkeletonProps } from "../types";

export function Grid({ data }: BrowsingViewProps) {
  return (
    <StyledWrapper data-cy={"grid-wrapper"}>
      {data.map((pokemon) => (
        <GridEntry key={pokemon.id} data={pokemon} />
      ))}
    </StyledWrapper>
  );
}

Grid.Skeleton = function Skeleton({ count }: BrowsingViewSkeletonProps) {
  return (
    <StyledWrapper data-cy={"grid-skeleton-wrapper"}>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <GridEntry.Skeleton key={`grid-skeleton-${i}`} />
        ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;

  ${StyledEntryWrapper} {
    width: 50%;
    flex-grow: 0;
    flex-shrink: 0;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 25%;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxlarge}) {
      width: 20%;
    }
  }
`;
