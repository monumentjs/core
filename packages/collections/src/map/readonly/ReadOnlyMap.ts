import { Func, Func2 } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { KeyValuePair } from '../../base/KeyValuePair';
import { Sequence } from '../../base/Sequence';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyMap<K, V> extends Sequence<KeyValuePair<K, V>>, Equatable<ReadOnlyMap<K, V>> {
  readonly isEmpty: boolean;
  readonly keys: Iterable<K>;
  readonly values: Iterable<V>;
  readonly keyComparator: Func2<K, K, boolean>;
  readonly valueComparator: Func2<V, V, boolean>;

  containsEntries(entries: Iterable<KeyValuePair<K, V>>): boolean;

  containsEntry(key: K, value: V): boolean;

  containsKey(key: K): boolean;

  containsKeys(keys: Iterable<K>): boolean;

  containsValue(value: V): boolean;

  containsValues(values: Iterable<V>): boolean;

  get(key: K): V | undefined;

  get(key: K, fallback: Func<V>): V;

  keyOf(value: V): K | undefined;

  keysOf(value: V): Iterable<K>;
}
