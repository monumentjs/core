import { Cloneable, Func, Func2 } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMap } from '../readonly/ReadOnlyMap';
import { Map as IMap } from './Map';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class LinkedMap<K, V> implements IMap<K, V>, Cloneable<LinkedMap<K, V>> {
  private readonly _map: Map<K, V> = new Map();
  private readonly _keyComparator: Func2<K, K, boolean>;
  private readonly _valueComparator: Func2<V, V, boolean>;

  get isEmpty(): boolean {
    return this._map.size === 0;
  }

  get keyComparator(): Func2<K, K, boolean> {
    return this._keyComparator;
  }

  get keys(): Iterable<K> {
    return this._map.keys();
  }

  get length(): number {
    return this._map.size;
  }

  get valueComparator(): Func2<V, V, boolean> {
    return this._valueComparator;
  }

  get values(): Iterable<V> {
    return this._map.values();
  }

  constructor(
    items?: Iterable<KeyValuePair<K, V>>,
    keyComparator: Func2<K, K, boolean> = StrictEquals,
    valueComparator: Func2<V, V, boolean> = StrictEquals
  ) {
    this._keyComparator = keyComparator;
    this._valueComparator = valueComparator;

    if (items) {
      this.putAll(items);
    }
  }

  [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
    return this._map[Symbol.iterator]();
  }

  clear(): boolean {
    if (this._map.size > 0) {
      this._map.clear();

      return true;
    }

    return false;
  }

  clone(): LinkedMap<K, V> {
    return new LinkedMap(this, this.keyComparator, this.valueComparator);
  }

  containsEntries(entries: Iterable<KeyValuePair<K, V>>): boolean {
    for (const [key, value] of entries) {
      if (!this.containsEntry(key, value)) {
        return false;
      }
    }

    return true;
  }

  containsEntry(key: K, value: V): boolean {
    for (const [ownKey, ownValue] of this) {
      if (this.keyComparator(key, ownKey) && this.valueComparator(value, ownValue)) {
        return true;
      }
    }

    return false;
  }

  containsKey(key: K): boolean {
    for (const ownKey of this._map.keys()) {
      if (this.keyComparator(key, ownKey)) {
        return true;
      }
    }

    return false;
  }

  containsKeys(keys: Iterable<K>): boolean {
    for (const key of keys) {
      if (!this.containsKey(key)) {
        return false;
      }
    }

    return true;
  }

  containsValue(value: V): boolean {
    for (const ownValue of this._map.values()) {
      if (this.valueComparator(value, ownValue)) {
        return true;
      }
    }

    return false;
  }

  containsValues(values: Iterable<V>): boolean {
    for (const value of values) {
      if (!this.containsValue(value)) {
        return false;
      }
    }

    return true;
  }

  equals(other: ReadOnlyMap<K, V>): boolean {
    if (this === other) {
      return true;
    }

    if (this.keyComparator !== other.keyComparator || this.valueComparator !== other.valueComparator) {
      return false;
    }

    if (this.length === other.length) {
      return this.containsEntries(other) && other.containsEntries(this);
    }

    return false;
  }

  get(key: K): V | undefined;

  get(key: K, fallback: Func<V>): V;

  get(key: K, fallback?: Func<V>): V | undefined {
    const entry = this.getEntry(key);

    if (entry != null) {
      return entry[1];
    }

    return fallback ? fallback() : undefined;
  }

  keyOf(value: V): K | undefined {
    for (const [ownKey, ownValue] of this) {
      if (this.valueComparator(value, ownValue)) {
        return ownKey;
      }
    }
  }

  * keysOf(value: V): Iterable<K> {
    for (const [ownKey, ownValue] of this) {
      if (this.valueComparator(value, ownValue)) {
        yield ownKey;
      }
    }
  }

  put(key: K, value: V): V | undefined {
    const entry: KeyValuePair<K, V> | undefined = this.getEntry(key);

    if (entry) {
      this._map.delete(entry[0]);
    }

    this._map.set(key, value);

    return entry ? entry[1] : undefined;
  }

  putAll(entries: Iterable<KeyValuePair<K, V>>): boolean {
    let modified: boolean | undefined;

    for (const [key, value] of entries) {
      const entry: KeyValuePair<K, V> | undefined = this.getEntry(key);

      if (entry) {
        this._map.delete(entry[0]);
      }

      this._map.set(key, value);

      modified = true;
    }

    return !!modified;
  }

  putIfAbsent(key: K, value: V): boolean {
    if (!this.containsKey(key)) {
      this.put(key, value);

      return true;
    }

    return false;
  }

  remove(key: K): V | undefined {
    const entry: KeyValuePair<K, V> | undefined = this.getEntry(key);

    if (entry) {
      const [ownKey, ownValue] = entry;
      this._map.delete(ownKey);

      return ownValue;
    }
  }

  removeBy(predicate: Func2<K, V, boolean>): boolean {
    let modified: boolean | undefined;

    for (const [ownKey, ownValue] of this) {
      if (predicate(ownKey, ownValue)) {
        this._map.delete(ownKey);

        modified = true;
      }
    }

    return !!modified;
  }

  removeIf(key: K, value: V): boolean {
    for (const [ownKey, ownValue] of this) {
      if (this.keyComparator(key, ownKey) && this.valueComparator(value, ownValue)) {
        this._map.delete(ownKey);

        return true;
      }
    }

    return false;
  }

  replace(key: K, newValue: V): V | undefined {
    if (this.containsKey(key)) {
      const oldValue: V | undefined = this.remove(key);

      this.put(key, newValue);

      return oldValue;
    }
  }

  replaceIf(key: K, oldValue: V, newValue: V): boolean {
    if (this.containsEntry(key, oldValue)) {
      this.remove(key);
      this.put(key, newValue);

      return true;
    }

    return false;
  }

  private getEntry(key: K): KeyValuePair<K, V> | undefined {
    for (const entry of this._map) {
      if (this.keyComparator(entry[0], key)) {
        return entry;
      }
    }
  }
}
