import {ICollection} from './ICollection';
import {IEqualityComparator} from './IEqualityComparator';
import {IEnumerable} from './IEnumerable';


export interface ISet<T> extends ICollection<T> {
    readonly comparator: IEqualityComparator<T>;

    /**
     * Adds an element to the current set and returns a value to indicate if the element was successfully added.
     * @param item
     */
    add(item: T): boolean;

    /**
     * Determines whether the ISet<T> contains a specific value.
     * @param item
     */
    contains(item: T): boolean;

    /**
     * Removes all elements in the specified collection from the current set.
     * @param other
     */
    exceptWith(other: IEnumerable<T>): void;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     * @param other
     */
    intersectWith(other: IEnumerable<T>): void;

    /**
     * Determines whether a set is a subset of a specified collection.
     * @param other
     */
    isSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     * @param other
     */
    isSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified collection.
     * @param other
     */
    isProperSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     * @param other
     */
    isProperSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified collection.
     * @param other
     */
    overlaps(other: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set and the specified collection contain the same elements.
     * This method ignores duplicate entries and the order of elements in the _other_ parameter.
     * If the collection represented by *other* is a HashSet<T> collection with the same equality comparer
     * as the current HashSet<T> object, this method is an O(n) operation.
     */
    setEquals(other: IEnumerable<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     * @param other
     */
    symmetricExceptWith(other: IEnumerable<T>): void;

    /**
     * Modifies the current set so that it contains all elements that are present in the current set,
     * in the specified collection, or in both.
     * @param other
     */
    unionWith(other: IEnumerable<T>): void;
}
