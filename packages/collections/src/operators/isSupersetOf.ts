import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { containsAll } from './containsAll';
import { distinct } from './distinct';

export function isSupersetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  const _self = [...distinct(self, equals)];
  const _other = [...distinct(other, equals)];

  if (_other.length === 0) {
    return true;
  }

  if (_self.length < _other.length) {
    return false;
  }

  return containsAll(_self, _other, equals);
}
