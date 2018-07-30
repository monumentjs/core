import {Map} from '../mutable/Map';
import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {Sequence} from '../readonly/Sequence';
import {KeyValuePair} from '../KeyValuePair';
import {ReadOnlySet} from '../readonly/ReadOnlySet';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';


export interface MultiValueMap<K, V> extends Sequence<KeyValuePair<K, V>> {
    readonly isEmpty: boolean;
    readonly keys: ReadOnlySet<K>;
    readonly values: ReadOnlyList<V>;
    readonly keyComparator: EqualityComparator<K>;
    readonly valueComparator: EqualityComparator<V>;

    clear(): boolean;

    containsEntry(key: K, value: V): boolean;

    containsKey(key: K): boolean;

    containsValue(value: V): boolean;

    get(key: K): ReadOnlyList<V>;

    getFirst(key: K): V | undefined;

    getFirst(key: K, defaultValue: V): V;

    keyOf(value: V): K | undefined;

    put(key: K, value: V): V | undefined;

    putAll(values: Sequence<KeyValuePair<K, V>>): boolean;

    putIfAbsent(key: K, value: V): boolean;

    remove(key: K, value: V): boolean;

    removeAll(key: K): boolean;

    toArray(): Array<KeyValuePair<K, V>>;

    toSingleValueMap(): Map<K, V>;
}
