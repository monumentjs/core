import {IEnumerable} from './IEnumerable';

/**
 * Represents a collection of objects that have a common key.
 */
export interface IGrouping<TKey, TValue> extends IEnumerable<TValue> {
    /**
     * Gets the key of the IGrouping<TKey, TValue>.
     */
    readonly key: TKey;
}

