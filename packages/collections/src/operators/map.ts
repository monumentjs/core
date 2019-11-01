import { Delegate } from '@monument/core';

export function map<T, R>(self: Iterable<T>, project: Delegate<[T, number], R>): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      let index = 0;

      for (const item of self) {
        yield project(item, index);
        index++;
      }
    }
  };
}
