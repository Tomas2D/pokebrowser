import Link from "next/link";
import { AppRoutes } from "@app/config";
import styled, { keyframes } from "styled-components";
import { ResponsiveImage } from "@module/ui/components/ResponsiveImage";

export function WelcomeHeader() {
  return (
    <Link href={AppRoutes.home} passHref>
      <StyledLink data-cy={"welcome-header"}>
        <StyledResponsiveImage src="/logo.png" />
      </StyledLink>
    </Link>
  );
}

const StyledLink = styled.a`
  display: block;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 4rem;
  margin: auto;
  padding-top: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding-top: 2rem;
  }
`;

const bounceKeyframe = keyframes`
  0%,
  100%,
  20%,
  50%,
  80% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const StyledResponsiveImage = styled(ResponsiveImage)`
  max-height: 20rem;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;

  &:hover {
    animation-name: ${bounceKeyframe};
  }
`;
