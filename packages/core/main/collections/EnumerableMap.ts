import {KeyValuePair} from './KeyValuePair';
import {MapIteratorFunction} from './MapIteratorFunction';


export interface EnumerableMap<K, V> extends Iterable<KeyValuePair<K, V>> {
    forEach(iterator: MapIteratorFunction<K, V, false | void>): void;
}
