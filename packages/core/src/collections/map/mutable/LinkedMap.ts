import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {KeyValuePair} from '../../base/KeyValuePair';
import {Sequence} from '../../base/Sequence';
import {Cloneable} from '../../../base/Cloneable';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';
import {Map as IMap} from './Map';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
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
        items?: Sequence<KeyValuePair<K, V>>,
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
        return false;
    }

    public containsEntry(key: K, value: V): boolean {
        return false;
    }

    public containsKey(key: K): boolean {
        return false;
    }

    public containsKeys(keys: Iterable<K>): boolean {
        return false;
    }

    public containsValue(value: V): boolean {
        return false;
    }

    public containsValues(values: Iterable<V>): boolean {
        return false;
    }

    public get(key: K): V | undefined;

    public get(key: K, defaultValue: V): V;

    public get(key: K, defaultValue?: V): any {
    }

    public keyOf(value: V): K | undefined {
        return undefined;
    }

    public keysOf(value: V): Iterable<K> {
        return undefined;
    }

    public put(key: K, value: V): V | undefined {
        const newPair: KeyValuePair<K, V> = new KeyValuePair(key, value);
        let index: number = 0;

        for (const pair of this._map) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._map.setAt(index, newPair);

                return pair.value;
            }

            index++;
        }

        this._map.add(newPair);

        return undefined;
    }

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        let hasOverridden: boolean = false;

        for (const newPair of values) {
            let index: number = 0;
            let isReplaced: boolean = false;

            for (const pair of this._map) {
                if (this.keyComparator.equals(pair.key, newPair.key)) {
                    this._map.setAt(index, newPair);

                    isReplaced = true;

                    break;
                }

                index++;
            }

            if (!isReplaced) {
                this._map.add(newPair);
            }

            hasOverridden = true;
        }

        return hasOverridden;
    }

    public putIfAbsent(key: K, value: V): boolean {
        return false;
    }

    public putMap(map: ReadOnlyMap<K, V>): boolean {
        return false;
    }

    public remove(key: K): V | undefined {
        let index: number = 0;

        for (const pair of this._map) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._map.removeAt(index);

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean {
        return this._map.removeBy(({key, value}) => {
            return predicate(key, value);
        });
    }

    public removeIf(key: K, value: V): boolean {
        let index: number = 0;

        for (const pair of this._map) {
            if (this.keyComparator.equals(key, pair.key) &&
                this.valueComparator.equals(value, pair.value)) {
                this._map.removeAt(index);

                return true;
            }

            index++;
        }

        return false;
    }

    public replace(key: K, newValue: V): V | undefined {
        let index: number = 0;

        for (const pair of this._map) {
            if (this.keyComparator.equals(key, pair.key)) {
                this._map.setAt(index, new KeyValuePair(key, newValue));

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        let index: number = 0;

        for (const pair of this._map) {
            if (this.keyComparator.equals(key, pair.key) && this.valueComparator.equals(oldValue, pair.value)) {
                this._map.setAt(index, new KeyValuePair(key, newValue));

                return true;
            }

            index++;
        }

        return false;
    }
}
