import { Pokemon } from "@pokemons/api/graphql";
import styled from "styled-components";
import { Block } from "@module/ui/components/Block";
import { SectionTitle } from "@module/ui/components/SectionTitle";
import { LocationCurrent, Redo, Undo } from "@carbon/icons-react";
import {
  EvolutionItem,
  StyledItemWrapper,
} from "@module/pokemon/modules/detail/components/Content/Evolution/EvolutionItem";

interface EvolutionProps {
  data: Pokemon;
}

export function Evolution({
  data: { previousEvolution, nextEvolution, ...current },
}: EvolutionProps) {
  if (!previousEvolution && !nextEvolution) {
    return null;
  }

  return (
    <StyledWrapper>
      <SectionTitle>Evolutions</SectionTitle>
      <StyledInnerWrapper>
        <EvolutionItem
          linkProps={{
            "data-cy": "evolution-tile-previous",
          }}
          pokemon={previousEvolution}
          tagContent={
            <>
              <Undo />
              Previous
            </>
          }
        />
        <EvolutionItem
          linkProps={{
            "data-cy": "evolution-tile-current",
          }}
          pokemon={current}
          tagContent={
            <>
              <LocationCurrent /> Current
            </>
          }
        />
        <EvolutionItem
          linkProps={{
            "data-cy": "evolution-tile-next",
          }}
          pokemon={nextEvolution}
          tagContent={
            <>
              Next
              <Redo />
            </>
          }
        />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Block)`
  display: flex;
  gap: 1rem;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  color: inherit;
  flex-wrap: wrap;

  ${StyledItemWrapper} {
    width: calc(33.33% - 1rem);
    flex: 1;
  }
`;
