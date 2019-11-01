import { Delegate } from '@monument/core';

export function findIndex<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): number | undefined {
  let index = 0;

  for (const item of self) {
    if (predicate(item, index)) {
      return index;
    }

    index++;
  }
}
