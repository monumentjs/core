import {IGrouping} from './IGrouping';
import {IEnumerable} from './IEnumerable';
import {Collection} from './Collection';
import {assertArgumentNotNull} from '../Assertion/Assert';

/**
 * Represents a collection of objects that have a common key.
 */
export class Grouping<TKey, TItem> extends Collection<TItem> implements IGrouping<TKey, TItem> {
    protected _key: TKey;
    
    
    public get key(): TKey {
        return this._key;
    }
    
    
    public constructor(key: TKey, items?: IEnumerable<TItem>) {
        assertArgumentNotNull('key', key);

        super(items);

        this._key = key;
    }
}
