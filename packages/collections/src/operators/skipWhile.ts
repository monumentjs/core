import { Delegate } from '@monument/core';

export function skipWhile<T>(self: Iterable<T>, condition: Delegate<[T, number], boolean>): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      let skip: boolean = true;
      let index = 0;

      for (const item of self) {
        if (skip) {
          skip = condition(item, index);
        }

        if (!skip) {
          yield item;
        }

        index++;
      }
    }
  };
}
