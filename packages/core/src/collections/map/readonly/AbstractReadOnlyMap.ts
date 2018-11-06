import {ReadOnlyMap} from './ReadOnlyMap';
import {ReadOnlySet} from '../../set/readonly/ReadOnlySet';
import {ReadOnlyList} from '../../list/readonly/ReadOnlyList';
import {KeyValuePair} from '../../base/KeyValuePair';
import {Sequence} from '../../base/Sequence';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {ArraySet} from '../../set/mutable/ArraySet';
import {LinkedList} from '../../list/mutable/LinkedList';
import {Equatable} from '../../../comparison/equality/Equatable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class AbstractReadOnlyMap<K, V> implements ReadOnlyMap<K, V>, Equatable<Sequence<KeyValuePair<K, V>>> {
    private readonly _keyComparator: EqualityComparator<K>;
    private readonly _valueComparator: EqualityComparator<V>;

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public get keyComparator(): EqualityComparator<K> {
        return this._keyComparator;
    }

    public get keys(): ReadOnlySet<K> {
        const result: ArraySet<K> = new ArraySet();

        for (const {key} of this) {
            result.add(key);
        }

        return result;
    }

    public abstract get length(): number;

    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }

    public get values(): ReadOnlyList<V> {
        const result: LinkedList<V> = new LinkedList();

        for (const {value} of this) {
            result.add(value);
        }

        return result;
    }

    public constructor(
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ) {
        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;
    }

    public abstract [Symbol.iterator](): Iterator<KeyValuePair<K, V>>;

    public containsEntries(entries: Sequence<KeyValuePair<K, V>>): boolean {
        for (const {key, value} of entries) {
            if (!this.containsEntry(key, value)) {
                return false;
            }
        }

        return true;
    }

    public containsEntry(key: K, value: V): boolean {
        for (const pair of this) {
            if (this.keyComparator.equals(pair.key, key) && this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }

    public containsKey(key: K): boolean {
        for (const pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return true;
            }
        }

        return false;
    }

    public containsKeys(keys: Sequence<K>): boolean {
        for (const key of keys) {
            if (!this.containsKey(key)) {
                return false;
            }
        }

        return true;
    }

    public containsValue(value: V): boolean {
        for (const pair of this) {
            if (this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }

    public containsValues(values: Sequence<V>): boolean {
        for (const value of values) {
            if (!this.containsValue(value)) {
                return false;
            }
        }

        return true;
    }

    public equals(other: ReadOnlyMap<K, V>): boolean {
        if (this === other) {
            return true;
        }

        if (this.keys.length !== other.keys.length) {
            return false;
        }

        return other.containsEntries(this) && this.containsEntries(other);
    }

    public get(key: K): V | undefined;

    public get(key: K, defaultValue: V): V;

    public get(key: K, defaultValue?: V): V | undefined {
        for (const pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return pair.value;
            }
        }

        return defaultValue;
    }

    public keyOf(value: V): K | undefined {
        for (const pair of this) {
            if (this.valueComparator.equals(pair.value, value)) {
                return pair.key;
            }
        }
    }

    public keysOf(value: V): ReadOnlyList<K> {
        const keys: LinkedList<K> = new LinkedList();

        for (const pair of this) {
            if (this.valueComparator.equals(pair.value, value)) {
                keys.add(pair.key);
            }
        }

        return keys;
    }
}
