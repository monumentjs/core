import {SupplyFunction} from '../../../function/SupplyFunction';
import {KeyValuePair} from '../../base/KeyValuePair';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {ReferenceEqualityComparator} from '../../../comparison/equality/ReferenceEqualityComparator';
import {ReadOnlyMultiValueMap} from '../readonly/ReadOnlyMultiValueMap';
import {ReadOnlyMap} from '../../map/readonly/ReadOnlyMap';
import {LinkedMap} from '../../map/mutable/LinkedMap';
import {MultiValueMap} from './MultiValueMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedMultiValueMap<K, V> implements MultiValueMap<K, V> {
    private readonly _map: Map<K, V[]> = new Map();
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

    public get valuesCount(): number {
        let length: number = 0;

        for (const [, ownValues] of this._map) {
            length += ownValues.length;
        }

        return length;
    }

    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }

    public get values(): Iterable<V> {
        const self = this;

        return {
            * [Symbol.iterator](): Iterator<V> {
                for (const values of self._map.values()) {
                    yield* values;
                }
            }
        };
    }

    public constructor(
        keyComparator: EqualityComparator<K> = ReferenceEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = ReferenceEqualityComparator.get()
    ) {
        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;
    }

    public* [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        for (const [ownKey, ownValues] of this._map.entries()) {
            for (const ownValue of ownValues) {
                yield [ownKey, ownValue];
            }
        }
    }

    public clear(): boolean {
        if (this._map.size > 0) {
            this._map.clear();

            return true;
        }

        return false;
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
            if (this.keyComparator.equals(ownKey, key) && this.valueComparator.equals(ownValue, value)) {
                return true;
            }
        }

        return false;
    }

    public containsKey(key: K): boolean {
        for (const ownKey of this.keys) {
            if (this.keyComparator.equals(ownKey, key)) {
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
        for (const ownValue of this.values) {
            if (this.valueComparator.equals(ownValue, value)) {
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

    public equals(other: ReadOnlyMultiValueMap<K, V>): boolean {
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

    public* get(key: K): Iterable<V> {
        const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

        if (entry != null) {
            yield* entry[1];
        }
    }

    public getFirst(key: K): V | undefined;
    public getFirst(key: K, fallback: SupplyFunction<V>): V;
    public getFirst(key: K, fallback?: SupplyFunction<V>): V | undefined {
        const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

        if (entry != null) {
            const ownValues: V[] = entry[1];

            if (ownValues.length > 0) {
                return ownValues[0];
            }
        }

        return fallback ? fallback() : undefined;
    }

    public keyOf(value: V): K | undefined {
        for (const [ownKey, ownValues] of this._map) {
            for (const ownValue of ownValues) {
                if (this.valueComparator.equals(ownValue, value)) {
                    return ownKey;
                }
            }
        }
    }

    public* keysOf(value: V): Iterable<K> {
        for (const [ownKey, ownValues] of this._map) {
            for (const ownValue of ownValues) {
                if (this.valueComparator.equals(ownValue, value)) {
                    yield ownKey;
                    break;
                }
            }
        }
    }

    public put(key: K, value: V): boolean {
        const ownValues: V[] = this.obtainSlot(key);

        ownValues.push(value);

        return true;
    }

    public putAll(values: Iterable<KeyValuePair<K, V>>): boolean {
        let modified: boolean = false;

        for (const [key, value] of values) {
            if (this.put(key, value)) {
                modified = true;
            }
        }

        return modified;
    }

    public putIfAbsent(key: K, value: V): boolean {
        if (!this.containsEntry(key, value)) {
            this.put(key, value);

            return true;
        }

        return false;
    }

    public putValues(key: K, values: Iterable<V>): boolean {
        let result: boolean = false;

        for (const value of values) {
            if (this.put(key, value)) {
                result = true;
            }
        }

        return result;
    }

    public remove(key: K): Iterable<V> | undefined {
        const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);

        if (entry) {
            const [ownKey, ownValues] = entry;

            this._map.delete(ownKey);

            return ownValues;
        }
    }

    public removeBy(predicate: (key: K, value: V) => boolean): boolean {
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

    public removeIf(key: K, value: V): boolean {
        return this.removeBy((ownKey: K, ownValue: V): boolean => {
            return this.keyComparator.equals(key, ownKey) && this.valueComparator.equals(value, ownValue);
        });
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        const entry: KeyValuePair<K, V[]> | undefined = this.getEntry(key);
        let modified = false;

        if (entry != null) {
            const [, ownValues] = entry;

            ownValues.forEach((ownValue: V, index: number): void => {
                if (this.valueComparator.equals(oldValue, ownValue)) {
                    ownValues[index] = newValue;

                    modified = true;
                }
            });
        }

        return modified;
    }

    public toArray(): Array<KeyValuePair<K, V>> {
        return [...this];
    }

    public toSingleValueMap(): ReadOnlyMap<K, V> {
        const map: LinkedMap<K, V> = new LinkedMap();

        for (const [ownKey, ownValues] of this._map) {
            map.put(ownKey, ownValues[0]);
        }

        return map;
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
            if (this.keyComparator.equals(ownKey, key)) {
                return [ownKey, ownValues];
            }
        }
    }
}
