import { IGrouping } from './IGrouping';
import { IEnumerable } from './IEnumerable';
import { Collection } from './Collection';
export declare class Grouping<TKey, TItem> extends Collection<TItem> implements IGrouping<TKey, TItem> {
    protected _key: TKey;
    readonly key: TKey;
    constructor(key: TKey, items?: IEnumerable<TItem>);
}
