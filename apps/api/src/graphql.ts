import {
  NexusGenFieldTypes,
  NexusGenInputs,
} from "./graphql/generated/typings";

export type {
  NexusGenObjects,
  NexusGenInputs,
} from "./graphql/generated/typings";

export type Pokemon = Required<NexusGenFieldTypes["Pokemon"]>;
export type PokemonMeta = Required<NexusGenFieldTypes["ListPokemonMeta"]>;
export type User = Required<NexusGenFieldTypes["User"]>;
export type Attack = NexusGenFieldTypes["Attack"];
export type EvolutionRequirement = NexusGenFieldTypes["EvolutionRequirement"];
export type Height = NexusGenFieldTypes["Height"];
export type Weight = NexusGenFieldTypes["Weight"];
export type Type = NexusGenFieldTypes["PokemonType"];
export type PokemonFilters = NexusGenInputs["ListPokemonFilters"];
