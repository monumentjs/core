import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {IteratorFunction} from '../IteratorFunction';
import {Grouping} from '../Grouping';
import {Comparator} from '../../utils/comparison/Comparator';
import {CombineFunction} from '../CombineFunction';
import {SortOrder} from '../SortOrder';
import {Sequence} from './Sequence';


export interface ReadOnlyList<T> extends ReadOnlyCollection<T> {
    readonly firstIndex: number;
    readonly lastIndex: number;

    /**
     * Applies an accumulator function over a sequence.
     * The specified seed payload is used as the initial accumulator payload.
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
    concat(otherList: Sequence<T>): ReadOnlyList<T>;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     */
    count(predicate: IteratorFunction<T, boolean>): number;

    /**
     * Returns distinct elements from a sequence.
     */
    distinct(): ReadOnlyList<T>;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    distinct(comparator: EqualityComparator<T>): ReadOnlyList<T>;

    /**
     * Produces the set difference of two sequences.
     */
    except(otherList: Sequence<T>): ReadOnlyList<T>;

    /**
     * Produces the set difference of two sequences by using the specified EqualityComparator to compare values.
     */
    except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyList<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new list containing items for which predicate function returned `true`.
     */
    findAll(predicate: IteratorFunction<T, boolean>): ReadOnlyList<T>;

    /**
     * Returns first item of list. If list is empty, returns default payload.
     */
    first(predicate: IteratorFunction<T, boolean>): T | undefined;

    first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    /**
     * Returns first item of list. If list is empty, returns default payload.
     */
    firstOrDefault(defaultValue: T): T;

    getAt(index: number): T;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ReadOnlyList<Grouping<TKey, T>>;

    /**
     * Groups the elements of a sequence according to a specified key selector function and key equality comparator.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): ReadOnlyList<Grouping<TKey, T>>;

    indexOf(item: T): number;

    indexOf(item: T, comparator: EqualityComparator<T>): number;

    indexOf(item: T, startIndex: number): number;

    indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    indexOf(item: T, startIndex: number, count: number): number;

    indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    /**
     * Produces the set intersection of two sequences.
     */
    intersect(otherList: Sequence<T>): ReadOnlyList<T>;

    /**
     * Produces the set intersection of two sequences by using the specified EqualityComparator<T> to compare values.
     */
    intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyList<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): ReadOnlyList<TResult>;

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
    ): ReadOnlyList<TResult>;

    /**
     * Returns last item of list. If list is empty, returns default payload.
     */
    last(predicate: IteratorFunction<T, boolean>): T | undefined;

    last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    lastIndexOf(item: T): number;

    lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T, startIndex: number): number;

    lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T, startIndex: number, count: number): number;

    lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    /**
     * Returns last item of list. If list is empty, returns default payload.
     */
    lastOrDefault(defaultValue: T): T;

    /**
     * Projects each element of a sequence into a new form.
     */
    map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyList<TResult>;

    /**
     * Invokes a transform function on each element of a sequence and returns the maximum resulting payload.
     */
    max(selector: IteratorFunction<T, number>): number;

    /**
     * Invokes a transform function on each element of a sequence and returns the minimum resulting payload.
     */
    min(selector: IteratorFunction<T, number>): number;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): ReadOnlyList<T>;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): ReadOnlyList<T>;

    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ReadOnlyList<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): ReadOnlyList<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): ReadOnlyList<T>;

    slice(offset: number): ReadOnlyList<T>;

    slice(offset: number, length: number): ReadOnlyList<T>;

    /**
     * Returns a specified number of contiguous elements from the run of a sequence.
     */
    take(length: number): ReadOnlyList<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     */
    takeWhile(condition: IteratorFunction<T, boolean>): ReadOnlyList<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>): ReadOnlyList<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyList<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): ReadOnlyList<TResult>;
}
