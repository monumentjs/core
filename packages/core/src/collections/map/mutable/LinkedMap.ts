import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {KeyValuePair} from '../../base/KeyValuePair';
import {Cloneable} from '../../../base/Cloneable';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';
import {Map as IMap} from './Map';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {Supplier} from '../../../base/Supplier';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class LinkedMap<K, V> implements IMap<K, V>, Cloneable<LinkedMap<K, V>> {
    private readonly _map: Map<K, V> = new Map();
    private readonly _keyComparator: EqualityComparator<K>;
    private readonly _valueComparator: EqualityComparator<V>;

    public get isEmpty(): boolean {
        return this._map.size === 0;
    }

    public get keyComparator(): EqualityComparator<K> {
        return this._keyComparator;
    }

    public get keys(): Iterable<K> {
        return this._map.keys();
    }

    public get length(): number {
        return this._map.size;
    }

    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }

    public get values(): Iterable<V> {
        return this._map.values();
    }

    public constructor(
        items?: Iterable<KeyValuePair<K, V>>,
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ) {
        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;

        if (items) {
            this.putAll(items);
        }
    }

    public [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        return this._map[Symbol.iterator]();
    }

    public clear(): boolean {
        if (this._map.size > 0) {
            this._map.clear();

            return true;
        }

        return false;
    }

    public clone(): LinkedMap<K, V> {
        return new LinkedMap(this, this.keyComparator, this.valueComparator);
    }

    public containsEntries(entries: Iterable<KeyValuePair<K, V>>): boolean {
        for (const [key, value] of entries) {
            if (!this.containsEntry(key, value)) {
                return false;
            }
        }

        return true;
    }

    public containsEntry(key: K, value: V): boolean {
        for (const [ownKey, ownValue] of this) {
            if (this.keyComparator.equals(key, ownKey) && this.valueComparator.equals(value, ownValue)) {
                return true;
            }
        }

        return false;
    }

    public containsKey(key: K): boolean {
        for (const ownKey of this._map.keys()) {
            if (this.keyComparator.equals(key, ownKey)) {
                return true;
            }
        }

        return false;
    }

    public containsKeys(keys: Iterable<K>): boolean {
        for (const key of keys) {
            if (!this.containsKey(key)) {
                return false;
            }
        }

        return true;
    }

    public containsValue(value: V): boolean {
        for (const ownValue of this._map.values()) {
            if (this.valueComparator.equals(value, ownValue)) {
                return true;
            }
        }

        return false;
    }

    public containsValues(values: Iterable<V>): boolean {
        for (const value of values) {
            if (!this.containsValue(value)) {
                return false;
            }
        }

        return true;
    }

    public get(key: K): V | undefined;

    public get(key: K, fallback: Supplier<V>): V;

    public get(key: K, fallback?: Supplier<V>): V | undefined {
        const entry = this.getEntry(key);

        if (entry != null) {
            return entry[1];
        }

        return fallback ? fallback() : undefined;
    }

    public keyOf(value: V): K | undefined {
        for (const [ownKey, ownValue] of this) {
            if (this.valueComparator.equals(value, ownValue)) {
                return ownKey;
            }
        }
    }

    public* keysOf(value: V): Iterable<K> {
        for (const [ownKey, ownValue] of this) {
            if (this.valueComparator.equals(value, ownValue)) {
                yield ownKey;
            }
        }
    }

    public put(key: K, value: V): V | undefined {
        const entry: KeyValuePair<K, V> | undefined = this.getEntry(key);

        if (entry) {
            this._map.delete(entry[0]);
        }

        this._map.set(key, value);

        return entry ? entry[1] : undefined;
    }

    public putAll(entries: Iterable<KeyValuePair<K, V>>): boolean {
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

    public putIfAbsent(key: K, value: V): boolean {
        if (!this.containsKey(key)) {
            this.put(key, value);

            return true;
        }

        return false;
    }

    public remove(key: K): V | undefined {
        const entry: KeyValuePair<K, V> | undefined = this.getEntry(key);

        if (entry) {
            const [ownKey, ownValue] = entry;
            this._map.delete(ownKey);

            return ownValue;
        }
    }

    public removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean {
        let modified: boolean | undefined;

        for (const [ownKey, ownValue] of this) {
            if (predicate(ownKey, ownValue)) {
                this._map.delete(ownKey);

                modified = true;
            }
        }

        return !!modified;
    }

    public removeIf(key: K, value: V): boolean {
        for (const [ownKey, ownValue] of this) {
            if (this.keyComparator.equals(key, ownKey) && this.valueComparator.equals(value, ownValue)) {
                this._map.delete(ownKey);

                return true;
            }
        }

        return false;
    }

    public replace(key: K, newValue: V): V | undefined {
        if (this.containsKey(key)) {
            const oldValue: V | undefined = this.remove(key);

            this.put(key, newValue);

            return oldValue;
        }
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        if (this.containsEntry(key, oldValue)) {
            this.remove(key);
            this.put(key, newValue);

            return true;
        }

        return false;
    }

    private getEntry(key: K): KeyValuePair<K, V> | undefined {
        for (const entry of this._map) {
            if (this.keyComparator.equals(entry[0], key)) {
                return entry;
            }
        }
    }
}
