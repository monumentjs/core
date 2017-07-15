import {IGrouping} from './IGrouping';
import {IEnumerable} from './IEnumerable';
import {Collection} from './Collection';
import {Assert} from '../Assertion/Assert';

/**
 * Represents a collection of objects that have a common key.
 */
export class Grouping<TKey, TItem> extends Collection<TItem> implements IGrouping<TKey, TItem> {
    protected _key: TKey;


    public get key(): TKey {
        return this._key;
    }


    public constructor(key: TKey, items?: IEnumerable<TItem>) {
        Assert.argument('key', key).notNull();

        super(items);

        this._key = key;
    }
}
