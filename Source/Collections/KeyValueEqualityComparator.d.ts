import { IEqualityComparator } from './IEqualityComparator';
import { IKeyValuePair } from './IKeyValuePair';
export declare class KeyValueEqualityComparator<TKey, TValue> implements IEqualityComparator<IKeyValuePair<TKey, TValue>> {
    static readonly instance: KeyValueEqualityComparator<any, any>;
    equals(x: IKeyValuePair<TKey, TValue>, y: IKeyValuePair<TKey, TValue>): boolean;
}
