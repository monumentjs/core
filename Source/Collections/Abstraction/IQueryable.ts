import {IEnumerable} from './IEnumerable';
import {SortOrder} from '../SortOrder';
import {IteratorFunction} from '../IteratorFunction';
import {IGrouping} from './IGrouping';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {IComparator} from '../../Core/Abstraction/IComparator';
import {CombineFunction} from '../CombineFunction';


export interface IQueryable<T> extends IEnumerable<T> {
    /**
     * Applies an accumulator function over a sequence.
     * The specified seed value is used as the initial accumulator value.
     */
    aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate | undefined, item: T, index: number, list: IEnumerable<T>) => TAggregate,
        initialSeed?: TAggregate | undefined
    ): TAggregate | undefined;

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
    concat(otherList: IEnumerable<T>): IEnumerable<T>;

    /**
     * Determines whether a sequence contains a specified element by using a specified IEqualityComparator<TItem>.
     */
    contains(otherItem: T, comparator?: IEqualityComparator<T>): boolean;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     */
    count(predicate: IteratorFunction<T, boolean>): number;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    distinct(comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Produces the set difference of two sequences by using the specified IEqualityComparator<TItem> to compare values.
     */
    except(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Returns first item of list. If list is empty, returns default value.
     */
    first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined;

    /**
     * Returns first item of list. If list is empty, returns default value.
     */
    firstOrDefault(defaultValue: T): T;

    /**
     * Calls iterator function on each item of sequence.
     * If iterator function returns `false`, iteration will stop.
     */
    forEach(iterator: IteratorFunction<T, boolean | void>): void;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparer?: IEqualityComparator<TKey>
    ): IEnumerable<IGrouping<TKey, T>>;

    /**
     * Produces the set intersection of two sequences by using the specified IEqualityComparator<TItem> to compare values.
     */
    intersect(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     * A specified IEqualityComparator<TItem> is used to compare keys.
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
     */
    select<TResult>(selector: IteratorFunction<T, TResult>): IEnumerable<TResult>;

    /**
     * Projects each element of a sequence to an IEnumerable<TItem>, flattens the resulting sequences into one sequence,
     * and invokes a result selector function on each element therein.
     * The index of each source element is used in the intermediate projected form of that element.
     */
    selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, IEnumerable<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): IEnumerable<TResult>;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): IEnumerable<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    take(length: number): IEnumerable<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     */
    takeWhile(condition: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: IEnumerable<T>, comparator?: IEqualityComparator<T>): IEnumerable<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new List<TItem> containing items for which predicate function returned `true`.
     */
    where(predicate: IteratorFunction<T, boolean>): IEnumerable<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: IEnumerable<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): IEnumerable<TResult>;
}
