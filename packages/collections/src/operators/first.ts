import { Delegate } from '@monument/core';

export function first<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>): T | undefined;
export function first<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
export function first<T>(self: Iterable<T>, predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
  let index = 0;

  for (const item of self) {
    if (predicate(item, index)) {
      return item;
    }

    index++;
  }

  return fallback ? fallback() : undefined;
}
