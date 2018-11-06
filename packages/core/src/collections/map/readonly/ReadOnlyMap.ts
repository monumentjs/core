import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {ReadOnlySet} from '../../set/readonly/ReadOnlySet';
import {KeyValuePair} from '../../base/KeyValuePair';
import {ReadOnlyList} from '../../list/readonly/ReadOnlyList';
import {Sequence} from '../../base/Sequence';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyMap<K, V> extends Sequence<KeyValuePair<K, V>> {
    readonly isEmpty: boolean;
    readonly keys: ReadOnlySet<K>;
    readonly values: ReadOnlyList<V>;
    readonly keyComparator: EqualityComparator<K>;
    readonly valueComparator: EqualityComparator<V>;

    containsEntries(entries: Sequence<KeyValuePair<K, V>>): boolean;

    containsEntry(key: K, value: V): boolean;

    containsKey(key: K): boolean;

    containsKeys(keys: Sequence<K>): boolean;

    containsValue(value: V): boolean;

    containsValues(values: Sequence<V>): boolean;

    get(key: K): V | undefined;

    get(key: K, defaultValue: V): V;

    keyOf(value: V): K | undefined;

    keysOf(value: V): ReadOnlyList<K>;
}
