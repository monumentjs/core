
export function length<T>(self: Iterable<T>): number {
  let count = 0;

  for (const _ of self) {
    count++;
  }

  return count;
}
