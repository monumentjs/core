import { argument } from '@monument/assert';
import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';

export function indexOf<T>(self: Iterable<T>, other: T): number | undefined;
export function indexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>): number | undefined;
export function indexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
export function indexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
export function indexOf<T>(
  self: Iterable<T>,
  other: T,
  equals: Delegate<[T, T], boolean> = StrictEquals,
  offset: number = 0,
  limit: number = Infinity
): number | undefined {
  argument(offset >= 0, `Offset cannot be negative: offset=${offset}`);
  argument(limit >= 0, `Limit cannot be negative: limit=${limit}`);

  if (limit === 0) {
    return;
  }

  let index = 0;
  let itemsLeft = limit;

  for (const item of self) {
    if (index >= offset) {
      if (itemsLeft === 0) {
        break;
      }

      if (equals(item, other)) {
        return index;
      }

      itemsLeft--;
    }

    index++;
  }
}
