import {IKeyValuePair} from './IKeyValuePair';
import {ICollection} from './ICollection';
import {IEqualityComparator} from './IEqualityComparator';


export interface IDictionary<TKey, TValue> extends ICollection<IKeyValuePair<TKey, TValue>> {
    readonly keys: ICollection<TKey>;
    readonly values: ICollection<TValue>;
    readonly comparator: IEqualityComparator<TKey>;
    
    set(key: TKey, value: TValue): void;
    get(key: TKey, defaultValue?: TValue): TValue;
    
    containsKey(key: TKey): boolean;
    containsValue(value: TValue): boolean;
    
    removeByKey(key: TKey): boolean;
}
