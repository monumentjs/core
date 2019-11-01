import { argument } from '@monument/assert';

export function take<T>(self: Iterable<T>, limit: number): Iterable<T> {
  argument(limit >= 0, `Limit cannot be negative: limit=${limit}`);

  return {
    * [Symbol.iterator](): Iterator<T> {
      let index = 0;

      for (const item of self) {
        if (index >= limit) {
          break;
        }

        yield item;

        index++;
      }
    }
  };
}
