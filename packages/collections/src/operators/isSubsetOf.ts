import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { containsAll } from './containsAll';
import { isEmpty } from './isEmpty';

export function isSubsetOf<T>(self: Iterable<T>, other: Iterable<T>): boolean;
export function isSubsetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
export function isSubsetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  if (isEmpty(self)) {
    return true;
  }

  return containsAll(other, self, equals);
}
