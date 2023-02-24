import { Redo as RedoIcon } from "@carbon/icons-react";
import styled, { css } from "styled-components";
import { ComponentPropsWithoutRef, forwardRef, MouseEvent } from "react";

export const NextButton = forwardRef(
  (props: ComponentPropsWithoutRef<typeof StyledWrapper>, ref) => {
    const handleClick = (e: MouseEvent) => {
      if (props.disabled) {
        e.preventDefault();
        return false;
      }
      props.onClick?.(e);
    };

    return (
      <StyledWrapper
        {...props}
        ref={ref as any}
        onClick={handleClick}
        data-cy={"next-button"}
      >
        <StyledLabel>Next</StyledLabel>
        <RedoIcon size={"32"} />
      </StyledWrapper>
    );
  }
);

NextButton.displayName = "NextButton";

const StyledLabel = styled.span`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 500;
`;

const StyledWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: black;
  text-decoration: none;
  border: none;

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.6;

          * {
            pointer-events: none;
          }
        `
      : css`
          &:hover {
            text-decoration: underline;
          }
        `}
`;
