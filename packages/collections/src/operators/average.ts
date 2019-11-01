import { Delegate } from '@monument/core';
import { InvalidOperationException } from '@monument/exceptions';
import { sum } from './sum';

export function average<T>(self: Iterable<T>, select: Delegate<[T, number], number>): number {
  let count = 0;
  const total = sum(self, item => select(item, ++count));

  if (count === 0) {
    throw new InvalidOperationException(`Operation is not allowed for empty source.`);
  }

  return total / count;
}
