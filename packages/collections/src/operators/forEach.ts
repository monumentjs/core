import { Delegate } from '@monument/core';

export function forEach<T>(self: Iterable<T>, consume: Delegate<[T, number], boolean | void>): void {
  let index = 0;

  for (const item of self) {
    const result: boolean | void = consume(item, index);

    if (result === false) {
      return;
    }

    index++;
  }
}
