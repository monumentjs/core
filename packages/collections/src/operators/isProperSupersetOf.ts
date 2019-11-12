import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { containsAll } from './containsAll';

export function isProperSupersetOf<T>(self: Iterable<T>, other: Iterable<T>): boolean;
export function isProperSupersetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
export function isProperSupersetOf<T>(self: Iterable<T>, other: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  const _self = [...self];
  const _other = [...other];

  if (_other.length === 0) {
    return true;
  }

  if (_self.length <= _other.length) {
    return false;
  }

  return containsAll(_self, _other, equals) && !containsAll(_other, _self, equals);
}
