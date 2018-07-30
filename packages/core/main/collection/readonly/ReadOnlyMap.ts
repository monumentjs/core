import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlySet} from './ReadOnlySet';
import {KeyValuePair} from '../KeyValuePair';
import {ReadOnlyList} from './ReadOnlyList';
import {Sequence} from './Sequence';


export interface ReadOnlyMap<K, V> extends Sequence<KeyValuePair<K, V>> {
    readonly isEmpty: boolean;
    readonly keys: ReadOnlySet<K>;
    readonly values: ReadOnlyList<V>;
    readonly keyComparator: EqualityComparator<K>;
    readonly valueComparator: EqualityComparator<V>;

    containsEntry(key: K, value: V): boolean;

    containsKey(key: K): boolean;

    containsValue(value: V): boolean;

    get(key: K): V | undefined;

    get(key: K, defaultValue: V): V;

    keyOf(value: V): K | undefined;
}
