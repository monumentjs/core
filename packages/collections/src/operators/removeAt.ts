import { argument } from '@monument/assert';

export function removeAt<T>(self: Iterable<T>, position: number): Iterable<T> {
  argument(position >= 0, `Position cannot be negative: position=${position}`);

  return {
    * [Symbol.iterator](): Iterator<T> {
      let index: number = 0;

      for (const item of self) {
        if (index !== position) {
          yield item;
        }

        index++;
      }

      argument(position < index, `Position is out of range: position=${position}, length=${index}`);
    }
  };
}
