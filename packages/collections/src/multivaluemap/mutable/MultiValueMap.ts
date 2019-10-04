import { Func2 } from '@monument/core';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMultiValueMap } from '../readonly/ReadOnlyMultiValueMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface MultiValueMap<K, V> extends ReadOnlyMultiValueMap<K, V> {
  clear(): boolean;

  put(key: K, value: V): boolean;

  putAll(entries: Iterable<KeyValuePair<K, V>>): boolean;

  putIfAbsent(key: K, value: V): boolean;

  putValues(key: K, values: Iterable<V>): boolean;

  remove(key: K): Iterable<V> | undefined;

  removeBy(predicate: Func2<K, V, boolean>): boolean;

  removeIf(key: K, value: V): boolean;

  replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
