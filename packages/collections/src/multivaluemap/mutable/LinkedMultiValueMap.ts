import { Func, Func2, Func3 } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMultiValueMap } from '../readonly/ReadOnlyMultiValueMap';
import { ReadOnlyMap } from '../../map/readonly/ReadOnlyMap';
import { LinkedMap } from '../../map/mutable/LinkedMap';
import { MultiValueMap } from './MultiValueMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedMultiValueMap<K, V> implements MultiValueMap<K, V> {
  private readonly _map: Map<K, V[]> = new Map();
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

  get valuesCount(): number {
    let length: number = 0;

    for (const [, ownValues] of this._map) {
      length += ownValues.length;
    }

    return length;
  }

  get valueComparator(): Func2<V, V, boolean> {
    return this._valueComparator;
  }

  get values(): Iterable<V> {
    const self = this;

    return {
      * [Symbol.iterator](): Iterator<V> {
        for (const values of self._map.values()) {
          yield* values;
        }
      }
    };
  }

  constructor(
    pairs: Iterable<KeyValuePair<K, V>> = [],
    keyComparator: Func2<K, K, boolean> = StrictEquals,
    valueComparator: Func2<V, V, boolean> = StrictEquals
  ) {
    this._keyComparator = keyComparator;
    this._valueComparator = valueComparator;

    this.putAll(pairs);
  }

  * [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
    for (const [ownKey, ownValues] of this._map.entries()) {
      for (const ownValue of ownValues) {
        yield [ownKey, ownValue];
      }
    }
  }

  clear(): boolean {
    if (this._map.size > 0) {
      this._map.clear();

      return true;
    }

    return false;
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
      if (this.keyComparator(ownKey, key) && this.valueComparator(ownValue, value)) {
        return true;
      }
    }

    return false;
  }

  containsKey(key: K): boolean {
    for (const ownKey of this.keys) {
      if (this.keyComparator(ownKey, key)) {
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
    for (const ownValue of this.values) {
      if (this.valueComparator(ownValue, value)) {
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

  equals(other: ReadOnlyMultiValueMap<K, V>): boolean {
    if (this === other) {
      return true;
    }

    for (const [key, value] of this) {
      if (!other.containsEntry(key, value)) {
        return false;
      }
    }

    for (const [key, value] of other) {
      if (!this.containsEntry(key, value)) {
        return false;
      }
    }

    return true;
  }

  * get(key: K): Iterable<V> {
    const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

    if (entry != null) {
      yield* entry[1];
    }
  }

  getFirst(key: K): V | undefined;
  getFirst(key: K, fallback: Func<V>): V;
  getFirst(key: K, fallback?: Func<V>): V | undefined {
    const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

    if (entry != null) {
      const ownValues: V[] = entry[1];

      if (ownValues.length > 0) {
        return ownValues[0];
      }
    }

    return fallback ? fallback() : undefined;
  }

  keyOf(value: V): K | undefined {
    for (const [ownKey, ownValues] of this._map) {
      for (const ownValue of ownValues) {
        if (this.valueComparator(ownValue, value)) {
          return ownKey;
        }
      }
    }
  }

  * keysOf(value: V): Iterable<K> {
    for (const [ownKey, ownValues] of this._map) {
      for (const ownValue of ownValues) {
        if (this.valueComparator(ownValue, value)) {
          yield ownKey;
          break;
        }
      }
    }
  }

  put(key: K, value: V): boolean {
    const ownValues: V[] = this.obtainSlot(key);

    ownValues.push(value);

    return true;
  }

  putAll(values: Iterable<KeyValuePair<K, V>>): boolean {
    let modified: boolean = false;

    for (const [key, value] of values) {
      if (this.put(key, value)) {
        modified = true;
      }
    }

    return modified;
  }

  putIfAbsent(key: K, value: V): boolean {
    if (!this.containsEntry(key, value)) {
      this.put(key, value);

      return true;
    }

    return false;
  }

  putValues(key: K, values: Iterable<V>): boolean {
    let result: boolean = false;

    for (const value of values) {
      if (this.put(key, value)) {
        result = true;
      }
    }

    return result;
  }

  remove(key: K): Iterable<V> | undefined {
    const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

    if (entry) {
      const [ownKey, ownValues] = entry;

      this._map.delete(ownKey);

      return ownValues;
    }
  }

  removeBy(predicate: (key: K, value: V) => boolean): boolean {
    let modified: boolean = false;

    for (const [ownKey, ownValues] of this._map) {
      let removedCount: number = 0;

      ownValues.forEach((ownValue: V, index: number): void => {
        if (predicate(ownKey, ownValue)) {
          ownValues.splice(index - removedCount, 1);

          removedCount++;
          modified = true;
        }
      });

      if (ownValues.length === 0) {
        this._map.delete(ownKey);
      }
    }

    return modified;
  }

  removeIf(key: K, value: V): boolean {
    return this.removeBy((ownKey: K, ownValue: V): boolean => {
      return this.keyComparator(key, ownKey) && this.valueComparator(value, ownValue);
    });
  }

  replaceIf(key: K, oldValue: V, newValue: V): boolean {
    const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);
    let modified = false;

    if (entry != null) {
      const [, ownValues] = entry;

      ownValues.forEach((ownValue: V, index: number): void => {
        if (this.valueComparator(oldValue, ownValue)) {
          ownValues[index] = newValue;

          modified = true;
        }
      });
    }

    return modified;
  }

  toArray(): Array<KeyValuePair<K, V>> {
    return [...this];
  }

  toSingleValueMap(): ReadOnlyMap<K, V> {
    const map: LinkedMap<K, V> = new LinkedMap();

    for (const [ownKey, ownValues] of this._map) {
      map.put(ownKey, ownValues[0]);
    }

    return map;
  }

  filter(predicate: Func3<K, V, number, boolean>): ReadOnlyMultiValueMap<K, V> {
    const self = this;

    return new LinkedMultiValueMap({
      * [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        let index = 0;

        for (const [key, value] of self) {
          if (predicate(key, value, index)) {
            yield [key, value];

            index++;
          }
        }
      }
    }, this.keyComparator, this.valueComparator);
  }

  map<K2, V2>(
    project: Func3<K, V, number, KeyValuePair<K2, V2>>,
    keyComparator: Func2<K2, K2, boolean> = StrictEquals,
    valueComparator: Func2<V2, V2, boolean> = StrictEquals
  ): ReadOnlyMultiValueMap<K2, V2> {
    const self = this;

    return new LinkedMultiValueMap<K2, V2>({
      * [Symbol.iterator](): Iterator<KeyValuePair<K2, V2>> {
        let index = 0;

        for (const [key, value] of self) {
          yield project(key, value, index);
          index++;
        }
      }
    }, keyComparator, valueComparator);
  }

  protected obtainSlot(key: K): V[] {
    const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);
    let ownValues: V[];

    if (entry == null) {
      ownValues = [];

      this._map.set(key, ownValues);
    } else {
      ownValues = entry[1];
    }

    return ownValues;
  }

  private getEntry(key: K): KeyValuePair<K, V[]> | undefined {
    for (const [ownKey, ownValues] of this._map) {
      if (this.keyComparator(ownKey, key)) {
        return [ownKey, ownValues];
      }
    }
  }
}
