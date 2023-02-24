export function assertSingleValue<TValue extends object>(
  value: TValue | AsyncIterable<TValue>
): asserts value is TValue {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}

export function sortById<T extends { id: number }>(arr: T[]) {
  arr.sort((a, b) => a.id - b.id);
}
