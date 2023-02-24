import { Select, SelectItem } from "carbon-components-react";
import { useFetchPokemonTypes } from "@module/pokemon/hooks/useFetchPokemonTypes";
import { ChangeEventHandler, useContext } from "react";
import { PokemonContext } from "@module/pokemon/PokemonContext";

export const SELECTED_ALL_VALUE = 0;

export function TypeFilter() {
  const { filters, setFilters } = useContext(PokemonContext);
  const selectedValue = String(filters.typeId?.[0] || SELECTED_ALL_VALUE);

  const { data, loading, isEmpty, error } = useFetchPokemonTypes();
  const isDisabled = Boolean(loading || error || isEmpty);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (el) => {
    const selectedValue = el.currentTarget.selectedOptions[0].value;
    setFilters({
      ...filters,
      typeId: [parseInt(selectedValue)].filter(Boolean),
    });
  };

  return (
    <Select
      id={"pokemons-type"}
      data-cy={"pokemons-type-select"}
      value={selectedValue}
      multiple={false}
      onChange={handleChange}
      size={"md"}
      disabled={isDisabled}
      hideLabel
    >
      <SelectItem value={SELECTED_ALL_VALUE} text={"All Types"} />
      {data.map((type) => (
        <SelectItem key={type.id!} value={type!.id} text={type!.name!} />
      ))}
    </Select>
  );
}
