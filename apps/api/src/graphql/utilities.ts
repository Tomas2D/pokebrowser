import type { SelectionNode } from "graphql";
import { FieldNode, InlineFragmentNode } from "graphql/language/ast";
import { PokemonRelations } from "@app/database/models/PokemonModel";
import { curry } from "rambda";

export const typedResolver = <T, K extends any[], L>(
  fn: (root: T, ...params: K) => L
) => {
  return (root: any, ...params: K) => fn(root, ...params);
};

export function hasField(fieldNodes: FieldNode[], fieldName: string) {
  const lookup = (selectionSet: ReadonlyArray<SelectionNode>) => {
    for (const node of selectionSet || []) {
      if ((node as FieldNode).name.value === fieldName) {
        return true;
      }

      if (
        (node as FieldNode).selectionSet &&
        lookup((node as InlineFragmentNode).selectionSet.selections)
      ) {
        return true;
      }
    }

    return false;
  };

  return fieldNodes.some((fieldNode) =>
    lookup(fieldNode.selectionSet?.selections!)
  );
}

export function pickFirstKey<T>(obj: Record<string, any> = {}): T {
  for (const key of Object.keys(obj || {})) {
    return obj[key];
  }
  throw new Error(`Invalid record!`);
}

export function extraPokemonRelations(fieldNodes: ReadonlyArray<FieldNode>) {
  const baseRelations = Object.values(PokemonRelations);
  return [
    ...baseRelations,
    ...baseRelations.map((relation) => `${relation}.${relation}`),
  ].filter(curry(hasField)(fieldNodes));
}
