import {EqualityComparator} from '../../core/main/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';


export interface ReadOnlySet<T> extends ReadOnlyCollection<T> {
    readonly comparator: EqualityComparator<T>;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     */
    intersectWith(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether a set is a subset of a specified collection.
     */
    isSubsetOf(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isSupersetOf(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
     */
    isProperSubsetOf(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isProperSupersetOf(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified collection.
     */
    overlaps(other: ReadOnlyCollection<T>): boolean;

    /**
     * Determines whether the current set and the specified collection contain the same elements.
     * This method ignores duplicate entries and the order of elements in the _other_ parameter.
     * If the collection represented by *other* is a HashSet<TItem> collection with the same equality comparer
     * as the current HashSet<TItem> object, this method is an O(n) operation.
     */
    setEquals(other: ReadOnlyCollection<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     */
    symmetricExceptWith(other: ReadOnlyCollection<T>): boolean;
}
