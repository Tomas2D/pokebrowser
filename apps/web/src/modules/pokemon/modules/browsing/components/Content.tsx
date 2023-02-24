import { useContext } from "react";
import { BrowsingView, PokemonContext } from "@module/pokemon/PokemonContext";
import { Grid } from "./views/grid/Grid";
import { List } from "./views/list/List";
import styled from "styled-components";
import { InfiniteList } from "@module/ui/components/InfiniteList";
import { useFetchPokemons } from "@module/pokemon/modules/browsing/hooks/useFetchPokemons";
import { FetchWrapper } from "@app/modules/ui/components/FetchWrapper";
import { useKeyPress } from "@app/hooks/useKeyPress";
import { Block } from "@module/ui/components/Block";
import { Empty } from "@module/ui/components/Empty";
import { Loader } from "@module/ui/components/Loader";
import { ClientOnly } from "@module/core/components/ClientOnly";

const ViewComponentMap = {
  [BrowsingView.GRID]: Grid,
  [BrowsingView.LIST]: List,
} as const;

export function Content() {
  const { browsingView, setBrowsingView } = useContext(PokemonContext);

  const ViewComponent = ViewComponentMap[browsingView];
  const {
    loading,
    isLoadingMore,
    isEmpty,
    error,
    data,
    meta,
    fetchMore,
    pageSize,
  } = useFetchPokemons();

  useKeyPress("Tab", () => {
    const newType =
      browsingView === BrowsingView.LIST
        ? BrowsingView.GRID
        : BrowsingView.LIST;

    setBrowsingView(newType);
  });

  return (
    <FetchWrapper
      isLoading={loading && !isLoadingMore}
      isEmpty={isEmpty}
      error={error}
      LoaderComponent={() => (
        <Block>
          <Loader />
        </Block>
      )}
      EmptyComponent={() => (
        <Block>
          <Empty message={"No pokemons has been found! 😤"} />
        </Block>
      )}
    >
      <StyledInfiniteList
        hasMore={meta?.hasMore}
        inProgress={loading}
        loadMore={fetchMore}
        useWindow
      >
        {!loading && <ViewComponent data={data} />}
        <ClientOnly>
          {(loading || isLoadingMore) && (
            <ViewComponent.Skeleton count={pageSize} />
          )}
        </ClientOnly>
      </StyledInfiniteList>
    </FetchWrapper>
  );
}

const StyledInfiniteList = styled(InfiniteList)`
  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
  }
`;
