
export function append<T>(self: Iterable<T>, item: T): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* self;
      yield item;
    }
  };
}
