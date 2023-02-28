import { ComponentProps, ReactNode } from "react";
import styled, { keyframes } from "styled-components";

export interface LoaderProps extends ComponentProps<typeof StyledWrapper> {
  children?: ReactNode;
  isLoading?: boolean;
  message?: ReactNode;
  loadingText?: string;
}

export function Loader({
  children,
  message,
  isLoading = true,
  loadingText = "loading",
  ...props
}: LoaderProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <StyledWrapper {...props} $lettersCount={loadingText.length}>
      <StyledWrapperLoading>
        {loadingText!
          .replace(/" "/g, "\u00A0")
          .split("")
          .map((letter, i) => (
            <StyledLetter key={i}>{letter}</StyledLetter>
          ))}
      </StyledWrapperLoading>
      {message && <StyledMessage>{message}</StyledMessage>}
    </StyledWrapper>
  );
}

const StyledWrapperLoading = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 2rem;
  color: inherit;
  user-select: none;
`;

const StyledMessage = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: inherit;
  margin-top: 8px;
`;

const dropKeyframe = keyframes`
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
    transform: rotateX(-360deg) translateY(0);
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: rotateX(-360deg)
    translateY(2rem);
  }
`;

const StyledLetter = styled.span`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  opacity: 0;
  transform: rotateX(-90deg);
`;

export const StyledWrapper = styled.div<{ $lettersCount: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80px;
  color: ${(props) => props.theme.colors.title};

  ${StyledLetter} {
    animation: ${dropKeyframe} 1.2s ease-in-out infinite;

    ${({ $lettersCount }) =>
      Array.from({ length: $lettersCount }).map(
        (_, i) => `
        &:nth-child(${i + 1}) {
          animation-delay: ${0.1 * (i + 2)}s;
        }
      `
      )}
  }
`;
