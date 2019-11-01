export function reverse<T>(self: Iterable<T>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* [...self].reverse();
    }
  };
}
