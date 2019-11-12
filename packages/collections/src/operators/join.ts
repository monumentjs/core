import { StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';

export function join<T1, T2, K, R>(
  self: Iterable<T1>,
  outerItems: Iterable<T2>,
  selectInnerKey: Delegate<[T1, number], K>,
  selectOuterKey: Delegate<[T2, number], K>,
  selectResult: Delegate<[T1, T2], R>
): Iterable<R>;
export function join<T1, T2, K, R>(
  self: Iterable<T1>,
  outerItems: Iterable<T2>,
  selectInnerKey: Delegate<[T1, number], K>,
  selectOuterKey: Delegate<[T2, number], K>,
  selectResult: Delegate<[T1, T2], R>,
  keysEquals: Delegate<[K, K], boolean>
): Iterable<R>;
export function join<T1, T2, K, R>(
  self: Iterable<T1>,
  outerItems: Iterable<T2>,
  selectInnerKey: Delegate<[T1, number], K>,
  selectOuterKey: Delegate<[T2, number], K>,
  selectResult: Delegate<[T1, T2], R>,
  keysEquals: Delegate<[K, K], boolean> = StrictEquals
): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      let index = 0;

      for (const ownItem of self) {
        const innerKey: K = selectInnerKey(ownItem, index);

        let outerIndex = 0;

        for (const outerItem of outerItems) {
          const outerKey: K = selectOuterKey(outerItem, outerIndex);

          if (keysEquals(innerKey, outerKey)) {
            yield selectResult(ownItem, outerItem);
          }

          outerIndex++;
        }

        index++;
      }
    }
  };
}
