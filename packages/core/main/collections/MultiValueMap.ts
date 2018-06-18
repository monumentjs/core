import {Enumerable} from './Enumerable';
import {Map} from './Map';
import {ReadOnlyCollection} from './ReadOnlyCollection';


export interface MultiValueMap<K, V> extends Map<K, ReadOnlyCollection<V>> {
    add(key: K, value: V): void;
    addAll(key: K, values: Enumerable<V>): void;
    addAllFrom(values: Map<K, Enumerable<V>>): void;
    getFirst(key: K): V | undefined;
    removeValue(key: K, value: V): boolean;
    setTo(key: K, value: V): void;
    setAllTo(values: Map<K, V>): void;
    toSingleValueMap(): Map<K, V>;
}
