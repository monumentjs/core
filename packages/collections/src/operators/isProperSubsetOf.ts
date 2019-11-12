import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { containsAll } from './containsAll';
import { isEmpty } from './isEmpty';

export function isProperSubsetOf<T>(self: Iterable<T>, other: Iterable<T>): boolean;
export function isProperSubsetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
export function isProperSubsetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  if (isEmpty(self)) {
    return true;
  }

  return containsAll(other, self, equals) && !containsAll(self, other, equals);
}
