import { Delegate } from '@monument/core';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMap } from '../readonly/ReadOnlyMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Map<K, V> extends ReadOnlyMap<K, V> {
  clear(): boolean;

  put(key: K, value: V): V | undefined;

  putAll(entries: Iterable<KeyValuePair<K, V>>): boolean;

  putIfAbsent(key: K, value: V): boolean;

  remove(key: K): V | undefined;

  removeBy(predicate: Delegate<[K, V], boolean>): boolean;

  removeIf(key: K, value: V): boolean;

  replace(key: K, newValue: V): V | undefined;

  replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
