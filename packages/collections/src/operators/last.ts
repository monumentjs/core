import { Delegate } from '@monument/core';

export function last<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): T | undefined;
export function last<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
export function last<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
  let lastItem: T | undefined;
  let itemFound: boolean = false;
  let index = 0;

  for (const item of self) {
    if (predicate(item, index)) {
      lastItem = item;
      itemFound = true;
    }

    index++;
  }

  return itemFound ? lastItem : fallback ? fallback() : undefined;
}
