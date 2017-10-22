import {IMap} from './IMap';
import {List} from '../List';
import {IEnumerable} from './IEnumerable';


export interface IMultiValueMap<K, V> extends IMap<K, List<V>> {
    add(key: K, value: V): void;
    addAll(key: K, values: IEnumerable<V>): void;
    addAllFrom(values: IMap<K, IEnumerable<V>>): void;
    getFirst(key: K): V | undefined;
    setTo(key: K, value: V): void;
    setAllTo(values: IMap<K, V>): void;
    toSingleValueMap(): IMap<K, V>;
}
