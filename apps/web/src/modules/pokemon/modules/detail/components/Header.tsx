import styled from "styled-components";
import { Pokemon } from "@pokemons/api/graphql";
import Title from "@module/ui/components/Title";
import { AppRoutes } from "@app/config";
import Link from "next/link";
import { NextButton } from "@module/ui/components/NextButton";
import { Loader } from "@module/ui/components/Loader";
import { PokemonVoteSummaryButton } from "@module/pokemon/components/PokemonVoteSummaryButton";
import { BackButton } from "@module/ui/components/BackButton";

interface HeaderProps {
  data: Pokemon;
}

export function Header({ data }: HeaderProps) {
  const nextLink = data?.nextEvolution
    ? AppRoutes.detail(data?.nextEvolution?.slug)
    : null;

  const previousLink = data?.previousEvolution
    ? AppRoutes.detail(data?.previousEvolution?.slug)
    : null;

  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <Link href={AppRoutes.home} passHref scroll={false}>
          <BackButton data-cy={"back-to-list"} as={"a"}>
            Back to List
          </BackButton>
        </Link>
      </StyledButtonWrapper>
      <TitleWrapper>
        <Title>{data.name}</Title>
        <PokemonVoteSummaryButton
          pokemon={data}
          size={42}
          totalVotes={data.votesCount!}
        />
      </TitleWrapper>
      <StyledLinksWrapper>
        <Link href={previousLink || AppRoutes.home} passHref legacyBehavior>
          <BackButton disabled={!previousLink} as={"a"} />
        </Link>
        <Link href={nextLink || AppRoutes.home} passHref legacyBehavior>
          <NextButton disabled={!nextLink} as={"a"} />
        </Link>
      </StyledLinksWrapper>
    </StyledWrapper>
  );
}

Header.Skeleton = function Skeleton({ isEmpty }: { isEmpty?: boolean }) {
  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <Link href={AppRoutes.home} passHref scroll={false}>
          <BackButton as={"a"}>Back to List</BackButton>
        </Link>
      </StyledButtonWrapper>
      <TitleWrapper>
        <Loader loadingText={isEmpty ? "Not found" : "Loading"} />
      </TitleWrapper>
      <StyledLinksWrapper>
        <BackButton disabled />
        <NextButton disabled />
      </StyledLinksWrapper>
    </StyledWrapper>
  );
};

const StyledButtonWrapper = styled.div`
  order: 2;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    order: 0;
  }
`;

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const TitleWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledWrapper = styled.header`
  background: ${({ theme }) => theme.colors.neutral};
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  flex-grow: 1;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    flex-direction: row;
    gap: 1.25rem;
  }

  justify-content: space-between;
  display: flex;
  z-index: 3;
  position: sticky;
  top: 0;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: 0 1rem;
  flex-wrap: wrap;
`;
