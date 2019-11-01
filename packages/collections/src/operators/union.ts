import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { distinct } from './distinct';
import { concat } from './concat';

export function union<T>(self: Iterable<T>, others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Iterable<T> {
  return distinct(concat(self, [others]), equals);
}
