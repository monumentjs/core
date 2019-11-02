import { Delegate } from '@monument/core';

export function filter<T, R = T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      let index = 0;

      for (const item of self) {
        if (predicate(item, index)) {
          yield item as any;
        }

        index++;
      }
    }
  };
}
