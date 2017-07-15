import {IEnumerable} from './IEnumerable';
import {IEqualityComparator} from './IEqualityComparator';
import {SortOrder} from './SortOrder';
import {IComparator} from './IComparator';
import {IteratorFunction, CombineFunction} from './types';
import {IGrouping} from './IGrouping';


export interface IQueryable<T> extends IEnumerable<T> {
    /**
     * Applies an accumulator function over a sequence.
     * The specified seed value is used as the initial accumulator value.
     * @param iterator
     * @param initialSeed
     */
    aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate, item: T, index: number, list: IEnumerable<T>) => TAggregate,
        initialSeed?: TAggregate
    ): TAggregate;

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     * @param predicate
     */
    all(predicate: IteratorFunction<T, boolean>): boolean;

    /**
     * Determines whether any element of a sequence satisfies a condition.
     * @param predicate
     */
    any(predicate: IteratorFunction<T, boolean>): boolean;

    /**
     * Computes the average of a sequence of values that are obtained by invoking a transform function on each element
     * of the input sequence.
     * @param selector
     */
    average(selector: IteratorFunction<T, number>): number;

    /**
     * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
     * @param otherList
     */
    concat(otherList: IEnumerable<T>): IEnumerable<T>;

    /**
     * Determines whether a sequence contains a specified element by using a specified IEqualityComparator<T>.
     * @param otherItem
     * @param comparator
     */
    contains(otherItem: T, comparator?: IEqualityComparator<T>): boolean;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     * @param predicate
     */
    count(predicate: IteratorFunction<T, boolean>): number;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<T> to compare values.
     * @param comparator
     */
    distinct(comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Produces the set difference of two sequences by using the specified IEqualityComparator<T> to compare values.
     * @param otherList
     * @param comparator
     */
    except(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Returns first item of list. If list is empty, returns default value.
     * @param predicate
     * @param defaultValue
     */
    first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T;

    /**
     * Returns first item of list. If list is empty, returns default value.
     * @param defaultValue
     */
    firstOrDefault(defaultValue: T): T;

    /**
     * Calls iterator function on each item of sequence.
     * If iterator function returns `false`, iteration will stop.
     * @param iterator
     */
    forEach(iterator: IteratorFunction<T, boolean|void>): void;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector Key selector function.
     * @param keyComparer
     */
    groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparer?: IEqualityComparator<TKey>
    ): IEnumerable<IGrouping<TKey, T>>;

    /**
     * Produces the set intersection of two sequences by using the specified IEqualityComparator<T> to compare values.
     * @param otherList
     * @param comparator
     */
    intersect(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     * A specified IEqualityComparator<T> is used to compare keys.
     * @param outerList
     * @param outerKeySelector
     * @param innerKeySelector
     * @param resultSelector
     * @param keyComparator
     */
    join<TOuter, TKey, TResult>(
        outerList: IEnumerable<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: IEqualityComparator<TKey>
    ): IEnumerable<TResult>;

    /**
     * Returns last item of list. If list is empty, returns default value.
     * @param predicate
     * @param defaultValue
     */
    last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T;

    /**
     * Returns last item of list. If list is empty, returns default value.
     * @param defaultValue
     */
    lastOrDefault(defaultValue: T): T;

    /**
     * Invokes a transform function on each element of a sequence and returns the maximum resulting value.
     * @param selector
     */
    max(selector: (item: T) => number): number;

    /**
     * Invokes a transform function on each element of a sequence and returns the minimum resulting value.
     * @param selector
     */
    min(selector: (item: T) => number): number;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     * @param keySelector
     * @param comparator
     * @param sortOrder
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: IComparator<TKey>,
        sortOrder: SortOrder
    ): IEnumerable<T>;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): IEnumerable<T>;

    /**
     * Projects each element of a sequence into a new form.
     * @param selector
     */
    select<TResult>(selector: IteratorFunction<T, TResult>): IEnumerable<TResult>;

    /**
     * Projects each element of a sequence to an IEnumerable<T>, flattens the resulting sequences into one sequence,
     * and invokes a result selector function on each element therein.
     * The index of each source element is used in the intermediate projected form of that element.
     * @param collectionSelector
     * @param resultSelector
     */
    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, IEnumerable<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): IEnumerable<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     * @param offset
     */
    skip(offset: number): IEnumerable<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     * @param condition
     */
    skipWhile(condition: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     * @param length
     */
    take(length: number): IEnumerable<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     * @param condition
     */
    takeWhile(condition: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<T>.
     * @param otherList
     * @param comparator
     */
    union(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new List<T> containing items for which predicate function returned `true`.
     * @param predicate
     */
    where(predicate: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * @param otherList
     * @param resultSelector
     */
    zip<TOther, TResult>(
        otherList: IEnumerable<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): IEnumerable<TResult>;
}
