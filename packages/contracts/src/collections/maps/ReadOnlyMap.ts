import { KeyValuePair } from '../../types/KeyValuePair';
import { Equatable } from '../../data/Equatable';
import { EqualsFunction } from '../../functions/EqualityComparator';
import { Sequence } from '../../data/Sequence';
import { SupplyFunction } from '../../types/SupplyFunction';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyMap<K, V> extends Sequence<KeyValuePair<K, V>>, Equatable<ReadOnlyMap<K, V>> {
  readonly isEmpty: boolean;
  readonly keys: Iterable<K>;
  readonly values: Iterable<V>;
  readonly keyComparator: EqualsFunction<K>;
  readonly valueComparator: EqualsFunction<V>;

  containsEntries(entries: Iterable<KeyValuePair<K, V>>): boolean;

  containsEntry(key: K, value: V): boolean;

  containsKey(key: K): boolean;

  containsKeys(keys: Iterable<K>): boolean;

  containsValue(value: V): boolean;

  containsValues(values: Iterable<V>): boolean;

  get(key: K): V | undefined;

  get(key: K, fallback: SupplyFunction<V>): V;

  keyOf(value: V): K | undefined;

  keysOf(value: V): Iterable<K>;
}
