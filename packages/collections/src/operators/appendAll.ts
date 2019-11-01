
export function appendAll<T>(self: Iterable<T>, items: Iterable<T>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* self;
      yield* items;
    }
  };
}
