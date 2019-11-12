import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { concat } from './concat';
import { distinct } from './distinct';

export function union<T>(self: Iterable<T>, others: Iterable<T>): Iterable<T>;
export function union<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean>): Iterable<T>;
export function union<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return distinct(concat(self, [others]), equals);
}
