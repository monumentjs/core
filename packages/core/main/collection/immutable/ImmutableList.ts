import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {ImmutableCollection} from './ImmutableCollection';
import {Sequence} from '../readonly/Sequence';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {Grouping} from '../Grouping';
import {CombineFunction} from '../CombineFunction';
import {Comparator} from '../../utils/comparison/Comparator';
import {SortOrder} from '../SortOrder';


export interface ImmutableList<T> extends ReadOnlyList<T>, ImmutableCollection<T> {
    add(item: T): ImmutableList<T>;
    addAll(items: Sequence<T>): ImmutableList<T>;
    remove(item: T): ImmutableList<T>;
    remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
    removeAll(items: Sequence<T>): ImmutableList<T>;
    removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;
    retainAll(items: Sequence<T>): ImmutableList<T>;
    retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    clear(): ImmutableList<T>;

    /**
     * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
     */
    concat(otherList: Sequence<T>): ImmutableList<T>;

    /**
     * Returns distinct elements from a sequence.
     */
    distinct(): ImmutableList<T>;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    distinct(comparator: EqualityComparator<T>): ImmutableList<T>;

    /**
     * Produces the set difference of two sequences.
     */
    except(otherList: Sequence<T>): ImmutableList<T>;

    /**
     * Produces the set difference of two sequences by using the specified EqualityComparator to compare values.
     */
    except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new list containing items for which predicate function returned `true`.
     */
    findAll(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ImmutableList<Grouping<TKey, T>>;

    /**
     * Groups the elements of a sequence according to a specified key selector function and key equality comparator.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): ImmutableList<Grouping<TKey, T>>;

    /**
     * Produces the set intersection of two sequences.
     */
    intersect(otherList: Sequence<T>): ImmutableList<T>;

    /**
     * Produces the set intersection of two sequences by using the specified EqualityComparator<T> to compare values.
     */
    intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): ImmutableList<TResult>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     * A specified EqualityComparator is used to compare keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): ImmutableList<TResult>;

    /**
     * Projects each element of a sequence into a new form.
     */
    map<TResult>(selector: IteratorFunction<T, TResult>): ImmutableList<TResult>;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: Comparator<TKey>
    ): ImmutableList<T>;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): ImmutableList<T>;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): ImmutableList<T>;

    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ImmutableList<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): ImmutableList<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T>;

    slice(offset: number): ImmutableList<T>;

    slice(offset: number, length: number): ImmutableList<T>;

    /**
     * Returns a specified number of contiguous elements from the run of a sequence.
     */
    take(length: number): ImmutableList<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     */
    takeWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>): ImmutableList<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): ImmutableList<TResult>;
}
