import styled from "styled-components";
import { Tile } from "carbon-components-react";

export const Block = styled(Tile)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral};
  gap: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.base};
  color: inherit;
`;
