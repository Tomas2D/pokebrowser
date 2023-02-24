import styled from "styled-components";
import { Content } from "./Content";
import { Filters } from "./filters/Filters";

export function PokemonBrowsing() {
  return (
    <StyledWrapper>
      <Filters />
      <Content />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
