import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';

export function appendIfAbsent<T>(self: Iterable<T>, other: T): Iterable<T>;
export function appendIfAbsent<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function appendIfAbsent<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      let present = false;

      for (const item of self) {
        yield item;

        if (equals(item, other)) {
          present = true;
        }
      }

      if (!present) {
        yield other;
      }
    }
  };
}
