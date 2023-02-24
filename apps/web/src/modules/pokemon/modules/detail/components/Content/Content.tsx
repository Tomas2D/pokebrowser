import styled, { keyframes } from "styled-components";
import { Pokemon } from "@pokemons/api/graphql";
import { ResponsiveImage } from "@module/ui/components/ResponsiveImage";
import { getPokemonPreviewImage } from "@module/pokemon/utils";
import {
  SkeletonPlaceholder,
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
} from "carbon-components-react";
import { PlaySound } from "@module/pokemon/modules/detail/components/PlaySound";
import { Block } from "@module/ui/components/Block";
import { TagsSection } from "@module/pokemon/modules/detail/components/Content/TagsSection";
import { Evolution } from "./Evolution/Evolution";
import { SectionTitle } from "@app/modules/ui/components/SectionTitle";
import { Paragraph } from "@module/ui/components/Paragraph";
import Title from "@module/ui/components/Title";

interface ContentProps {
  data: Pokemon;
}

export function Content({ data }: ContentProps) {
  return (
    <StyledWrapper>
      <StyledLeftWrapper>
        <StyledImageWrapper>
          <StyledPokemonImage
            data-cy={"pokemon-main-image"}
            src={getPokemonPreviewImage(data.slug)}
            LoadingComponent={<StyledImageSkeleton />}
          />
          <StyledMusicButtonWrapper>
            <PlaySound id={data.id} />
          </StyledMusicButtonWrapper>
        </StyledImageWrapper>

        <Evolution data={data} />
      </StyledLeftWrapper>
      <StyledRightWrapper>
        <Block data-cy={"general-info-wrapper"}>
          <SectionTitle>General Info</SectionTitle>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Pellentesque arcu. Morbi scelerisque luctus velit. Nullam at arcu a
            est sollicitudin euismod.
          </Paragraph>

          <StyledInlineWrapper>
            <Block>
              <StyledListWrapper>
                <StructuredListWrapper isCondensed>
                  <StructuredListBody>
                    {[
                      [
                        "Weight",
                        `${data.weight.minimum}\u00A0kg\u00A0-\u00A0${data.weight.maximum}\u00A0kg`,
                      ],
                      [
                        "Height",
                        `${data.height.minimum}\u00A0cm\u00A0-\u00A0${data.height.maximum}\u00A0cm`,
                      ],
                      ["Max Health", data.maxHp],
                      ["Combat Power", data.maxCp],
                      ["Flee Rate", data.fleeRate],
                    ].map(([title, number], i) => (
                      <StructuredListRow key={i}>
                        <StructuredListCell>
                          <strong>{title}</strong>
                        </StructuredListCell>
                        <StructuredListCell>{number}</StructuredListCell>
                      </StructuredListRow>
                    ))}
                  </StructuredListBody>
                </StructuredListWrapper>
              </StyledListWrapper>
            </Block>

            {data.evolutionRequirement && (
              <Block>
                <StyledListWrapper>
                  <StructuredListWrapper isCondensed>
                    <StructuredListBody>
                      {[
                        ["Next Evolution", data.nextEvolution?.name || "–"],
                        ["-> name", data.evolutionRequirement.name],
                        ["-> amount", data.evolutionRequirement.amount],
                        [
                          "Previous Evolution",
                          data.previousEvolution?.name || "–",
                        ],
                      ].map(([title, number], i) => (
                        <StructuredListRow key={i}>
                          <StructuredListCell>
                            <strong>{title}</strong>
                          </StructuredListCell>
                          <StructuredListCell>{number}</StructuredListCell>
                        </StructuredListRow>
                      ))}
                    </StructuredListBody>
                  </StructuredListWrapper>
                </StyledListWrapper>
              </Block>
            )}

            <Block>
              <TagsSection
                title={"Type"}
                tagType={"green"}
                data={data.types}
                tooltipLabel={(item) => `ID: ${item.id}`}
              />

              <TagsSection
                title={"Weaknesses"}
                tagType={"teal"}
                data={data.weaknesses}
                tooltipLabel={(item) => `ID: ${item.id}`}
              />
            </Block>
          </StyledInlineWrapper>
        </Block>

        <Block data-cy={"attacks-wrapper"}>
          <SectionTitle>Attacks</SectionTitle>
          <Paragraph>
            {data.commonCaptureArea ||
              `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Pellentesque arcu. Morbi scelerisque luctus velit. Nullam at arcu a
            est sollicitudin euismod. Ut tempus purus at lorem. Maecenas ipsum
            velit, consectetuer eu lobortis ut, dictum at dui. Nullam dapibus
            fermentum ipsum. Curabitur bibendum justo non orci. Donec iaculis
            gravida nulla. Vestibulum fermentum tortor id mi. Sed ac dolor sit
            amet purus malesuada congue.`}
          </Paragraph>

          <StyledInlineWrapper>
            <TagsSection
              title={"Fast"}
              tagType={"red"}
              tooltipLabel={(attack) => `Damage: ${attack.damage}`}
              data={data.attacks.filter(({ category }) => category === "fast")}
            />

            <TagsSection
              title={"Special"}
              tagType={"purple"}
              tooltipLabel={(attack) => `Damage: ${attack.damage}`}
              data={data.attacks.filter(
                ({ category }) => category === "special"
              )}
            />
          </StyledInlineWrapper>
        </Block>
      </StyledRightWrapper>
    </StyledWrapper>
  );
}

Content.Empty = function Empty() {
  return (
    <StyledWrapper data-cy={"empty-wrapper"}>
      <Title level={"h2"}>
        The Pokemon you are looking for is one we do not have, sorry 😭
      </Title>
    </StyledWrapper>
  );
};

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

const StyledImageWrapper = styled.div`
  position: relative;
`;

const StyledPokemonImage = styled(ResponsiveImage)`
  max-width: 40rem;
  max-height: 30rem;
  height: auto;
  object-fit: contain;
  object-position: center;
  margin: auto;

  animation-duration: 1s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;

  &:hover {
    animation-name: ${bounceKeyframe};
  }
`;

const StyledListWrapper = styled.div`
  display: flex;
  width: auto;
`;

const StyledMusicButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    top: -1rem;
    left: -1rem;
  }
`;

const StyledImageSkeleton = styled(SkeletonPlaceholder)`
  display: flex;
  height: 225px;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  gap: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: calc(60% - 2rem);
  }
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: calc(40% - 2rem);
    flex-shrink: 0;
  }
`;

const StyledWrapper = styled.main`
  background: ${({ theme }) => theme.colors.neutral};
  justify-content: space-between;
  width: 100%;
  display: flex;
  z-index: 2;
  position: sticky;
  flex-wrap: wrap;
  top: 0;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: 1rem;
  gap: 2rem;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    flex-direction: row;
    padding: 2rem;
    gap: 2rem;
  }
`;

const StyledInlineWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  flex-wrap: wrap;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    flex-direction: row;
  }
`;
