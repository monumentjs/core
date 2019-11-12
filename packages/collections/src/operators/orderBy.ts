import { ComparisonResult, SortOrder } from '@monument/comparison';
import { Delegate } from '@monument/core';

export function orderBy<T, K>(
  self: Iterable<T>,
  selectKey: Delegate<[T], K>,
  compareKeys: Delegate<[K, K], ComparisonResult>
): Iterable<T>;
export function orderBy<T, K>(
  self: Iterable<T>,
  selectKey: Delegate<[T], K>,
  compareKeys: Delegate<[K, K], ComparisonResult>,
  sortOrder: SortOrder
): Iterable<T>;
export function orderBy<T, K>(
  self: Iterable<T>,
  selectKey: Delegate<[T], K>,
  compareKeys: Delegate<[K, K], ComparisonResult>,
  sortOrder: SortOrder = SortOrder.ASCENDING
): Iterable<T> {
  return {
    * [Symbol.iterator](): Iterator<T> {
      yield* [...self].sort((x: T, y: T): number => {
        const xKey: K = selectKey(x);
        const yKey: K = selectKey(y);

        return compareKeys(xKey, yKey) * sortOrder;
      });
    }
  };
}
