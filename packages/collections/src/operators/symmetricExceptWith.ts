import { Delegate } from '@monument/core';
import { contains } from './contains';

export function symmetricExceptWith<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T> {
  return {
    * [Symbol.iterator]() {
      for (const item of self) {
        if (!contains(other, item, equals)) {
          yield item;
        }
      }

      for (const item of other) {
        if (!contains(self, item, equals)) {
          yield item;
        }
      }
    }
  };
}
