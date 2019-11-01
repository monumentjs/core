import { Delegate } from '@monument/core';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMultiValueMap } from '../readonly/ReadOnlyMultiValueMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface MultiValueMap<K, V> extends ReadOnlyMultiValueMap<K, V> {
  put(key: K, value: V): MultiValueMap<K, V>;

  putAll(key: K, values: Iterable<V>): MultiValueMap<K, V>;

  putMany(entries: Iterable<KeyValuePair<K, V>>): MultiValueMap<K, V>;

  putIfAbsent(key: K, value: V): MultiValueMap<K, V>;

  remove(key: K): MultiValueMap<K, V>;

  removeBy(predicate: Delegate<[K, V], boolean>): MultiValueMap<K, V>;

  removeIf(key: K, value: V): MultiValueMap<K, V>;

  replaceIf(key: K, oldValue: V, newValue: V): MultiValueMap<K, V>;
}
