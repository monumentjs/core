import {Sequence} from './Sequence';
import {Grouping} from './Grouping';
import {IteratorFunction} from './IteratorFunction';
import {CombineFunction} from './CombineFunction';
import {SelectorFunction} from './SelectorFunction';
import {AggregateFunction} from './AggregateFunction';
import {EqualityComparator} from '../../comparison/equality/EqualityComparator';
import {Comparator} from '../../comparison/order/Comparator';
import {SortOrder} from '../../comparison/order/SortOrder';
import {Equatable} from '../../comparison/equality/Equatable';
import {ToJSON} from '../../base/ToJSON';
import {ToArray} from './ToArray';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Queryable<T> extends Sequence<T>, ToJSON<T[]>, ToArray<T>, Equatable<Sequence<T>> {
    readonly isEmpty: boolean;

    /**
     * Applies an accumulator function over a sequence.
     * The specified seed payload is used as the initial accumulator payload.
     */
    aggregate<TAggregate>(
        iterator: AggregateFunction<T, TAggregate>,
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
    concat(otherList: Sequence<T>): Queryable<T>;

    contains(item: T): boolean;

    contains(item: T, comparator: EqualityComparator<T>): boolean;

    containsAll(items: Sequence<T>): boolean;

    containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     */
    count(predicate: IteratorFunction<T, boolean>): number;

    /**
     * Returns distinct elements from a sequence.
     */
    distinct(): Queryable<T>;

    /**
     * Returns distinct elements from a sequence by using a specified EqualityComparator<TItem> to compare values.
     */
    distinct(comparator: EqualityComparator<T>): Queryable<T>;

    equals(otherList: Sequence<T>): boolean;

    equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    /**
     * Produces the set difference of two sequences.
     */
    except(items: Sequence<T>): Queryable<T>;

    /**
     * Produces the set difference of two sequences by using the specified EqualityComparator to compare values.
     */
    except(items: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new list containing items for which predicate function returned `true`.
     */
    findAll(predicate: IteratorFunction<T, boolean>): Queryable<T>;

    /**
     * Returns first item of list. If list is empty, returns default payload.
     */
    first(predicate: IteratorFunction<T, boolean>): T | undefined;

    first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    /**
     * Returns first item of list. If list is empty, returns default payload.
     */
    firstOrDefault(defaultValue: T): T;

    forEach(iterator: IteratorFunction<T, boolean | void>): void;

    forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): Queryable<Grouping<TKey, T>>;

    /**
     * Groups the elements of a sequence according to a specified key selector function and key equality comparator.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): Queryable<Grouping<TKey, T>>;

    /**
     * Produces the set intersection of two sequences.
     */
    intersect(otherList: Sequence<T>): Queryable<T>;

    /**
     * Produces the set intersection of two sequences by using the specified EqualityComparator<T> to compare values.
     */
    intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): Queryable<TResult>;

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
    ): Queryable<TResult>;

    /**
     * Returns last item of list. If list is empty, returns default payload.
     */
    last(predicate: IteratorFunction<T, boolean>): T | undefined;

    last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    /**
     * Returns last item of list. If list is empty, returns default payload.
     */
    lastOrDefault(defaultValue: T): T;

    /**
     * Projects each element of a sequence into a new form.
     */
    map<TResult>(selector: IteratorFunction<T, TResult>): Queryable<TResult>;

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
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>
    ): Queryable<T>;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): Queryable<T>;

    /**
     * @throws {NoSuchItemException} if collection is empty
     */
    random(): T;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): Queryable<T>;

    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): Queryable<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): Queryable<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): Queryable<T>;

    slice(offset: number): Queryable<T>;

    slice(offset: number, length: number): Queryable<T>;

    sum(selector: IteratorFunction<T, number>): number;

    /**
     * Returns a specified number of contiguous elements from the run of a sequence.
     */
    take(length: number): Queryable<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     */
    takeWhile(condition: IteratorFunction<T, boolean>): Queryable<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>): Queryable<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): Queryable<TResult>;
}
