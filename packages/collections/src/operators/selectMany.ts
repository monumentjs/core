import { Delegate } from '@monument/core';

export function selectMany<T, I, R>(self: Iterable<T>, select: Delegate<[T, number], Iterable<I>>, combine: Delegate<[T, I], R>): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      let index = 0;

      for (const item of self) {
        const innerItems: Iterable<I> = select(item, index);

        for (const innerItem of innerItems) {
          yield combine(item, innerItem);
        }

        index++;
      }
    }
  };
}
