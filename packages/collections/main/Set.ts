import {Collection} from './Collection';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';


export interface Set<T> extends ReadOnlySet<T>, Collection<T> {

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     */
    intersectWith(other: ReadOnlyCollection<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     */
    symmetricExceptWith(other: ReadOnlyCollection<T>): boolean;
}
