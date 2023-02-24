import styled from "styled-components";
import { Header } from "./Header";
import { useFetchPokemon } from "@module/pokemon/modules/detail/hook/useFetchPokemon";
import { Content } from "./Content/Content";

interface PokemonDetailProps {
  slug: string;
}

export function PokemonDetail({ slug }: PokemonDetailProps) {
  const { data, isEmpty } = useFetchPokemon(slug);

  return (
    <StyledWrapper>
      {data && (
        <>
          <Header data={data} />
          <Content data={data} />
        </>
      )}
      {!data && <Header.Skeleton isEmpty={isEmpty} />}
      {isEmpty && <Content.Empty />}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 1rem;
`;
