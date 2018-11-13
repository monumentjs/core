import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {Sequence} from '../../base/Sequence';
import {Queryable} from '../../base/Queryable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlySet<T> extends Queryable<T> {
    readonly comparator: EqualityComparator<T>;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
     *
     * @remarks
     * If the current set is a proper subset of other, other must have at least one element that the current set does not have.
     *
     * An empty set is a proper subset of any other collection.
     * Therefore, this method returns true if the current set is empty, unless the other parameter is also an empty set.
     *
     * This method always returns false if the current set has more or the same number of elements than other.
     */
    isProperSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isProperSupersetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether a set is a subset of a specified collection.
     */
    isSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     */
    isSupersetOf(other: Sequence<T>): boolean;

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
