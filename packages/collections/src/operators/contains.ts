import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';

export function contains<T>(self: Iterable<T>, candidate: T): boolean;
export function contains<T>(self: Iterable<T>, candidate: T, equals: Delegate<[T, T], boolean>): boolean;
export function contains<T>(self: Iterable<T>, candidate: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
  for (const item of self) {
    if (equals(item, candidate)) {
      return true;
    }
  }

  return false;
}
