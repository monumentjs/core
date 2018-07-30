import {KeyValuePair} from '../KeyValuePair';
import {ReadOnlyMap} from '../readonly/ReadOnlyMap';
import {Sequence} from '../readonly/Sequence';
import {IteratorFunction} from '../IteratorFunction';


export interface Map<K, V> extends ReadOnlyMap<K, V> {
    clear(): boolean;

    put(key: K, value: V): V | undefined;

    putAll(values: Sequence<KeyValuePair<K, V>>): boolean;

    putIfAbsent(key: K, value: V): boolean;

    remove(key: K): V | undefined;

    removeIf(key: K, value: V): boolean;

    removeBy(predicate: IteratorFunction<KeyValuePair<K, V>, boolean>): boolean;

    replace(key: K, newValue: V): V | undefined;

    replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
