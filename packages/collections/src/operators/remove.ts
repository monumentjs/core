import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { removeBy } from './removeBy';

export function remove<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return removeBy(self, item => equals(item, other));
}
