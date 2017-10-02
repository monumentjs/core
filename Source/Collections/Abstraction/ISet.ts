import {ICollection} from './ICollection';
import {IEnumerable} from './IEnumerable';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';


export interface ISet<T> extends ICollection<T> {
    readonly comparator: IEqualityComparator<T>;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     */
    intersectWith(other: IEnumerable<T>): boolean;

    /**
     * Determines whether a set is a subset of a specified collection.
     */
    isSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
     */
    isProperSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isProperSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified collection.
     */
    overlaps(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set and the specified collection contain the same elements.
     * This method ignores duplicate entries and the order of elements in the _other_ parameter.
     * If the collection represented by *other* is a HashSet<TItem> collection with the same equality comparer
     * as the current HashSet<TItem> object, this method is an O(n) operation.
     */
    setEquals(other: IEnumerable<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     */
    symmetricExceptWith(other: IEnumerable<T>): boolean;
}
