
export function prependAll<T>(self: Iterable<T>, items: Iterable<T>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* items;
      yield* self;
    }
  };
}
