import { argument } from '@monument/assert';

export function slice<T>(self: Iterable<T>, offset: number, limit: number): Iterable<T> {
  argument(offset >= 0, `Offset cannot be negative: offset=${offset}`);
  argument(limit >= 0, `Limit cannot be negative: limit=${limit}`);

  return {
    * [Symbol.iterator](): Iterator<T> {
      let index = 0;
      let itemsLeft = limit;

      for (const item of self) {
        if (index >= offset) {
          if (itemsLeft === 0) {
            break;
          }

          yield item;

          itemsLeft--;
        }

        index++;
      }
    }
  };
}
