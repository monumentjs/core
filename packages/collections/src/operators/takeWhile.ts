import { Delegate } from '@monument/core';

export function takeWhile<T>(self: Iterable<T>, condition: Delegate<[T, number], boolean>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      let index = 0;

      for (const item of self) {
        if (!condition(item, index)) {
          break;
        }

        yield item;

        index++;
      }
    }
  };
}
