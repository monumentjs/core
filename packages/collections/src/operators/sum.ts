import { Delegate } from '@monument/core';
import { InvalidOperationException } from '@monument/exceptions';
import { aggregate } from './aggregate';

export function sum<T>(self: Iterable<T>, select: Delegate<[T, number], number>): number {
  let count = 0;

  const total = aggregate(self, (acc, item) => {
    return acc + select(item, ++count);
  }, 0);

  if (count === 0) {
    throw new InvalidOperationException(`Operation is not allowed for empty iterable`);
  }

  return total;
}
