import type { FieldNode, SelectionNode } from "graphql";
import * as console from "console";

function* browseQueryFields(
  fieldNodes: FieldNode[] | ReadonlyArray<FieldNode>,
  prefix = ""
): IterableIterator<string> {
  for (const fieldNode of fieldNodes) {
    const selectionSet: ReadonlyArray<SelectionNode> =
      fieldNode.selectionSet?.selections!;

    for (const node of selectionSet || []) {
      let currentValue = (node as FieldNode).name.value;
      if (currentValue) {
        const value = [prefix, currentValue].filter(Boolean).join(".");
        yield value;
      }

      if ((node as FieldNode).selectionSet) {
        yield* browseQueryFields(
          [node as FieldNode],
          [prefix, currentValue].filter(Boolean).join(".")
        );
      }
    }
  }
}

export function extractRelationsFactory(relations: Record<string, string>) {
  return (
    fieldNodes: FieldNode[] | ReadonlyArray<FieldNode>,
    ignoredPrefix = ""
  ) => {
    const baseRelations = new Set(Object.values(relations));

    const relationPaths: string[] = [];

    for (let fieldNode of browseQueryFields(fieldNodes)) {
      if (fieldNode.startsWith(ignoredPrefix)) {
        fieldNode = fieldNode.replace(ignoredPrefix, "");
      }

      const parts = fieldNode.split(".");
      if (parts.some((part) => !baseRelations.has(part))) {
        continue;
      }
      relationPaths.push(fieldNode);
    }

    return relationPaths;
  };
}
