import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';

export function contains<T>(self: Iterable<T>, candidate: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  for (const item of self) {
    if (equals(item, candidate)) {
      return true;
    }
  }

  return false;
}
