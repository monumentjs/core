import {IKeyValuePair} from './Abstraction/IKeyValuePair';
import {KeyValuePair} from './KeyValuePair';
import {EqualityComparator} from '../Core/EqualityComparator';
import {Collection} from './Collection';
import {IEnumerable} from './Abstraction/IEnumerable';
import {IMap} from './Abstraction/IMap';
import {ICollection} from './Abstraction/ICollection';
import {Set} from './Set';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {Enumerable} from './Enumerable';
import {ISet} from './Abstraction/ISet';


export class Map<K, V> extends Enumerable<IKeyValuePair<K, V>> implements IMap<K, V> {
    private _keyComparator: IEqualityComparator<K>;
    private _valueComparator: IEqualityComparator<V>;


    public get keyComparator(): IEqualityComparator<K> {
        return this._keyComparator;
    }


    public get valueComparator(): IEqualityComparator<V> {
        return this._valueComparator;
    }


    public get keys(): ISet<K> {
        const keys: Set<K> = new Set();

        for (let {key} of this) {
            keys.add(key);
        }

        return keys;
    }


    public get values(): ICollection<V> {
        const values: ICollection<V> = new Collection();

        for (let {value} of this) {
            values.add(value);
        }

        return values;
    }


    public constructor(
        values: IEnumerable<IKeyValuePair<K, V>> = [],
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance,
        valueComparator: IEqualityComparator<V> = EqualityComparator.instance
    ) {
        super();
        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;

        this.putAll(values);
    }


    public clone(): Map<K, V> {
        return new Map(this, this.keyComparator, this.valueComparator);
    }


    public put(key: K, value: V): V | undefined {
        const oldValue: V | undefined = this.remove(key);

        Array.prototype.push.call(this, new KeyValuePair(key, value));

        return oldValue;
    }


    public putAll(values: IEnumerable<IKeyValuePair<K, V>>): boolean {
        let hasOverridden: boolean = false;

        for (let {key, value} of values) {
            if (this.containsKey(key)) {
                hasOverridden = true;
            }

            this.put(key, value);
        }

        return hasOverridden;
    }


    public putIfAbsent(key: K, value: V): boolean {
        if (this.containsKey(key) === false) {
            this.put(key, value);

            return true;
        }

        return false;
    }


    public replace(key: K, newValue: V): V | undefined {
        if (this.containsKey(key)) {
            return this.put(key, newValue);
        }

        return undefined;
    }


    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        if (this.containsEntry(key, oldValue)) {
            this.put(key, newValue);

            return true;
        }

        return false;
    }


    public removeIf(key: K, value: V): boolean {
        if (this.containsEntry(key, value)) {
            this.remove(key);

            return true;
        }

        return false;
    }


    public get(key: K, defaultValue?: V): V | undefined {
        for (let pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return pair.value;
            }
        }

        return defaultValue;
    }


    public containsKey(key: K): boolean {
        for (let pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return true;
            }
        }

        return false;
    }


    public containsValue(value: V): boolean {
        for (let pair of this) {
            if (this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }


    public containsEntry(key: K, value: V): boolean {
        for (let pair of this) {
            if (this.keyComparator.equals(pair.key, key) && this.valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }


    public remove(key: K): V | undefined {
        let length: number = this.length;

        for (let index = 0; index < length; index++) {
            let pair: IKeyValuePair<K, V> | undefined = this[index];

            if (pair != null && this.keyComparator.equals(pair.key, key)) {
                Array.prototype.splice.call(this, index, 1);

                return pair.value;
            }
        }

        return undefined;
    }


    public clear(): boolean {
        if (this.length > 0) {
            this.resize(0);

            return true;
        }

        return false;
    }
}
