import { Pokemon } from "@pokemons/api/graphql";
import styled from "styled-components";
import { ResponsiveImage } from "@module/ui/components/ResponsiveImage";
import { getPokemonPreviewImage } from "@module/pokemon/utils";
import { Block } from "@module/ui/components/Block";
import Link from "next/link";
import { AppRoutes } from "@app/config";
import { InformationDisabled } from "@carbon/icons-react";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { Tag } from "@app/modules/ui/components/Tag";

interface EvolutionProps {
  pokemon?: Pick<Pokemon, "name" | "slug"> | null;
  tagContent: ReactNode;
  linkProps?: Omit<ComponentPropsWithoutRef<typeof StyledLink>, "href">;
}

export function EvolutionItem({
  pokemon,
  tagContent,
  linkProps,
}: EvolutionProps) {
  if (!pokemon) {
    return <EvolutionItem.Empty tagContent={tagContent} />;
  }

  return (
    <StyledHoverItemWrapper>
      <Tag>
        <StyledTagContent>{tagContent}</StyledTagContent>
      </Tag>
      <Link href={AppRoutes.detail(pokemon.slug)} passHref>
        <StyledLink {...linkProps}>
          <ResponsiveImage
            src={getPokemonPreviewImage(pokemon.slug)}
            data-cy={"evolution-image"}
          />
          <StyledName>{pokemon.name}</StyledName>
        </StyledLink>
      </Link>
    </StyledHoverItemWrapper>
  );
}

EvolutionItem.Empty = function Empty({
  tagContent,
}: Pick<EvolutionProps, "tagContent">) {
  return (
    <StyledItemWrapper>
      <Tag>
        <StyledTagContent>{tagContent}</StyledTagContent>
      </Tag>
      <StyledLink as={"div"}>
        <StyledIconWrapper>
          <InformationDisabled size={48 as any} />
        </StyledIconWrapper>
        <StyledName>{"None"}</StyledName>
      </StyledLink>
    </StyledItemWrapper>
  );
};

const StyledIconWrapper = styled.div`
  margin: auto;
`;

const StyledLink = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: inherit;
  text-decoration: none;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  height: 100%;
`;

const StyledName = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
`;

export const StyledItemWrapper = styled(Block)``;

const StyledHoverItemWrapper = styled(StyledItemWrapper)`
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.75;
  }
`;

const StyledTagContent = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
