import { ReadOnlySet } from '../readonly/ReadOnlySet';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Set<T> extends ReadOnlySet<T> {
    add(item: T): boolean;

    addAll(items: Iterable<T>): boolean;

    clear(): boolean;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     */
    intersectWith(other: Iterable<T>): boolean;

    remove(item: T): boolean;

    removeAll(items: Iterable<T>): boolean;

    removeBy(predicate: (item: T) => boolean): boolean;

    retainAll(items: Iterable<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     */
    symmetricExceptWith(other: Iterable<T>): boolean;

    /**
     * Modifies the current set so that it contains all elements that are present in the current set,
     * in the specified collection, or in both.
     */
    unionWith(other: Iterable<T>): boolean;
}
