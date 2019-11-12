import { argument } from '@monument/assert';

export function insert<T>(self: Iterable<T>, position: number, item: T): Iterable<T> {
  argument(position >= 0, `Position cannot be negative: position=${position}`);

  return {
    * [Symbol.iterator](): Iterator<T> {
      const iterator: Iterator<T> = self[Symbol.iterator]();
      let self$: IteratorResult<T> = iterator.next();
      let index: number = 0;

      for (; !self$.done && index < position; self$ = iterator.next(), index++) {
        yield self$.value;
      }

      argument(index === position, `Position is out of bounds: position=${position}; length=${index}`);

      yield item;

      for (; !self$.done; self$ = iterator.next()) {
        yield self$.value;
      }
    }
  };
}
