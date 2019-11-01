import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { contains } from './contains';

export function intersect<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      for (const item of self) {
        if (contains(others, item, equals)) {
          yield item;
        }
      }
    }
  };
}
