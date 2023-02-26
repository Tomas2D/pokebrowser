import { ThemeProvider } from "./ThemeProvider";
import { ReactNode } from "react";
import { useApollo } from "@module/core/apolloClient";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "@app/modules/user/UserContext";
import { PokemonContextProvider } from "@module/pokemon/PokemonContext";
import { NotificationContextProvider } from "@module/notification/NotificationContext";
import { NotificationList } from "@module/notification/components/NotificationList";

interface CoreProps extends Pick<AppProps, "pageProps"> {
  children?: ReactNode;
}

export function Core({ children, pageProps }: CoreProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <NotificationContextProvider>
          <UserContextProvider>
            <PokemonContextProvider>
              <>
                <NotificationList />
                {children}
              </>
            </PokemonContextProvider>
          </UserContextProvider>
        </NotificationContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
