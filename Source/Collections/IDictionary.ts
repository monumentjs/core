import {IKeyValuePair} from './IKeyValuePair';
import {IEqualityComparator} from './IEqualityComparator';
import {IEnumerable} from './IEnumerable';


export interface IDictionary<TKey, TValue> extends IEnumerable<IKeyValuePair<TKey, TValue>> {
    readonly keys: IEnumerable<TKey>;
    readonly values: IEnumerable<TValue>;
    readonly keyComparator: IEqualityComparator<TKey>;

    set(key: TKey, value: TValue): void;
    get(key: TKey, defaultValue?: TValue): TValue;

    containsKey(key: TKey): boolean;
    containsValue(value: TValue, valueComparator?: IEqualityComparator<TValue>): boolean;

    removeByKey(key: TKey): boolean;

    clear(): void;
}
