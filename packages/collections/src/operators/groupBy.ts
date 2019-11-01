import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { distinct } from './distinct';
import { map } from './map';
import { filter } from './filter';

export function groupBy<T, K, V, R>(
  self: Iterable<T>,
  selectKey: Delegate<[T, number], K>,
  selectValue: Delegate<[T, number], V>,
  selectResult: Delegate<[K, Iterable<V>], R>
): Iterable<R>;
export function groupBy<T, K, V, R>(
  self: Iterable<T>,
  selectKey: Delegate<[T, number], K>,
  selectValue: Delegate<[T, number], V>,
  selectResult: Delegate<[K, Iterable<V>], R>,
  keysEquals: Delegate<[K, K], boolean>
): Iterable<R>;
export function groupBy<T, K, V, R>(
  self: Iterable<T>,
  selectKey: Delegate<[T, number], K>,
  selectValue: Delegate<[T, number], V>,
  selectResult: Delegate<[K, Iterable<V>], R>,
  keysEquals: Delegate<[K, K], boolean> = StrictEquals
): Iterable<R> {
  return {
    * [Symbol.iterator](): Iterator<R> {
      const keys: Iterable<K> = distinct(map(self, selectKey), keysEquals);
      const results: Iterable<R> = map(keys, key => selectResult(key, map(filter(self, (item, index) => keysEquals(selectKey(item, index), key)), selectValue)));

      yield* results;
    }
  };
}
