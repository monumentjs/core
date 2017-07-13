import { IEnumerable } from './IEnumerable';
export interface IGrouping<TKey, TValue> extends IEnumerable<TValue> {
    readonly key: TKey;
}
