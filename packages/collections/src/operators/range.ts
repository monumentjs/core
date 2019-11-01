import { argument } from '@monument/assert';

export function range(from: number, to: number, step: number = 1): Iterable<number> {
  argument(from <= to);
  argument(step !== 0);

  return {
    * [Symbol.iterator](): Iterator<number> {
      for (let value = from; value < to; value += step) {
        yield value;
      }
    }
  };
}
