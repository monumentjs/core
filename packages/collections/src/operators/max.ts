import { Delegate } from '@monument/core';
import { InvalidOperationException } from '@monument/exceptions';

export function max<T>(self: Iterable<T>, select: Delegate<[T, number], number>): number {
  let result: number = 0;
  let index: number = 0;

  for (const item of self) {
    const value: number = select(item, index);

    if (index === 0) {
      result = value;
    } else {
      result = Math.max(result, value);
    }

    index++;
  }

  if (index === 0) {
    throw new InvalidOperationException('Unable to perform operation on empty iterable.');
  }

  return result;
}
