import { ICloneable } from '../types';
import { IEnumerable } from './IEnumerable';
import { IDictionary } from './IDictionary';
import { IKeyValuePair } from './IKeyValuePair';
import { IEqualityComparator } from './IEqualityComparator';
import { Enumerable } from './Enumerable';
import { ReadOnlyCollection } from './ReadOnlyCollection';
export declare class Dictionary<TKey, TValue> extends Enumerable<IKeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue>, ICloneable<Dictionary<TKey, TValue>> {
    private _keyComparator;
    readonly keys: ReadOnlyCollection<TKey>;
    readonly values: ReadOnlyCollection<TValue>;
    readonly keyComparator: IEqualityComparator<TKey>;
    constructor(list?: IEnumerable<IKeyValuePair<TKey, TValue>>, comparator?: IEqualityComparator<TKey>);
    clone(): Dictionary<TKey, TValue>;
    set(key: TKey, value: TValue): void;
    get(key: TKey, defaultValue?: TValue): TValue;
    containsKey(key: TKey): boolean;
    containsValue(value: TValue, valueComparator?: IEqualityComparator<TValue>): boolean;
    removeByKey(key: TKey): boolean;
    clear(): void;
}
