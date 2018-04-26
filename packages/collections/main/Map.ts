import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {Cloneable} from '@monument/core/main/Cloneable';
import {KeyValuePair} from './KeyValuePair';
import {ReadOnlyMap} from './ReadOnlyMap';


export interface Map<K, V> extends ReadOnlyMap<K, V>, Cloneable<Map<K, V>> {
    readonly keyComparator: EqualityComparator<K>;
    readonly valueComparator: EqualityComparator<V>;

    put(key: K, value: V): V | undefined;
    putAll(values: Iterable<KeyValuePair<K, V>>): boolean;
    putIfAbsent(key: K, value: V): boolean;
    replace(key: K, newValue: V): V | undefined;
    replaceIf(key: K, oldValue: V, newValue: V): boolean;
    remove(key: K): V | undefined;
    removeIf(key: K, value: V): boolean;
    clear(): boolean;
}
