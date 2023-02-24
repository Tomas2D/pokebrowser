import styled from "styled-components";
import {
  SkeletonPlaceholder,
  SkeletonText,
  Tile,
} from "carbon-components-react";
import type { Pokemon } from "@pokemons/api/graphql";
import { ResponsiveImage } from "@module/ui/components/ResponsiveImage";
import { Favorite as IconFavorite } from "@carbon/icons-react";
import { PokemonVoteButton } from "@module/pokemon/components/PokemonVoteButton";
import { getPokemonPreviewImage } from "@module/pokemon/utils";
import Link from "next/link";
import { AppRoutes } from "@app/config";

interface GridEntryProps {
  data: Pokemon;
}

export function GridEntry({ data }: GridEntryProps) {
  return (
    <StyledWrapper data-cy={"grid-entry-wrapper"}>
      <Link href={AppRoutes.detail(data.slug)} passHref legacyBehavior>
        <StyledLink>
          <StyledResponsiveImage
            data-cy={"grid-entry-image"}
            src={getPokemonPreviewImage(data.slug)}
            LoadingComponent={<StyledImageSkeleton />}
          />
        </StyledLink>
      </Link>
      <StyledFooter>
        <StyledFooterContent>
          <StyledName data-cy={"grid-entry-name"}>{data.name}</StyledName>
          <StyledTypes data-cy={"grid-entry-types"}>
            {data.types.map((type) => type.name).join(", ")}
          </StyledTypes>
        </StyledFooterContent>
        <PokemonVoteButton pokemon={data} />
      </StyledFooter>
    </StyledWrapper>
  );
}

GridEntry.Skeleton = function Skeleton() {
  return (
    <StyledWrapper data-cy={"grid-entry-skeleton-wrapper"}>
      <StyledImageSkeleton />
      <StyledFooter>
        <StyledFooterContent>
          <StyledName>
            <SkeletonText />
          </StyledName>
          <StyledTypes>
            <SkeletonText />
          </StyledTypes>
        </StyledFooterContent>
        <IconFavorite size={"24"} />
      </StyledFooter>
    </StyledWrapper>
  );
};

const StyledLink = styled.a`
  display: flex;
  overflow: auto;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 1;
  width: auto;
  height: 225px;
`;

const StyledResponsiveImage = styled(ResponsiveImage)`
  object-fit: contain;
  object-position: bottom;
`;

const StyledImageSkeleton = styled(SkeletonPlaceholder)`
  display: flex;
  height: 225px;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
`;

export const StyledFooter = styled(Tile)`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const StyledFooterContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const StyledWrapper = styled(Tile)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral};
  gap: 1rem;

  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

const StyledName = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.25em;
  line-height: 1.5;
`;

const StyledTypes = styled.span`
  display: block;
  font-size: 0.85em;
  line-height: 1.25;
`;
