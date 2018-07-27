import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {Sequence} from './Sequence';


export interface ReadOnlySet<T> extends ReadOnlyCollection<T> {
    readonly comparator: EqualityComparator<T>;

    /**
     * Determines whether a set is a subset of a specified collection.
     */
    isSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isSupersetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
     */
    isProperSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isProperSupersetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified collection.
     */
    overlaps(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set and the specified collection contain the same elements.
     * This method ignores duplicate entries and the order of elements in the _other_ parameter.
     * If the collection represented by *other* is a HashSet<TItem> collection with the same equality comparer
     * as the current HashSet<TItem> object, this method is an O(n) operation.
     */
    setEquals(other: Sequence<T>): boolean;
}
