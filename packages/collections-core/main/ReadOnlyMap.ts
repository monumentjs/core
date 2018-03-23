import {Equatable} from '@monument/core/main/Equatable';
import {Sequence} from './Sequence';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {EnumerableMap} from './EnumerableMap';


export interface ReadOnlyMap<K, V> extends EnumerableMap<K, V>, Equatable<ReadOnlyMap<K, V>>, Sequence {
    readonly keys: ReadOnlySet<K>;
    readonly values: ReadOnlyCollection<V>;

    get(key: K, defaultValue?: V): V | undefined;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    containsEntry(key: K, value: V): boolean;
}
