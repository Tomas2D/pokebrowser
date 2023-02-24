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

interface IPokemonContext {
  browsingView: BrowsingView;
  setBrowsingView: (view: BrowsingView) => void;
  setFilters: Dispatch<SetStateAction<PokemonFilters>>;
  filters: PokemonFilters;
}

export const defaultPokemonContext: IPokemonContext = {
  browsingView: BrowsingView.GRID,
  setBrowsingView: nop,
  setFilters: nop,
  filters: {
    size: 10,
    favorite: false,
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

  return (
    <PokemonContext.Provider
      value={{
        ...defaultPokemonContext,
        browsingView,
        setBrowsingView,
        filters,
        setFilters,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
