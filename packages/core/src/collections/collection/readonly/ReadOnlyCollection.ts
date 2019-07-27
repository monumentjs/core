import { ToArray } from '../../base/ToArray';
import { Sequence } from '../../base/Sequence';
import { EqualityComparator } from '../../../comparison/equality/EqualityComparator';
import { Comparator } from '../../../comparison/order/Comparator';
import { SortOrder } from '../../../comparison/order/SortOrder';
import { ToJSON } from '../../../base/ToJSON';
import { ReadOnlyMultiValueMap } from '../../multivaluemap/readonly/ReadOnlyMultiValueMap';
import { KeyValuePair } from '../../base/KeyValuePair';
import { AggregateFunction } from '../../function/AggregateFunction';
import { IteratorFunction } from '../../function/IteratorFunction';
import { CombineFunction } from '../../function/CombineFunction';
import { ProjectFunction } from '../../function/ProjectFunction';
import { SupplyFunction } from '../../../function/SupplyFunction';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyCollection<T> extends Sequence<T>, ToJSON<T[]>, ToArray<T> {
  readonly isEmpty: boolean;

  /**
   * Applies an accumulator function over a sequence.
   * The specified seed payload is used as the initial accumulator payload.
   */
  aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate;

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

  chunk(): ReadOnlyCollection<Iterable<T>>;

  chunk(size: number): ReadOnlyCollection<Iterable<T>>;

  /**
   * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
   */
  concat(otherItems: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T>;

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
  distinct(): ReadOnlyCollection<T>;

  /**
   * Returns distinct elements from a sequence by using a specified EqualityComparator<TItem> to compare values.
   */
  distinct(comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

  entries(): Iterable<KeyValuePair<number, T>>;

  /**
   * Produces the set difference of two sequences.
   */
  except(items: Iterable<T>): ReadOnlyCollection<T>;

  /**
   * Produces the set difference of two sequences by using the specified EqualityComparator to compare values.
   */
  except(items: Iterable<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>, limit: number): ReadOnlyCollection<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>, limit: number, offset: number): ReadOnlyCollection<T>;

  /**
   * Returns first item of collection. If collection is empty, returns default payload.
   */
  first(predicate: IteratorFunction<T, boolean>): T | undefined;

  first(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;

  /**
   * Returns first item of collection. If collection is empty, returns default payload.
   */
  firstOrDefault(fallback: SupplyFunction<T>): T;

  /**
   * Calls iterator function for each element of collection.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEach for default implementation.
   */
  forEach(iterator: IteratorFunction<T, false | void>): void;

  /**
   * Calls iterator function for each element of collection starting with specified index.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEach for default implementation.
   */
  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

  /**
   * Calls iterator function for each element of collection inside specified range.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEach for default implementation.
   */
  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

  /**
   * Calls iterator function for each element of collection in reverse order.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEachBack for default implementation.
   */
  forEachBack(iterator: IteratorFunction<T, false | void>): void;

  /**
   * Calls iterator function for each element of collection in reverse order starting with specified index.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEachBack for default implementation.
   */
  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

  /**
   * Calls iterator function for each element of collection in reverse order inside specified range.
   *
   * Note: concrete collection implementation should provide more efficient implementation of iteration.
   *
   * @see ReadOnlyCollectionImpl.forEachBack for default implementation.
   */
  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ReadOnlyMultiValueMap<TKey, T>;

  /**
   * Groups the elements of a sequence according to a specified key selector function and key equality comparator.
   */
  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): ReadOnlyMultiValueMap<TKey, T>;

  /**
   * Produces the set intersection of two sequences.
   */
  intersect(otherItems: Sequence<T>): ReadOnlyCollection<T>;

  /**
   * Produces the set intersection of two sequences by using the specified EqualityComparator<T> to compare values.
   */
  intersect(otherItems: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

  /**
   * Correlates the elements of two sequences based on matching keys.
   */
  join<TOuter, TKey, TResult>(
    outerItems: Sequence<TOuter>,
    outerKeySelector: IteratorFunction<TOuter, TKey>,
    innerKeySelector: IteratorFunction<T, TKey>,
    resultSelector: CombineFunction<T, TOuter, TResult>
  ): ReadOnlyCollection<TResult>;

  /**
   * Correlates the elements of two sequences based on matching keys.
   * A specified EqualityComparator is used to compare keys.
   */
  join<TOuter, TKey, TResult>(
    outerItems: Sequence<TOuter>,
    outerKeySelector: IteratorFunction<TOuter, TKey>,
    innerKeySelector: IteratorFunction<T, TKey>,
    resultSelector: CombineFunction<T, TOuter, TResult>,
    keyComparator: EqualityComparator<TKey>
  ): ReadOnlyCollection<TResult>;

  /**
   * Returns last item of collection. If collection is empty, returns default payload.
   */
  last(predicate: IteratorFunction<T, boolean>): T | undefined;

  last(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;

  /**
   * Returns last item of collection. If collection is empty, returns default payload.
   */
  lastOrDefault(fallback: SupplyFunction<T>): T;

  /**
   * Projects each element of a sequence into a new form.
   */
  map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult>;

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
  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: Comparator<TKey>): ReadOnlyCollection<T>;

  /**
   * Sorts the elements of a sequence in ascending order by using a specified comparator.
   */
  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: Comparator<TKey>, sortOrder: SortOrder): ReadOnlyCollection<T>;

  /**
   * @throws {NoSuchItemException} if collection is empty
   */
  random(): T;

  /**
   * Inverts the order of the elements in a sequence.
   * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
   */
  reverse(): ReadOnlyCollection<T>;

  selectMany<TInnerItem, TResult>(
    collectionSelector: IteratorFunction<T, Iterable<TInnerItem>>,
    resultSelector: CombineFunction<T, TInnerItem, TResult>
  ): ReadOnlyCollection<TResult>;

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  skip(offset: number): ReadOnlyCollection<T>;

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  skipWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

  slice(offset: number): ReadOnlyCollection<T>;

  slice(offset: number, length: number): ReadOnlyCollection<T>;

  sum(selector: IteratorFunction<T, number>): number;

  /**
   * Returns a specified number of contiguous elements from the run of a sequence.
   */
  take(length: number): ReadOnlyCollection<T>;

  /**
   * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
   */
  takeWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(otherItems: Sequence<T>): ReadOnlyCollection<T>;

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(otherItems: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  zip<TOther, TResult>(otherItems: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ReadOnlyCollection<TResult>;
}
