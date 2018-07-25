import {Collection} from './Collection';
import {ReadOnlyList} from './ReadOnlyList';
import {Sequence} from './Sequence';
import {CombineFunction} from './CombineFunction';
import {EqualityComparator} from '../EqualityComparator';
import {SortOrder} from './SortOrder';
import {Grouping} from './Grouping';
import {Comparator} from '../Comparator';
import {IteratorFunction} from './IteratorFunction';


export interface List<T> extends ReadOnlyList<T>, Collection<T> {

    /**
     * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
     */
    concat(otherList: Sequence<T>): List<T>;

    /**
     * Returns distinct elements from a sequence.
     */
    distinct(): List<T>;

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    distinct(comparator: EqualityComparator<T>): List<T>;

    /**
     * Produces the set difference of two sequences.
     */
    except(otherList: Sequence<T>): List<T>;

    /**
     * Produces the set difference of two sequences by using the specified EqualityComparator to compare values.
     */
    except(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new List<TItem> containing items for which predicate function returned `true`.
     */
    findAll(predicate: IteratorFunction<T, boolean>): List<T>;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): List<Grouping<TKey, T>>;

    /**
     * Groups the elements of a sequence according to a specified key selector function and key equality comparator.
     */
    groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey>
    ): List<Grouping<TKey, T>>;

    insert(index: number, item: T): boolean;

    insertAll(index: number, items: Sequence<T>): boolean;

    /**
     * Produces the set intersection of two sequences.
     */
    intersect(otherList: Sequence<T>): List<T>;

    /**
     * Produces the set intersection of two sequences by using the specified EqualityComparator<T> to compare values.
     */
    intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;

    /**
     * Correlates the elements of two sequences based on matching keys.
     */
    join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): List<TResult>;

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
    ): List<TResult>;

    /**
     * Projects each element of a sequence into a new form.
     */
    map<TResult>(selector: IteratorFunction<T, TResult>): List<TResult>;

    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparator.
     */
    orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        keyComparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): List<T>;

    removeAt(index: number): T;

    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): List<T>;

    setAt(index: number, newValue: T): T;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(offset: number): List<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(condition: IteratorFunction<T, boolean>): List<T>;

    slice(offset: number): List<T>;

    slice(offset: number, length: number): List<T>;

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
    union(otherList: Sequence<T>): List<T>;

    /**
     * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
     */
    union(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult>;
}
