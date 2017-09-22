import {IKeyValuePair} from './IKeyValuePair';
import {ICollection} from './ICollection';
import {IEnumerable} from './IEnumerable';


export interface IReadOnlyMap<K, V> extends IEnumerable<IKeyValuePair<K, V>> {
    readonly isEmpty: boolean;
    readonly keys: ICollection<K>;
    readonly values: ICollection<V>;

    get(key: K): V | undefined;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    containsEntry(key: K, value: V): boolean;
}
