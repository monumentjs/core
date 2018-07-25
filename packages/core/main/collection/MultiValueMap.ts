import {Map} from './Map';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {Sequence} from './Sequence';
import {ReadOnlyMap} from './ReadOnlyMap';


export interface MultiValueMap<K, V> extends Map<K, ReadOnlyCollection<V>> {
    add(key: K, value: V): void;
    addAll(key: K, values: Sequence<V>): void;
    addAllFrom(values: ReadOnlyMap<K, Sequence<V>>): void;
    getFirst(key: K): V | undefined;
    removeValue(key: K, value: V): boolean;
    setTo(key: K, value: V): void;
    setAllTo(values: ReadOnlyMap<K, V>): void;
    toSingleValueMap(): Map<K, V>;
}
