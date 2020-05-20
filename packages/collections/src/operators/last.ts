import { Optional } from '@monument/data';

export function last<T>(self: Iterable<T>): Optional<T> {
  let lastItem!: T;
  let itemFound: boolean = false;

  for (const item of self) {
    lastItem = item;
    itemFound = true;
  }

  return itemFound ? Optional.of(lastItem) : Optional.empty();
}
