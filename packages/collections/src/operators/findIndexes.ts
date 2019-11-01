import { Delegate } from '@monument/core';

export function findIndexes<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): Iterable<number> {
  return {
    * [Symbol.iterator](): Iterator<number> {
      let index = 0;

      for (const item of self) {
        if (predicate(item, index)) {
          yield index;
        }

        index++;
      }
    }
  };
}
