import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {KeyValuePair} from '../KeyValuePair';
import {Enumerable} from './Enumerable';


export interface ReadOnlyMap<K, V> extends Enumerable<KeyValuePair<K, V>> {
    readonly keys: ReadOnlySet<K>;
    readonly values: ReadOnlyCollection<V>;
    readonly keyComparator: EqualityComparator<K>;
    readonly valueComparator: EqualityComparator<V>;

    containsEntry(key: K, value: V): boolean;

    containsKey(key: K): boolean;

    containsValue(value: V): boolean;

    get(key: K): V | undefined;

    get(key: K, defaultValue: V): V;

    keyOf(value: V): K | undefined;
}
