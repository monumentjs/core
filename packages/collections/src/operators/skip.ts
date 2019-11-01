import { argument } from '@monument/assert';

export function skip<T>(self: Iterable<T>, offset: number): Iterable<T> {
  argument(offset >= 0, `Offset cannot be negative: offset=${offset}`);

  return {
    * [Symbol.iterator](): Iterator<T> {
      let index: number = 0;

      for (const item of self) {
        if (index >= offset) {
          yield item;
        }

        index++;
      }
    }
  };
}
