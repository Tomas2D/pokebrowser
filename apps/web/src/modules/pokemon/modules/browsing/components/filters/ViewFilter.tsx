import { Grid as IconGrid, List as IconList } from "@carbon/icons-react";
import { Divider } from "@module/ui/components/Divider";
import styled, { css } from "styled-components";
import { useContext } from "react";
import { BrowsingView, PokemonContext } from "@module/pokemon/PokemonContext";
import { ButtonComponents } from "@app/modules/ui/components/Button";

export function ViewFilter() {
  const { browsingView, setBrowsingView } = useContext(PokemonContext);

  return (
    <StyledWrapper>
      <StyledButton
        data-cy={"filter-browsing-view-grid"}
        $isActive={browsingView === BrowsingView.GRID}
        onClick={() => setBrowsingView(BrowsingView.GRID)}
      >
        <IconGrid size={"32"} />
      </StyledButton>
      <Divider />
      <StyledButton
        data-cy={"filter-browsing-view-list"}
        $isActive={browsingView === BrowsingView.LIST}
        onClick={() => setBrowsingView(BrowsingView.LIST)}
      >
        <IconList size={"32"} />
      </StyledButton>
    </StyledWrapper>
  );
}

const StyledButton = styled(ButtonComponents.empty)<{ $isActive?: boolean }>`
  overflow: auto;

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.iconActive};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      svg {
        fill: ${({ theme }) => theme.colors.iconActive};
      }
    `}
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
