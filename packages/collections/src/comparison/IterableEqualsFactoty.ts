import { StrictEquals } from '@monument/core';
import { EqualsFunction } from '@monument/contracts';

export function IterableEqualsFactory<T>(itemEquals: EqualsFunction<T> = StrictEquals) {
  return function IterableEquals(x: Iterable<T>, y: Iterable<T>): boolean {
    const xIterator = x[Symbol.iterator]();
    const yIterator = y[Symbol.iterator]();

    let xIteratorResult = xIterator.next();
    let yIteratorResult = yIterator.next();

    while (!xIteratorResult.done && !yIteratorResult.done) {
      if (!itemEquals(xIteratorResult.value, yIteratorResult.value)) {
        return false;
      }

      xIteratorResult = xIterator.next();
      yIteratorResult = yIterator.next();
    }

    return xIteratorResult.done === yIteratorResult.done;
  };
}
