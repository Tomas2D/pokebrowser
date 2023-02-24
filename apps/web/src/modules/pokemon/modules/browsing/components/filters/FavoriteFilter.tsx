import styled from "styled-components";
import { Button } from "carbon-components-react";
import { useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";

export function FavoriteFilter() {
  const { filters, setFilters } = useContext(PokemonContext);

  const handleShowFavoriteOnly = (showFavorite: boolean) => {
    return () =>
      setFilters({
        ...filters,
        favorite: showFavorite,
      });
  };

  return (
    <StyledButtonsWrapper>
      <Button
        data-cy={"filter-show-all"}
        kind={filters.favorite ? "tertiary" : "primary"}
        onClick={handleShowFavoriteOnly(false)}
      >
        All
      </Button>
      <Button
        data-cy={"filter-show-favorite"}
        kind={!filters.favorite ? "tertiary" : "primary"}
        onClick={handleShowFavoriteOnly(true)}
      >
        Favorites
      </Button>
    </StyledButtonsWrapper>
  );
}

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  .cds--btn {
    width: 100%;
    display: flex;
    flex: 1;
    max-width: unset;
  }
`;
