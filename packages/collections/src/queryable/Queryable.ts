import { Delegate, ToJSON } from '@monument/core';
import { ComparisonResult, SortOrder } from '@monument/comparison';
import { KeyValuePair } from '../base/KeyValuePair';
import { Sequence } from '../base/Sequence';
import { ToArray } from '../base/ToArray';

export interface Queryable<T> extends Sequence<T>, ToJSON<Array<T>>, ToArray<T> {
  readonly isEmpty: boolean;

  /**
   * Applies an accumulator function over a sequence.
   * The specified seed payload is used as the initial accumulator payload.
   */
  aggregate<R>(project: Delegate<[R, T, number], R>, initialSeed: R): R;

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  all(predicate: Delegate<[T, number], boolean>): boolean;

  /**
   * Determines whether any element of a sequence satisfies a condition.
   */
  any(predicate: Delegate<[T, number], boolean>): boolean;

  /**
   * Computes the average of a sequence of values that are obtained by invoking a transform function on each element
   * of the input sequence.
   */
  average(select: Delegate<[T, number], number>): number;

  chunk(): Queryable<Iterable<T>>;

  chunk(size: number): Queryable<Iterable<T>>;

  /**
   * Concatenates actual sequence with other one and returns new sequence containing elements of both of them.
   */
  concat(...others: Array<Iterable<T>>): Queryable<T>;

  contains(item: T): boolean;

  contains(item: T, equals: Delegate<[T, T], boolean>): boolean;

  containsAll(items: Iterable<T>): boolean;

  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;

  /**
   * Returns a number that represents how many elements in the specified sequence satisfy a condition.
   */
  count(predicate: Delegate<[T, number], boolean>): number;

  /**
   * Returns distinct elements from a sequence.
   */
  distinct(): Queryable<T>;

  /**
   * Returns distinct elements from a sequence by using a specified function to compare values.
   */
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;

  entries(): Queryable<KeyValuePair<number, T>>;

  /**
   * Produces the set difference of two sequences.
   */
  except(items: Iterable<T>): Queryable<T>;

  /**
   * Produces the set difference of two sequences by using the specified function to compare values.
   */
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: Delegate<[T, number], boolean>): Queryable<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: Delegate<[T, number], boolean>, limit: number): Queryable<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: Delegate<[T, number], boolean>, limit: number, offset: number): Queryable<T>;

  /**
   * Returns first item of collection. If collection is empty, returns default payload.
   */
  first(predicate: Delegate<[T, number], boolean>): T | undefined;

  first(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;

  /**
   * Calls iterator function for each element of collection.
   */
  forEach(consume: Delegate<[T, number], boolean | void>): void;

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>
  ): Iterable<R>;

  /**
   * Groups the elements of a sequence according to a specified key selector function and key equality equals.
   */
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean>
  ): Iterable<R>;

  /**
   * Produces the set intersection of two sequences.
   */
  intersect(otherItems: Iterable<T>): Queryable<T>;

  /**
   * Produces the set intersection of two sequences by using the specified Lambda2<T, T, boolean> to compare values.
   */
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  /**
   * Correlates the elements of two sequences based on matching keys.
   */
  join<O, K, R>(
    others: Iterable<O>,
    selectInnerKey: Delegate<[T, number], K>,
    selectOuterKey: Delegate<[O, number], K>,
    selectResult: Delegate<[T, O], R>
  ): Queryable<R>;

  /**
   * Correlates the elements of two sequences based on matching keys.
   * A specified function is used to compare keys.
   */
  join<O, K, R>(
    others: Iterable<O>,
    selectInnerKey: Delegate<[T, number], K>,
    selectOuterKey: Delegate<[O, number], K>,
    selectResult: Delegate<[T, O], R>,
    keysEquals: Delegate<[K, K], boolean>
  ): Queryable<R>;

  /**
   * Returns last item of collection. If collection is empty, returns default payload.
   */
  last(predicate: Delegate<[T, number], boolean>): T | undefined;

  last(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;

  /**
   * Projects each element of a sequence into a new form.
   */
  map<R>(project: Delegate<[T, number], R>): Queryable<R>;

  /**
   * Invokes a transform function on each element of a sequence and returns the maximum resulting payload.
   */
  max(select: Delegate<[T, number], number>): number;

  /**
   * Invokes a transform function on each element of a sequence and returns the minimum resulting payload.
   */
  min(select: Delegate<[T, number], number>): number;

  /**
   * Sorts the elements of a sequence in ascending order by using a specified equals.
   */
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>): Queryable<T>;

  /**
   * Sorts the elements of a sequence in ascending order by using a specified equals.
   */
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder): Queryable<T>;

  /**
   * @throws {NoSuchItemException} if collection is empty
   */
  random(): T;

  /**
   * @param rnd Function which provides random integer value for specified range. In this case range is (0, length).
   * @throws {NoSuchItemException} if collection is empty
   */
  random(rnd: Delegate<[number, number], number>): T;

  /**
   * Inverts the order of the elements in a sequence.
   * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
   */
  reverse(): Queryable<T>;

  selectMany<I, R>(project: Delegate<[T, number], Iterable<I>>, combine: Delegate<[T, I], R>): Queryable<R>;

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  skip(offset: number): Queryable<T>;

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  skipWhile(condition: Delegate<[T, number], boolean>): Queryable<T>;

  slice(offset: number, limit: number): Queryable<T>;

  sum(select: Delegate<[T, number], number>): number;

  /**
   * Returns a specified number of contiguous elements from the run of a sequence.
   */
  take(length: number): Queryable<T>;

  /**
   * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
   */
  takeWhile(condition: Delegate<[T, number], boolean>): Queryable<T>;

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(others: Iterable<T>): Queryable<T>;

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R>;

}
