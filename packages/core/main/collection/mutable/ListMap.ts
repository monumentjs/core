import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {KeyValuePair} from '../KeyValuePair';
import {ReadOnlySet} from '../readonly/ReadOnlySet';
import {ArrayList} from './ArrayList';
import {ListSet} from './ListSet';
import {Sequence} from '../readonly/Sequence';
import {ZERO} from '../../Constants';
import {Cloneable} from '../../Cloneable';
import {AbstractReadOnlyMap} from '../readonly/AbstractReadOnlyMap';
import {Map} from './Map';
import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {IteratorFunction} from '../IteratorFunction';


export class ListMap<K, V> extends AbstractReadOnlyMap<K, V> implements Map<K, V>, Cloneable<ListMap<K, V>> {
    private _mapping: ArrayList<KeyValuePair<K, V>> = new ArrayList();

    public get keys(): ReadOnlySet<K> {
        const keys: ListSet<K> = new ListSet(undefined, this.keyComparator);

        for (const {key} of this) {
            keys.add(key);
        }

        return keys;
    }

    public get length(): number {
        return this._mapping.length;
    }

    public get values(): ReadOnlyList<V> {
        const values: ArrayList<V> = new ArrayList();

        for (const {value} of this) {
            values.add(value);
        }

        return values;
    }

    public constructor(
        items?: Sequence<KeyValuePair<K, V>>,
        keyComparator?: EqualityComparator<K>,
        valueComparator?: EqualityComparator<V>
    ) {
        super(keyComparator, valueComparator);

        if (items) {
            this.putAll(items);
        }
    }

    public [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        return this._mapping[Symbol.iterator]();
    }

    public clear(): boolean {
        return this._mapping.clear();
    }

    public clone(): ListMap<K, V> {
        return new ListMap(this, this.keyComparator, this.valueComparator);
    }

    public put(key: K, value: V): V | undefined {
        let newPair: KeyValuePair<K, V> = new KeyValuePair(key, value);
        let index: number = ZERO;

        for (const pair of this._mapping) {
            if (this.checkEquality(pair.key, key, this.keyComparator)) {
                this._mapping.setAt(index, newPair);

                return pair.value;
            }

            index++;
        }

        this._mapping.add(newPair);

        return undefined;
    }

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        let hasOverridden: boolean = false;

        for (const newPair of values) {
            let index: number = ZERO;
            let isReplaced: boolean = false;

            for (const pair of this._mapping) {
                if (this.checkEquality(pair.key, newPair.key, this.keyComparator)) {
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
            if (this.checkEquality(pair.key, key, this.keyComparator)) {
                return false;
            }
        }

        this._mapping.add(new KeyValuePair(key, value));

        return true;
    }

    public remove(key: K): V | undefined {
        let index: number = ZERO;

        for (const pair of this._mapping) {
            if (this.checkEquality(pair.key, key, this.keyComparator)) {
                this._mapping.removeAt(index);

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public removeBy(predicate: IteratorFunction<KeyValuePair<K, V>, boolean>): boolean {
        return this._mapping.removeBy(predicate);
    }

    public removeIf(key: K, value: V): boolean {
        let index: number = ZERO;

        for (const pair of this._mapping) {
            if (this.checkEquality(key, pair.key, this.keyComparator) &&
                this.checkEquality(value, pair.value, this.valueComparator)) {
                this._mapping.removeAt(index);

                return true;
            }

            index++;
        }

        return false;
    }

    public replace(key: K, newValue: V): V | undefined {
        let index: number = ZERO;

        for (const pair of this._mapping) {
            if (this.checkEquality(key, pair.key, this.keyComparator)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        let index: number = ZERO;

        for (const pair of this._mapping) {
            if (this.checkEquality(key, pair.key, this.keyComparator) && this.checkEquality(oldValue, pair.value, this.valueComparator)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return true;
            }

            index++;
        }

        return false;
    }
}
