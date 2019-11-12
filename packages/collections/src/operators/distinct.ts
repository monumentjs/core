import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { contains } from './contains';

export function distinct<T>(self: Iterable<T>): Iterable<T>;
export function distinct<T>(self: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function distinct<T>(self: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      const uniqueItems: Array<T> = [];

      for (const item of self) {
        if (!contains(uniqueItems, item, equals)) {
          uniqueItems.push(item);

          yield item;
        }
      }
    }
  };
}
