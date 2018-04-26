import {Equatable} from '@monument/core/main/Equatable';
import {ReadOnlyMap} from './ReadOnlyMap';
import {KeyValuePair} from './KeyValuePair';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {MapIteratorFunction} from './MapIteratorFunction';


export abstract class AbstractReadOnlyMap<K, V> implements ReadOnlyMap<K, V>, Equatable<ReadOnlyMap<K, V>> {
    public abstract get length(): number;
    public abstract get isEmpty(): boolean;

    public abstract get keys(): ReadOnlySet<K>;
    public abstract get values(): ReadOnlyCollection<V>;

    public abstract containsEntry(key: K, value: V): boolean;
    public abstract containsKey(key: K): boolean;
    public abstract containsValue(value: V): boolean;

    public abstract get(key: K, defaultValue?: V): V | undefined;

    public equals(other: ReadOnlyMap<K, V>): boolean {
        if (this === other) {
            return true;
        }

        if (this.keys.length !== other.keys.length) {
            return false;
        }

        for (let {key, value} of this) {
            if (!other.containsEntry(key, value)) {
                return false;
            }
        }

        for (let {key, value} of other) {
            if (!this.containsEntry(key, value)) {
                return false;
            }
        }

        return true;
    }


    public [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        return this.iterator;
    }


    public forEach(iterator: MapIteratorFunction<K, V, false | void>): void {
        for (let {key, value} of this) {
            if (iterator(value, key) === false) {
                break;
            }
        }
    }


    protected abstract get iterator(): Iterator<KeyValuePair<K, V>>;
}
