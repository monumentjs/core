import { Delegate } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { ToArray } from '../../base/ToArray';
import { Sequence } from '../../base/Sequence';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMap } from '../../map/readonly/ReadOnlyMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyMultiValueMap<K, V>
  extends Sequence<KeyValuePair<K, V>>,
    ToArray<KeyValuePair<K, V>>,
    Equatable<ReadOnlyMultiValueMap<K, V>> {
  readonly isEmpty: boolean;
  readonly keys: Iterable<K>;
  readonly values: Iterable<V>;
  readonly valuesCount: number;

  containsEntries(entries: Iterable<KeyValuePair<K, V>>): boolean;

  containsEntry(key: K, value: V): boolean;

  containsKey(key: K): boolean;

  containsKeys(keys: Iterable<K>): boolean;

  containsValue(value: V): boolean;

  containsValues(values: Iterable<V>): boolean;

  get(key: K): Iterable<V>;

  getFirst(key: K): V | undefined;

  getFirst(key: K, fallback: Delegate<[], V>): V;

  keyOf(value: V): K | undefined;

  keysOf(value: V): Iterable<K>;

  toSingleValueMap(): ReadOnlyMap<K, V>;

  filter(predicate: Delegate<[K, V, number], boolean>): ReadOnlyMultiValueMap<K, V>;

  map<K2, V2>(
    project: Delegate<[K, V, number], KeyValuePair<K2, V2>>,
    compareKeys?: Delegate<[K2, K2], boolean>,
    compareValues?: Delegate<[V2, V2], boolean>
  ): ReadOnlyMultiValueMap<K2, V2>;
}
