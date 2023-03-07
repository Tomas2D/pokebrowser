import { Layout } from "@module/ui/components/Layout";
import { PokemonDetail } from "@app/modules/pokemon/modules/detail/components/PokemonDetail";
import { useRouter } from "next/router";
import { PageContent } from "@module/ui/components/PageContent";
import { WelcomeHeader } from "@module/ui/components/WelcomeHeader";
import { addApolloState, initializeApollo } from "@module/core/apolloClient";
import type { GetStaticPropsContext } from "next";
import { FETCH_POKEMON_BY_SLUG_QUERY } from "@module/pokemon/modules/detail/hook/useFetchPokemon";
import { gql } from "@apollo/client";
import { Pokemon } from "@pokemons/api/graphql";

export default function PokemonDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <PageContent>
        <WelcomeHeader />
        <PokemonDetail slug={slug as string} />
      </PageContent>
    </Layout>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{
    listPokemon: { edges: Array<{ node: Pick<Pokemon, "slug"> }> };
  }>({
    query: gql`
      query ssrListPokemonSlugs {
        listPokemon(filters: {}, first: 1000, after: "") {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
    variables: { filters: {} },
  });

  return {
    paths: data.listPokemon.edges.map(({ node }) => ({
      params: {
        slug: node.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FETCH_POKEMON_BY_SLUG_QUERY,
    variables: { slug: params!.slug },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 30,
  });
}
