import { Pokemon } from "@pokemons/api/dist/graphql";
import { useState } from "react";
import { Search } from "@carbon/icons-react";
import { ButtonComponents } from "@module/ui/components/Button";
import { Modal } from "@module/modal/components/Modal";
import { Content } from "@module/pokemon/modules/detail/components/Content/Content";
import styled from "styled-components";

interface PokemonPreviewProps {
  pokemon: Pokemon;
}

export function PokemonPreview({ pokemon }: PokemonPreviewProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ButtonComponents.empty
        onClick={() => setOpen(true)}
        data-cy={"pokemon-preview-button"}
      >
        <Search />
      </ButtonComponents.empty>
      {isOpen && (
        <Modal
          open
          passiveModal
          modalHeading={pokemon.name}
          hasScrollingContent={false}
          modalLabel="Quick preview"
          onRequestClose={() => setOpen(false)}
          data-cy={"pokemon-preview-modal"}
        >
          <StyledContentWrapper>
            <Content data={pokemon} />
          </StyledContentWrapper>
        </Modal>
      )}
    </>
  );
}

const StyledContentWrapper = styled.div`
  padding-bottom: 1rem;
`;
