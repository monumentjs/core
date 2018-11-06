import {Sequence} from '../../base/Sequence';
import {IteratorFunction} from '../../base/IteratorFunction';
import {ObservableSet} from '../observable/ObservableSet';
import {Cloneable} from '../../../base/Cloneable';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Set<T> extends ObservableSet<T>, Cloneable<Set<T>> {
    add(item: T): boolean;

    addAll(items: Sequence<T>): boolean;

    clear(): boolean;

    clone(): Set<T>;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     */
    intersectWith(other: Sequence<T>): boolean;

    remove(item: T): boolean;

    removeAll(items: Sequence<T>): boolean;

    removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    retainAll(items: Sequence<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or
     * in the specified collection, but not both.
     */
    symmetricExceptWith(other: Sequence<T>): boolean;

    /**
     * Modifies the current set so that it contains all elements that are present in the current set,
     * in the specified collection, or in both.
     */
    unionWith(other: Sequence<T>): boolean;
}
