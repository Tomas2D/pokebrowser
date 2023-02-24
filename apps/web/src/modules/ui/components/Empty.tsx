import { ComponentProps, ReactNode } from "react";
import styled from "styled-components";

export interface EmptyProps extends ComponentProps<typeof StyledWrapper> {
  message?: ReactNode;
}

export function Empty({ message, ...props }: EmptyProps) {
  return (
    <StyledWrapper {...props} data-cy={"empty-wrapper"}>
      <StyledMessage>{message ?? "Nothing to display"}</StyledMessage>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
`;

const StyledMessage = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.title};
`;
