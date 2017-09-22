import {IEnumerable} from './IEnumerable';
import {IKeyValuePair} from './IKeyValuePair';
import {IReadOnlyMap} from './IReadOnlyMap';
import {IEquatable} from '../../Core/Abstraction/IEquatable';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {ICloneable} from '../../Core/Abstraction/ICloneable';


export interface IMap<K, V> extends IReadOnlyMap<K, V>, IEquatable<IMap<K, V>>, ICloneable<IMap<K, V>> {
    readonly keyComparator: IEqualityComparator<K>;
    readonly valueComparator: IEqualityComparator<V>;

    put(key: K, value: V): V | undefined;
    putAll(values: IEnumerable<IKeyValuePair<K, V>>): boolean;
    putIfAbsent(key: K, value: V): boolean;
    replace(key: K, newValue: V): V | undefined;
    replaceIf(key: K, oldValue: V, newValue: V): boolean;
    remove(key: K): V | undefined;
    removeIf(key: K, value: V): boolean;
    clear(): boolean;
}
