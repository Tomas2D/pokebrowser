import React, { MouseEventHandler, ReactNode, useContext } from "react";
import { UserContext } from "@module/user/UserContext";
import { ButtonComponents } from "@module/ui/components/Button";
import {
  Favorite as IconFavorite,
  FavoriteFilled as IconFavoriteFilled,
} from "@carbon/icons-react";
import styled from "styled-components";
import { usePokemonActions } from "@module/pokemon/hooks/usePokemonActions";
import { InlineLoading } from "carbon-components-react";
import { AnimatedUnmount } from "@module/ui/components/AnimatedUnmount";
import { NotificationContext } from "@module/notification/NotificationContext";

export interface PokemonFavoriteButtonProps {
  pokemon: {
    id: number;
    name: string;
    slug: string;
  };
  size?: number;
  children?: ReactNode;
}

export function PokemonVoteButton({
  pokemon,
  size = 24,
  children,
}: PokemonFavoriteButtonProps) {
  const { user } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);

  const { onVote, onUnVote, unVoteMeta, voteMeta } = usePokemonActions({
    id: pokemon.id,
    slug: pokemon.slug,
  });

  const isLoading = unVoteMeta.loading || voteMeta.loading;

  const isInFavorite = user.voteIds.has(pokemon.id);
  const Icon = isInFavorite ? StyledIconFavoriteFilled : StyledIconFavorite;

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isLoading) {
      return false;
    }

    if (isInFavorite) {
      onUnVote()
        .then(() => {
          addNotification({
            title: `${pokemon.name} has been removed from favorites!`,
          });
        })
        .catch(() => {
          addNotification({
            title: `Failed to remove ${pokemon.name} from your favorites!`,
            type: "error",
          });
        });
    } else {
      onVote()
        .then(() => {
          addNotification({
            title: `${pokemon.name} has been saved to your favorites!`,
          });
        })
        .catch(() => {
          addNotification({
            title: `Failed to add ${pokemon.name} to your favorites!`,
            type: "error",
          });
        });
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      data-cy={`pokemon-${isInFavorite ? "unvote" : "vote"}-button`}
    >
      <Icon size={size as any} />
      <StyledLoaderWrapper>
        <AnimatedUnmount isVisible={isLoading}>
          <InlineLoading status={"active"} data-cy={"pokemon-voting-status"} />
        </AnimatedUnmount>
      </StyledLoaderWrapper>
      {children}
    </StyledButton>
  );
}

const StyledLoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(ButtonComponents.empty)`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 48px;
  gap: 0.5rem;

  &.cds--inline-loading {
    margin: 0;
    flex-shrink: 1;
    flex-grow: 0;
  }
  .cds--inline-loading__animation {
    font-size: 0;
    margin: 0;
  }
`;

const StyledLoadingWrapper = styled.div``;

const StyledIconFavorite = styled(IconFavorite)`
  &:hover {
    fill: ${({ theme }) => theme.colors.iconActive};
  }
`;

const StyledIconFavoriteFilled = styled(IconFavoriteFilled)`
  fill: ${({ theme }) => theme.colors.iconActive};
`;
