import { Delegate } from '@monument/core';
import { StrictEquals } from './StrictEquals';

/**
 * @author Alex Chugaev
 * @since 0.14.0
 */
export function IterableEqualsFactory<T>(itemEquals: Delegate<[T, T], boolean> = StrictEquals): Delegate<[Iterable<T>, Iterable<T>], boolean> {
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
