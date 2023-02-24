import { createContext, ReactNode, useMemo } from "react";
import { User } from "@pokemons/api/graphql";
import { useFetchCurrentUser } from "@module/user/hooks/useFetchCurrentUser";

interface IUserContext {
  user: Omit<User, "voteIds"> & { voteIds: Set<number> };
}

const defaultValue: IUserContext = {
  user: {
    id: "",
    voteIds: new Set<number>(),
  },
};

export const UserContext = createContext<IUserContext>(defaultValue);

interface PokemonContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({
  children,
}: PokemonContextProviderProps) => {
  const { data } = useFetchCurrentUser();
  const user: IUserContext = useMemo(() => {
    if (data) {
      return {
        user: {
          ...data,
          voteIds: new Set<number>(data.voteIds),
        },
      };
    }
    return defaultValue;
  }, [data]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
