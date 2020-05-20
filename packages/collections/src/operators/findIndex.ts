import { Delegate } from '@monument/core';
import { Optional } from '@monument/data';

export function findIndex<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): Optional<number> {
  let index = 0;

  for (const item of self) {
    if (predicate(item, index)) {
      return Optional.of(index);
    }

    index++;
  }

  return Optional.empty();
}
