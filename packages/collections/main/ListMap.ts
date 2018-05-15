import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {KeyValuePair} from './KeyValuePair';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {ArrayList} from './ArrayList';
import {ListSet} from './ListSet';
import {AbstractMap} from './AbstractMap';


export class ListMap<K, V> extends AbstractMap<K, V> {
    private _mapping: ArrayList<KeyValuePair<K, V>> = new ArrayList();


    public get length(): number {
        return this._mapping.length;
    }


    public get isEmpty(): boolean {
        return this._mapping.isEmpty;
    }


    public get keys(): ReadOnlySet<K> {
        const keys: ListSet<K> = new ListSet(undefined, this.keyComparator);

        for (const {key} of this) {
            keys.add(key);
        }

        return keys;
    }


    public get values(): ReadOnlyCollection<V> {
        const values: ArrayList<V> = new ArrayList();

        for (const {value} of this) {
            values.add(value);
        }

        return values;
    }


    public get iterator(): Iterator<KeyValuePair<K, V>> {
        return this._mapping.iterator;
    }


    public constructor(
        items?: Iterable<KeyValuePair<K, V>>,
        keyComparator?: EqualityComparator<K>,
        valueComparator?: EqualityComparator<V>
    ) {
        super(keyComparator, valueComparator);

        if (items) {
            this.putAll(items);
        }
    }


    public clone(): ListMap<K, V> {
        return new ListMap(this, this.keyComparator, this.valueComparator);
    }


    public put(key: K, value: V): V | undefined {
        let newPair: KeyValuePair<K, V> = new KeyValuePair(key, value);
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._mapping.setAt(index, newPair);

                return pair.value;
            }

            index++;
        }

        this._mapping.add(newPair);

        return undefined;
    }


    public putAll(values: Iterable<KeyValuePair<K, V>>): boolean {
        let hasOverridden: boolean = false;

        for (const newPair of values) {
            let index: number = 0;
            let isReplaced: boolean = false;

            for (const pair of this._mapping) {
                if (this.keyComparator.equals(pair.key, newPair.key)) {
                    this._mapping.setAt(index, newPair);

                    isReplaced = true;

                    break;
                }

                index++;
            }

            if (!isReplaced) {
                this._mapping.add(newPair);
            }

            hasOverridden = true;
        }

        return hasOverridden;
    }


    public putIfAbsent(key: K, value: V): boolean {
        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                return false;
            }
        }

        this._mapping.add(new KeyValuePair(key, value));

        return true;
    }


    public removeIf(key: K, value: V): boolean {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key) && this.valueComparator.equals(value, pair.value)) {
                this._mapping.removeAt(index);

                return true;
            }

            index++;
        }

        return false;
    }


    public remove(key: K): V | undefined {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._mapping.removeAt(index);

                return pair.value;
            }

            index++;
        }

        return undefined;
    }


    public replace(key: K, newValue: V): V | undefined {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return pair.value;
            }

            index++;
        }

        return undefined;
    }


    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key) && this.valueComparator.equals(oldValue, pair.value)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return true;
            }

            index++;
        }

        return false;
    }


    public get(key: K, defaultValue?: V): V | undefined {
        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                return pair.value;
            }
        }

        return defaultValue;
    }


    public containsKey(key: K): boolean {
        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                return true;
            }
        }

        return false;
    }


    public containsValue(value: V): boolean {
        for (const pair of this._mapping) {
            if (this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }


    public containsEntry(key: K, value: V): boolean {
        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key) && this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }


    public clear(): boolean {
        return this._mapping.clear();
    }
}
