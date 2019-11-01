import { Delegate } from '@monument/core';

export function zip<T1, T2, R>(self: Iterable<T1>, others: Iterable<T2>, combine: Delegate<[T1, T2], R>): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      const selfIterator = self[Symbol.iterator]();
      const othersIterator = others[Symbol.iterator]();

      let self$ = selfIterator.next();
      let others$ = othersIterator.next();

      for (; !self$.done && !others$.done; self$ = selfIterator.next(), others$ = othersIterator.next()) {
        yield combine(self$.value, others$.value);
      }
    }
  };
}
