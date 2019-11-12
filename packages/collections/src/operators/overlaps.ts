import { Delegate } from '@monument/core';
import { contains } from './contains';
import { isEmpty } from './isEmpty';

export function overlaps<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean {
  if (isEmpty(self)) {
    return false;
  }

  for (const item of other) {
    if (contains(self, item, equals)) {
      return true;
    }
  }

  return false;
}
