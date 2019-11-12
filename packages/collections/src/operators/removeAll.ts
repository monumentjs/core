import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { contains } from './contains';
import { removeBy } from './removeBy';

export function removeAll<T>(self: Iterable<T>, others: Iterable<T>): Iterable<T>;
export function removeAll<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function removeAll<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return removeBy(self, item => contains(others, item, equals));
}
