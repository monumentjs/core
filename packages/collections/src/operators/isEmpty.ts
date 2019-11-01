
export function isEmpty<T>(self: Iterable<T>): boolean {
  return self[Symbol.iterator]().next().done || false;
}
