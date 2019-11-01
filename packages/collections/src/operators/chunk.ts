import { argument } from '@monument/assert';

export function chunk<T>(self: Iterable<T>, size: number = 1): Iterable<Iterable<T>> {
  argument(size >= 1);

  return {
    * [Symbol.iterator](): Iterator<Iterable<T>> {
      let itemsLeft: number = size;
      let items: Array<T> = [];

      for (const _item of self) {
        items.push(_item);
        itemsLeft--;

        if (itemsLeft === 0) {
          yield items;
          itemsLeft = size;
          items = [];
        }
      }

      if (items.length > 0) {
        yield items;
      }
    }
  };
}
