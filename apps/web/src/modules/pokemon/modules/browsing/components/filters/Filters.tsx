import styled from "styled-components";
import { SearchFilter } from "./SearchFilter";
import { TypeFilter } from "./TypeFilter";
import { FavoriteFilter } from "./FavoriteFilter";
import { ViewFilter } from "./ViewFilter";

export function Filters() {
  return (
    <StyledWrapper>
      <FavoriteFilter />
      <StyledFiltersWrapper>
        <SearchFilter />
        <StyledSelectWrapper>
          <TypeFilter />
        </StyledSelectWrapper>
        <ViewFilter />
      </StyledFiltersWrapper>
    </StyledWrapper>
  );
}

const StyledSelectWrapper = styled.div`
  width: 35%;
`;

const StyledFiltersWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
`;

const StyledWrapper = styled.header`
  background: ${({ theme }) => theme.colors.neutral};
  flex-direction: column;
  width: 100%;
  display: flex;
  z-index: 2;
  position: sticky;
  top: 0;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: 0.5rem;
  gap: 0.5rem;
`;
