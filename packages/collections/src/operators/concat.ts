
export function concat<T>(self: Iterable<T>, others: Iterable<Iterable<T>>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* self;

      for (const other of others) {
        yield* other;
      }
    }
  };
}
