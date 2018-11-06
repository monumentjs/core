import {ToArray} from '../../base/ToArray';
import {Sequence} from '../../base/Sequence';
import {ReadOnlySet} from '../../set/readonly/ReadOnlySet';
import {ReadOnlyMap} from '../../map/readonly/ReadOnlyMap';
import {ReadOnlyList} from '../../list/readonly/ReadOnlyList';
import {KeyValuePair} from '../../base/KeyValuePair';
import {ToJSON} from '../../../base/ToJSON';
import {Equatable} from '../../../comparison/equality/Equatable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyMultiValueMap<K, V> extends
    Sequence<KeyValuePair<K, V>>,
    Equatable<Sequence<KeyValuePair<K, V>>>,
    ToArray<KeyValuePair<K, V>>,
    ToJSON<Array<KeyValuePair<K, V>>> {

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

    get(key: K): ReadOnlyList<V>;

    getFirst(key: K): V | undefined;

    getFirst(key: K, defaultValue: V): V;

    keyOf(value: V): K | undefined;

    keysOf(value: V): ReadOnlyList<K>;

    toSingleValueMap(): ReadOnlyMap<K, V>;
}
