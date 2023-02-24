import { Layout } from "@module/ui/components/Layout";
import { PokemonBrowsing } from "@module/pokemon/modules/browsing/components/PokemonBrowsing";
import { WelcomeHeader } from "@app/modules/ui/components/WelcomeHeader";
import { PageContent } from "@module/ui/components/PageContent";
import { addApolloState, initializeApollo } from "@module/core/apolloClient";
import { FETCH_POKEMONS_QUERY } from "@module/pokemon/modules/browsing/hooks/useFetchPokemons";
import { defaultPokemonContext } from "@module/pokemon/PokemonContext";

export default function Homepage() {
  return (
    <Layout>
      <PageContent>
        <WelcomeHeader />
        <PokemonBrowsing />
      </PageContent>
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FETCH_POKEMONS_QUERY,
    variables: {
      filters: defaultPokemonContext.filters,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 30,
  });
}
