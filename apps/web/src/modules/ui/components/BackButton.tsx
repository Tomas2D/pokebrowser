import { Undo as UndoIcon } from "@carbon/icons-react";
import styled, { css } from "styled-components";
import { ComponentProps, forwardRef, MouseEvent } from "react";

export const BackButton = forwardRef(
  ({ children, ...props }: ComponentProps<typeof StyledWrapper>, ref) => {
    const handleClick = (e: MouseEvent) => {
      if (props.disabled) {
        e.preventDefault();
        return false;
      }
      props.onClick?.(e);
    };

    return (
      <StyledWrapper
        data-cy={"back-button"}
        {...props}
        ref={ref}
        onClick={handleClick}
      >
        <UndoIcon size={"32"} />
        <StyledLabel>{children || "Back"}</StyledLabel>
      </StyledWrapper>
    );
  }
);

BackButton.displayName = "NextButton";

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
