import {Map} from '../../map/mutable/Map';
import {LinkedMap} from '../../map/mutable/LinkedMap';
import {Sequence} from '../../base/Sequence';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {ReadOnlySet} from '../../set/readonly/ReadOnlySet';
import {KeyValuePair} from '../../base/KeyValuePair';
import {LinkedList} from '../../list/mutable/LinkedList';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {ReadOnlyList} from '../../list/readonly/ReadOnlyList';
import {MultiValueMap} from './MultiValueMap';
import {List} from '../../list/mutable/List';
import {ReadOnlyMap} from '../../map/readonly/ReadOnlyMap';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';
import {ChainedEqualityComparator} from '../../../comparison/equality/ChainedEqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedMultiValueMap<K, V> implements MultiValueMap<K, V> {
    private readonly _map: LinkedMap<K, LinkedList<V>>;
    private readonly _valueComparator: EqualityComparator<V>;

    public get isEmpty(): boolean {
        return this._map.isEmpty;
    }

    public get keyComparator(): EqualityComparator<K> {
        return this._map.keyComparator;
    }

    public get keys(): ReadOnlySet<K> {
        return this._map.keys;
    }

    public get length(): number {
        let length: number = 0;

        for (const pair of this._map) {
            length += pair.value.length;
        }

        return length;
    }

    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }

    public get values(): ReadOnlyList<V> {
        const values: LinkedList<V> = new LinkedList();

        for (const pair of this._map) {
            values.addAll(pair.value);
        }

        return values;
    }

    public constructor(
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ) {
        this._valueComparator = valueComparator;
        this._map = new LinkedMap(undefined, keyComparator);
    }

    public* [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        for (const pair of this._map) {
            for (const item of pair.value) {
                yield new KeyValuePair(pair.key, item);
            }
        }
    }

    public clear(): boolean {
        return this._map.clear();
    }

    public containsEntries(entries: Sequence<KeyValuePair<K, V>>): boolean {
        for (const {key, value} of entries) {
            if (!this.containsEntry(key, value)) {
                return false;
            }
        }

        return true;
    }

    public containsEntry(key: K, value: V): boolean {
        const list: LinkedList<V> | undefined = this._map.get(key);

        if (list == null) {
            return false;
        }

        return list.contains(value, this.valueComparator);
    }

    public containsKey(key: K): boolean {
        return this._map.containsKey(key);
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
        for (const pair of this._map) {
            for (const item of pair.value) {
                if (this.valueComparator.equals(item, value)) {
                    return true;
                }
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

    public equals(other: Sequence<KeyValuePair<K, V>>): boolean {
        if (this === other) {
            return true;
        }

        const comparator: ChainedEqualityComparator = new ChainedEqualityComparator();

        comparator.withField(this.length, other.length);

        return comparator.result;
    }

    public get(key: K): ReadOnlyList<V> {
        return this._map.get(key) || new LinkedList();
    }

    public getFirst(key: K): V | undefined;
    public getFirst(key: K, defaultValue: V): V;
    public getFirst(key: K, defaultValue?: V): V | undefined {
        const slot = this.obtainSlot(key);

        if (!slot.isEmpty) {
            return slot.getAt(0);
        }

        return defaultValue;
    }

    public keyOf(value: V): K | undefined {
        for (const pair of this._map) {
            for (const item of pair.value) {
                if (this._valueComparator.equals(item, value)) {
                    return pair.key;
                }
            }
        }
    }

    public keysOf(value: V): ReadOnlyList<K> {
        const result: LinkedList<K> = new LinkedList();

        for (const pair of this._map) {
            for (const item of pair.value) {
                if (this._valueComparator.equals(item, value)) {
                    result.add(pair.key);
                }
            }
        }

        return result;
    }

    public put(key: K, value: V): boolean {
        const list: List<V> = this.obtainSlot(key);

        return list.addIfAbsent(value, this.valueComparator);
    }

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        let result: boolean = false;

        for (const {key, value} of values) {
            if (this.put(key, value)) {
                result = true;
            }
        }

        return result;
    }

    public putIfAbsent(key: K, value: V): boolean {
        if (!this.containsEntry(key, value)) {
            this.put(key, value);

            return true;
        }

        return false;
    }

    public putMap(map: ReadOnlyMap<K, V>): boolean {
        return this.putAll(map);
    }

    public putValues(key: K, values: Sequence<V>): boolean {
        let result: boolean = false;

        for (const value of values) {
            if (this.put(key, value)) {
                result = true;
            }
        }

        return result;
    }

    public remove(key: K): ReadOnlyList<V> | undefined {
        return this._map.remove(key);
    }

    public removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean {
        let result: boolean = false;

        this._map.removeBy((key: K, list: List<V>): boolean => {
            const removed: boolean = list.removeBy((item: V): boolean => {
                return predicate(key, item);
            });

            if (removed) {
                result = true;
            }

            return list.isEmpty;
        });

        return result;
    }

    public removeIf(key: K, value: V): boolean {
        for (const pair of this._map) {
            if (pair.value.remove(value, this.valueComparator)) {
                if (pair.value.isEmpty) {
                    this._map.remove(pair.key);
                }

                return true;
            }
        }

        return false;
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        const list = this._map.get(key);
        let result = false;

        if (list != null) {
            list.forEach((value: V, index: number): void => {
                if (this.valueComparator.equals(oldValue, value)) {
                    list.setAt(index, newValue);

                    result = true;
                }
            });
        }

        return result;
    }

    public toArray(): Array<KeyValuePair<K, V>> {
        return [...this];
    }

    public toJSON(): Array<KeyValuePair<K, V>> {
        return this.toArray();
    }

    public toSingleValueMap(): Map<K, V> {
        const map: Map<K, V> = new LinkedMap();

        for (const entry of this._map) {
            map.put(entry.key, entry.value.getAt(0));
        }

        return map;
    }

    protected obtainSlot(key: K): List<V> {
        let list: LinkedList<V> | undefined = this._map.get(key);

        if (list == null) {
            list = new LinkedList();

            this._map.put(key, list);
        }

        return list;
    }
}
