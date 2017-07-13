import { Collection } from './Collection';
import { IEqualityComparator } from './IEqualityComparator';
import { IKeyValuePair } from './IKeyValuePair';
export declare class KeyValueCollection<TKey, TValue> extends Collection<IKeyValuePair<TKey, TValue>> {
    put(key: TKey, value: TValue): void;
    removeByKey(key: TKey, keyComparator?: IEqualityComparator<TKey>): void;
    removeAllByKey(key: TKey, keyComparator?: IEqualityComparator<TKey>): void;
    findByKey(key: TKey, keyComparator?: IEqualityComparator<TKey>): TValue;
    findAllByKey(key: TKey, keyComparator?: IEqualityComparator<TKey>): Collection<TValue>;
}
