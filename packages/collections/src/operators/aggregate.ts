import { Delegate } from '@monument/core';

export function aggregate<T, R>(self: Iterable<T>, project: Delegate<[R, T, number], R>, initialSeed: R): R {
  let lastSeed: R = initialSeed;
  let index: number = 0;

  for (const item of self) {
    lastSeed = project(lastSeed, item, index);

    index++;
  }

  return lastSeed;
}
