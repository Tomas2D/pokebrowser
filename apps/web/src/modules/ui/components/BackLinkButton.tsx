import { Undo as UndoIcon } from "@carbon/icons-react";
import styled from "styled-components";
import { ComponentProps, forwardRef } from "react";
import { useRouter } from "next/router";

export const BackLinkButton = forwardRef(
  (props: ComponentProps<typeof StyledWrapper>, ref) => {
    const router = useRouter();

    return (
      <StyledWrapper {...props} ref={ref} onClick={() => router.back()}>
        <UndoIcon size={"32"} />
        <StyledLabel>Go Back</StyledLabel>
      </StyledWrapper>
    );
  }
);

BackLinkButton.displayName = "BackButton";

const StyledLabel = styled.span`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 500;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
