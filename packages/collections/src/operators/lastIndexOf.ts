import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { slice } from './slice';
import { entries } from './entries';
import { KeyValuePair } from '../../index';
import { last } from './last';

export function lastIndexOf<T>(self: Iterable<T>, other: T): number | undefined;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>): number | undefined;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
export function lastIndexOf<T>(
  self: Iterable<T>,
  other: T,
  equals: Delegate<[T, T], boolean> = StrictEquals,
  offset: number = 0,
  limit: number = Infinity
): number | undefined {
  const _entries: Iterable<KeyValuePair<number, T>> = entries(self, (item, index) => [index, item]);
  const _slice: Iterable<KeyValuePair<number, T>> = slice(_entries, offset, limit);
  const _result = last(_slice, ([, item]) => equals(item, other));

  return _result ? _result[0] : undefined;
}
