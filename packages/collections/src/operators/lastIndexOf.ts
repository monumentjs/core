import { argument } from '@monument/assert';
import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { Optional } from '@monument/data';

export function lastIndexOf<T>(self: Iterable<T>, other: T): Optional<number>;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>): Optional<number>;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number): Optional<number>;
export function lastIndexOf<T>(self: Iterable<T>, other: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): Optional<number>;
export function lastIndexOf<T>(
  self: Iterable<T>,
  other: T,
  equals: Delegate<[T, T], boolean> = StrictEquals,
  offset: number = 0,
  limit: number = Infinity
): Optional<number> {
  argument(offset >= 0, `Offset cannot be negative: offset=${offset}`);
  argument(limit >= 0, `Limit cannot be negative: limit=${limit}`);

  if (limit === 0) {
    return Optional.empty();
  }

  let index = 0;
  let itemsLeft = limit;
  let lastIndex: number | undefined;

  for (const item of self) {
    if (index >= offset) {
      if (itemsLeft === 0) {
        break;
      }

      if (equals(item, other)) {
        lastIndex = index;
      }

      itemsLeft--;
    }

    index++;
  }

  return lastIndex != null ? Optional.of(lastIndex) : Optional.empty();
}
