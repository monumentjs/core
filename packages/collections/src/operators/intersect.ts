import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { contains } from './contains';
import { filter } from './filter';

export function intersect<T>(self: Iterable<T>, others: Iterable<T>): Iterable<T>;
export function intersect<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function intersect<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return filter(self, item => contains(others, item, equals));
}
