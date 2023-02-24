import { Search as CarbonSearch } from "carbon-components-react";
import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { PokemonContext } from "@module/pokemon/PokemonContext";

export function SearchFilter() {
  const { filters, setFilters } = useContext(PokemonContext);

  const value = filters.name;
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    setCurrentValue(value ?? "");
  }, [value]);

  const handleSearchChange = useCallback(
    (name: string) => {
      setFilters((oldFilters: typeof filters) => ({
        ...oldFilters,
        name,
      }));
    },
    [setFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = useCallback(debounce(handleSearchChange, 1_000), [
    handleSearchChange,
  ]);

  useEffect(() => {
    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedHandler]);

  return (
    <CarbonSearch
      data-cy={"pokemon-search"}
      size={"md"}
      name={"search"}
      type={"text"}
      labelText={"Search"}
      placeholder={"Enter a pokemon name!"}
      role={"searchbox"}
      value={currentValue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          debouncedHandler.flush();
        }
      }}
      onChange={(e) => {
        const value = e.target.value?.trim();

        debouncedHandler(value);
        setCurrentValue(value);

        if (value === "") {
          debouncedHandler.flush();
        }
      }}
    />
  );
}
