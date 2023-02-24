import styled from "styled-components";
import {
  SkeletonPlaceholder,
  SkeletonText,
  Tile,
} from "carbon-components-react";
import type { Pokemon } from "@pokemons/api/graphql";
import { ResponsiveImage } from "@module/ui/components/ResponsiveImage";
import { getPokemonPreviewImage } from "@module/pokemon/utils";
import { PokemonVoteButton } from "@module/pokemon/components/PokemonVoteButton";
import { Favorite as IconFavorite } from "@carbon/icons-react";
import { AppRoutes } from "@app/config";
import Link from "next/link";

interface ListEntryProps {
  data: Pokemon;
}

export function ListEntry({ data }: ListEntryProps) {
  return (
    <StyledWrapper data-cy={"list-entry-wrapper"}>
      <Link href={AppRoutes.detail(data.slug)} passHref legacyBehavior>
        <StyledLink>
          <StyledImage src={getPokemonPreviewImage(data.slug!)} />
          <StyledTextContent>
            <StyledName>{data.name}</StyledName>
            <StyledTypes>
              {data.types!.map((type) => type!.name).join(", ")}
            </StyledTypes>
          </StyledTextContent>
          <PokemonVoteButton pokemon={data!} />
        </StyledLink>
      </Link>
    </StyledWrapper>
  );
}

ListEntry.Skeleton = function Skeleton() {
  return (
    <StyledWrapper data-cy={"list-entry-skeleton-wrapper"}>
      <StyledSkeletonImage />
      <StyledTextContent>
        <StyledName>
          <SkeletonText />
        </StyledName>
        <StyledTypes>
          <SkeletonText />
        </StyledTypes>
      </StyledTextContent>
      <IconFavorite size={"24"} />
    </StyledWrapper>
  );
};

const StyledName = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1.85;
`;

const StyledTypes = styled.span`
  display: block;
  font-size: 1em;
  line-height: 1.25;
`;

const StyledTextContent = styled.div`
  margin-right: auto;
  flex-shrink: 0;
  flex-grow: 1;
`;

const StyledSkeletonImage = styled(SkeletonPlaceholder)`
  flex-grow: 0;
  flex-shrink: 1;
  height: 64px;
  width: 64px;
  object-fit: contain;
  object-position: bottom;
`;

const StyledImage = styled(ResponsiveImage)`
  flex-grow: 0;
  flex-shrink: 1;
  height: 64px;
  width: 64px;
  object-fit: contain;
  object-position: bottom;
`;

export const StyledWrapper = styled(Tile)`
  background-color: ${({ theme }) => theme.colors.neutral};
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: transform 0.2s ease;

  &:hover {
    transform: scaleX(1.025);
  }
`;

export const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;

  overflow: auto;
  flex-grow: 0;
  flex-shrink: 1;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;
