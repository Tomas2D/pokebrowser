import { ThemeProvider } from "./ThemeProvider";
import { ReactNode } from "react";
import { useApollo } from "@module/core/apolloClient";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "@app/modules/user/UserContext";
import { PokemonContextProvider } from "@module/pokemon/PokemonContext";

interface CoreProps extends Pick<AppProps, "pageProps"> {
  children?: ReactNode;
}

export function Core({ children, pageProps }: CoreProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <UserContextProvider>
          <PokemonContextProvider>{children}</PokemonContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
