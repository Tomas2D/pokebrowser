import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { NexusGenInputs } from "@pokemons/api/graphql";
import { nop } from "rambda";

export enum BrowsingView {
  GRID,
  LIST,
}

export type PokemonFilters = NexusGenInputs["ListPokemonFilters"];
export type PokemonPagination = {
  size: number;
};

interface IPokemonContext {
  browsingView: BrowsingView;
  setBrowsingView: (view: BrowsingView) => void;
  setFilters: Dispatch<SetStateAction<PokemonFilters>>;
  setPagination: Dispatch<SetStateAction<PokemonPagination>>;
  filters: PokemonFilters;
  pagination: PokemonPagination;
}

export const defaultPokemonContext: IPokemonContext = {
  browsingView: BrowsingView.GRID,
  setBrowsingView: nop,
  setFilters: nop,
  setPagination: nop,
  filters: {
    favorite: false,
  },
  pagination: {
    size: 10,
  },
} as const;

export const PokemonContext = createContext<IPokemonContext>(
  defaultPokemonContext
);

interface PokemonContextProviderProps {
  children: ReactNode;
}

export const PokemonContextProvider = ({
  children,
}: PokemonContextProviderProps) => {
  const [browsingView, setBrowsingView] = useState<BrowsingView>(
    defaultPokemonContext.browsingView
  );

  const [filters, setFilters] = useState<PokemonFilters>(
    defaultPokemonContext.filters
  );

  const [pagination, setPagination] = useState<PokemonPagination>(
    defaultPokemonContext.pagination
  );

  return (
    <PokemonContext.Provider
      value={{
        ...defaultPokemonContext,
        browsingView,
        setBrowsingView,
        filters,
        setFilters,
        pagination,
        setPagination,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
