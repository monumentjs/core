import {ReadOnlyMultiValueMap} from '../readonly/ReadOnlyMultiValueMap';
import {Sequence} from '../../base/Sequence';
import {ReadOnlyMap} from '../../map/readonly/ReadOnlyMap';
import {KeyValuePair} from '../../base/KeyValuePair';
import {ReadOnlyList} from '../../list/readonly/ReadOnlyList';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface MultiValueMap<K, V> extends ReadOnlyMultiValueMap<K, V> {
    clear(): boolean;

    put(key: K, value: V): boolean;

    putAll(entries: Sequence<KeyValuePair<K, V>>): boolean;

    putIfAbsent(key: K, value: V): boolean;

    putMap(map: ReadOnlyMap<K, V>): boolean;

    putValues(key: K, values: Sequence<V>): boolean;

    remove(key: K): ReadOnlyList<V> | undefined;

    removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean;

    removeIf(key: K, value: V): boolean;

    replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
