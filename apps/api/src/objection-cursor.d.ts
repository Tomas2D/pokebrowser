declare module "objection-cursor" {
  import { Model, Page, QueryBuilder } from "objection";

  interface CursorPage<M> {
    pageInfo: {
      hasNext: boolean;
      hasPrevious: boolean;
      previous: string;
      next: string;
    };
    nodes: Array<{
      cursor: string;
      data: M;
    }>;
  }

  export class CustomQueryBuilder<
    M extends Model,
    R = M[]
  > extends QueryBuilder<M, R> {
    ArrayQueryBuilderType!: CustomQueryBuilder<M, M[]>;
    SingleQueryBuilderType!: CustomQueryBuilder<M, M>;
    NumberQueryBuilderType!: CustomQueryBuilder<M, number>;
    PageQueryBuilderType!: CustomQueryBuilder<M, Page<M>>;
    previousCursorPage(
      cursor: string | null | undefined
    ): CustomQueryBuilder<M, CursorPage<M>>;
    cursorPage(
      cursor: string | null | undefined
    ): CustomQueryBuilder<M, CursorPage<M>>;
  }

  function mixin(options: Record<string, any>) {
    return function (Base: typeof Model) {
      return class extends Base {
        static options = options;
        static QueryBuilder = CustomQueryBuilder;
        QueryBuilderType: CustomQueryBuilder<this, this[]>;
      };
    };
  }

  export default mixin;
}
