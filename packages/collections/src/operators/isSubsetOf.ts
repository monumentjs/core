import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { containsAll } from './containsAll';
import { isEmpty } from './isEmpty';

export function isSubsetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  if (isEmpty(self)) {
    return true;
  }

  return containsAll(other, self, equals);
}
