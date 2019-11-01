import { Delegate } from '@monument/core';
import { slice } from './slice';
import { filter } from './filter';

export function findAll<T>(
  self: Iterable<T>,
  predicate: Delegate<[T, number], boolean>,
  offset: number = 0,
  limit: number = Infinity
): Iterable<T> {
  return slice(filter(self, predicate), offset, limit);
}
