import {Map} from '../mutable/Map';
import {MultiValueMap} from './MultiValueMap';
import {ListMap} from '../mutable/ListMap';
import {Sequence} from '../readonly/Sequence';
import {ZERO} from '../../Constants';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlySet} from '../readonly/ReadOnlySet';
import {KeyValuePair} from '../KeyValuePair';
import {LinkedList} from '../mutable/LinkedList';
import {StrictEqualityComparator} from '../../utils/comparison/StrictEqualityComparator';
import {ReadOnlyList} from '../readonly/ReadOnlyList';


export class LinkedMultiValueMap<K, V> implements MultiValueMap<K, V> {
    private readonly _map: ListMap<K, LinkedList<V>>;
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
        let length = ZERO;

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
        this._map = new ListMap(undefined, keyComparator);
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

    public containsEntry(key: K, value: V): boolean {
        const list = this._map.get(key);

        if (list == null) {
            return false;
        }

        return list.contains(value, this._valueComparator);
    }

    public containsKey(key: K): boolean {
        return this._map.containsKey(key);
    }

    public containsValue(value: V): boolean {
        for (const pair of this._map) {
            for (const item of pair.value) {
                if (this._valueComparator.equals(item, value)) {
                    return true;
                }
            }
        }

        return false;
    }

    public get(key: K): ReadOnlyList<V> {
        return this._map.get(key) || new LinkedList();
    }

    public getFirst(key: K): V | undefined;

    public getFirst(key: K, defaultValue: V): V;

    public getFirst(key: K, defaultValue?: V): V | undefined {
        const list = this._map.get(key);

        if (list == null) {
            return defaultValue;
        }

        return list.getAt(ZERO);
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

    public put(key: K, value: V): V | undefined {
        const list = this.obtainSlot(key);

        list.add(value);

        return undefined;
    }

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        for (const pair of values) {
            const list: LinkedList<V> = this.obtainSlot(pair.key);

            list.add(pair.value);
        }

        return values.length > ZERO;
    }

    public putIfAbsent(key: K, value: V): boolean {
        const list: LinkedList<V> = this.obtainSlot(key);
        let result = false;

        if (list.contains(value, this.valueComparator) === false) {
            result = list.add(value);
        }

        return result;
    }

    public removeAll(key: K): boolean {
        return this._map.remove(key) != null;
    }

    public remove(key: K, value: V): boolean {
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

    public toArray(): Array<KeyValuePair<K, V>> {
        const result: Array<KeyValuePair<K, V>> = [];

        for (const pair of this._map) {
            for (const item of pair.value) {
                result.push(new KeyValuePair(pair.key, item));
            }
        }

        return result;
    }

    /**
     * Returns the first values contained in this LinkedMultiValueMap.
     */
    public toSingleValueMap(): Map<K, V> {
        const map: Map<K, V> = new ListMap();

        for (const entry of this._map) {
            map.put(entry.key, entry.value.getAt(ZERO));
        }

        return map;
    }

    private obtainSlot(key: K): LinkedList<V> {
        let list: LinkedList<V> | undefined = this._map.get(key);

        if (list == null) {
            list = new LinkedList();

            this._map.put(key, list);
        }

        return list;
    }
}
