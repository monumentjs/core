import {EqualityComparator} from '../../core/main/EqualityComparator';
import {Comparator} from '../../core/main/Comparator';
import {SortOrder} from './SortOrder';
import {IteratorFunction} from './IteratorFunction';
import {CombineFunction} from './CombineFunction';
import {List} from './List';
import {Grouping} from './Grouping';


export interface Queryable<T> {
    /**
     * Applies an accumulator function over a sequence.
     * The specified seed value is used as the initial accumulator value.
     */
    aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate,
        initialSeed: TAggregate
    ): TAggregate;

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    all(predicate: IteratorFunction<T, boolean>): boolean;

    /**
     * Determines whether any element of a sequence satisfies a condition.
     */
    any(predicate: IteratorFunction<T, boolean>): boolean;

    /**
     * Computes the average of a sequence of values that are obtained by invoking a transform function on each element
     * of the input sequence.
     */
    average(selector: IteratorFunction<T, number>): number;

    /**
     * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
     */
    concat(otherList: List<T>): List<T>;

    /**
     * Determines whether a sequence contains a specified element by using a specified IEqualityComparator<TItem>.
     */
    contains(otherItem: T, comparator?: EqualityComparator<T>): boolean;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     */
    count(predicate: IteratorFunction<T, boolean>): number;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    distinct(comparator?: EqualityComparator<T>): List<T>;

    /**
     * Produces the set difference of two sequences by using the specified IEqualityComparator<TItem> to compare values.
     */
    except(otherList: List<T>, comparator?: EqualityComparator<T>): List<T>;

    /**
     * Returns first item of list. If list is empty, returns default value.
     */
    first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined;

    /**
     * Returns first item of list. If list is empty, returns default value.
     */
    firstOrDefault(defaultValue: T): T;

    /**
     * Groups the elements of a sequence according to a specified methodName selector function.
     */
    groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparer?: EqualityComparator<TKey>
    ): List<Grouping<TKey, T>>;

    /**
     * Produces the set intersection of two sequences by using the specified IEqualityComparator<TItem> to compare values.
     */
    intersect(otherList: List<T>, comparator?: EqualityComparator<T>): List<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     * A specified IEqualityComparator<TItem> is used to compare keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: List<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): List<TResult>;

    /**
     * Returns last item of list. If list is empty, returns default value.
     */
    last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined;

    /**
     * Returns last item of list. If list is empty, returns default value.
     */
    lastOrDefault(defaultValue: T): T;

    /**
     * Invokes a transform function on each element of a sequence and returns the maximum resulting value.
     */
    max(selector: (item: T) => number): number;

    /**
     * Invokes a transform function on each element of a sequence and returns the minimum resulting value.
     */
    min(selector: (item: T) => number): number;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): List<T>;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): List<T>;

    /**
     * Projects each element of a sequence into a new form.
     */
    select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult>;

    /**
     * Projects each element of a sequence to an IList<TItem>, flattens the resulting sequences into one sequence,
     * and invokes a result selector function on each element therein.
     * The index of each source element is used in the intermediate projected form of that element.
     */
    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, List<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): List<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): List<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): List<T>;

    /**
     * Returns a specified number of contiguous elements from the run of a sequence.
     */
    take(length: number): List<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     */
    takeWhile(condition: IteratorFunction<T, boolean>): List<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: List<T>, comparator?: EqualityComparator<T>): List<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new List<TItem> containing items for which predicate function returned `true`.
     */
    where(predicate: IteratorFunction<T, boolean>): List<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: List<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult>;
}
