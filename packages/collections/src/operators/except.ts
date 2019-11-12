import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { contains } from './contains';
import { distinct } from './distinct';

export function except<T>(self: Iterable<T>, excluded: Iterable<T>): Iterable<T>;
export function except<T>(self: Iterable<T>, excluded: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function except<T>(self: Iterable<T>, excluded: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      const selfSet = distinct(self, equals);
      const excludedSet = distinct(excluded, equals);

      for (const item of selfSet) {
        if (!contains(excludedSet, item, equals)) {
          yield item;
        }
      }
    }
  };
}
