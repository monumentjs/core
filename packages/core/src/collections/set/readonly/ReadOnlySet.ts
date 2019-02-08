import { EqualityComparator } from '../../../comparison/equality/EqualityComparator';
import { Sequence } from '../../base/Sequence';
import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';
import { Equatable } from '../../../comparison/equality/Equatable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlySet<T> extends ReadOnlyCollection<T>, Equatable<ReadOnlySet<T>> {
    readonly comparator: EqualityComparator<T>;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
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
