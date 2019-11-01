import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';

export function equals<T>(self: Iterable<T>, other: Iterable<T>, _equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  if (self === other) {
    return true;
  }

  const selfIterator: Iterator<T> = self[Symbol.iterator]();
  const otherIterator: Iterator<T> = other[Symbol.iterator]();

  let self$ = selfIterator.next();
  let other$ = otherIterator.next();

  for (; !self$.done && !other$.done; self$ = selfIterator.next(), other$ = otherIterator.next()) {
    if (!_equals(self$.value, other$.value)) {
      return false;
    }
  }

  return self$.done === other$.done;
}
