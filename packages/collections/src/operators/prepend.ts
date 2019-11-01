export function prepend<T>(self: Iterable<T>, item: T): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield item;
      yield* self;
    }
  };
}
