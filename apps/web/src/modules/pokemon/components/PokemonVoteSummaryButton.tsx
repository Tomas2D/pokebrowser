import styled from "styled-components";
import {
  PokemonVoteButton,
  PokemonFavoriteButtonProps,
  StyledButton,
} from "./PokemonVoteButton";

interface PokemonVoteSummaryButtonProps extends PokemonFavoriteButtonProps {
  totalVotes: number;
}

export function PokemonVoteSummaryButton({
  totalVotes,
  ...props
}: PokemonVoteSummaryButtonProps) {
  return (
    <StyledWrapper>
      <PokemonVoteButton {...props}>{totalVotes}</PokemonVoteButton>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ${StyledButton} {
    border-radius: 4px;
    font-size: 1.5rem;
  }
`;
