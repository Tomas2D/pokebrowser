import { Model, ModelClass } from "objection";

export function getRelationPrimaryKey(
  model: Model | ModelClass<Model>,
  relationName: string
) {
  const modelClass = model instanceof Model ? model.$modelClass : model;
  const relation = modelClass.getRelation(relationName);

  return relation.relatedModelClass.ref(
    relation.relatedModelClass.idColumn as string
  );
}
