import { Delegate } from '@monument/core';

export function count<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): number {
  let total = 0;
  let index = 0;

  for (const item of self) {
    if (predicate(item, index)) {
      total++;
    }

    index++;
  }

  return total;
}
