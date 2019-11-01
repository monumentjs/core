/**
 * Produces empty iterable
 * @author Alex Chugaev
 * @since 0.16.0
 */
export function empty<T>(): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      // Nothing
    }
  };
}
