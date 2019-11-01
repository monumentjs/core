import { Delegate } from '@monument/core';
import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { KeyValuePair } from '../base/KeyValuePair';
import { Queryable } from './Queryable';

export class QueryableProxy<T, S extends Queryable<T>> implements Queryable<T> {

  //#region Sequence

  get length(): number {
    return this.source.length;
  }

  //#endregion

  //#region Queryable

  get isEmpty(): boolean {
    return this.source.isEmpty;
  }

  //#endregion

  constructor(protected readonly source: S) {
  }

  //#region Iterable

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  //#endregion

  //#region Queryable

  aggregate<R>(project: Delegate<[R, T, number], R>, initialSeed: R): R {
    return this.source.aggregate(project, initialSeed);
  }

  all(predicate: Delegate<[T, number], boolean>): boolean {
    return this.source.all(predicate);
  }

  any(predicate: Delegate<[T, number], boolean>): boolean {
    return this.source.any(predicate);
  }

  average(select: Delegate<[T, number], number>): number {
    return this.source.average(select);
  }

  chunk(): Queryable<Iterable<T>>;
  chunk(size: number): Queryable<Iterable<T>>;
  chunk(size?: number): Queryable<Iterable<T>> {
    return this.source.chunk(size as number);
  }

  concat(...others: Array<Iterable<T>>): Queryable<T> {
    return this.source.concat(...others);
  }

  contains(item: T): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean>): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.source.contains(item, equals);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.source.containsAll(items, equals);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return this.source.count(predicate);
  }

  /**
   * Returns distinct elements from a sequence.
   */
  distinct(): Queryable<T>;

  /**
   * Returns distinct elements from a sequence by using a specified function to compare values.
   */
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;

  distinct(equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.distinct(equals);
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return this.source.entries();
  }

  /**
   * Produces the set difference of two sequences.
   */
  except(items: Iterable<T>): Queryable<T>;

  /**
   * Produces the set difference of two sequences by using the specified function to compare values.
   */
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.except(items, equals);
  }

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

  findAll(predicate: Delegate<[T, number], boolean>, limit?: number, offset?: number): Queryable<T> {
    return this.source.findAll(predicate, limit as number, offset as number);
  }

  /**
   * Returns first item of collection. If collection is empty, returns default payload.
   */
  first(predicate: Delegate<[T, number], boolean>): T | undefined;

  first(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;

  first(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return this.source.first(predicate, fallback as Delegate<[], T>);
  }

  forEach(consume: Delegate<[T, number], boolean | void>): void {
    this.source.forEach(consume);
  }

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

  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean> = StrictEquals
  ): Iterable<R> {
    return this.source.groupBy(selectKey, selectValue, selectResult, keysEquals);
  }

  /**
   * Produces the set intersection of two sequences.
   */
  intersect(otherItems: Iterable<T>): Queryable<T>;

  /**
   * Produces the set intersection of two sequences by using the specified Lambda2<T, T, boolean> to compare values.
   */
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.intersect(otherItems, equals);
  }

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

  join<O, K, R>(
    others: Iterable<O>,
    selectInnerKey: Delegate<[T, number], K>,
    selectOuterKey: Delegate<[O, number], K>,
    selectResult: Delegate<[T, O], R>,
    keysEquals: Delegate<[K, K], boolean> = StrictEquals
  ): Queryable<R> {
    return this.source.join(others, selectInnerKey, selectOuterKey, selectResult, keysEquals);
  }

  /**
   * Returns last item of collection. If collection is empty, returns default payload.
   */
  last(predicate: Delegate<[T, number], boolean>): T | undefined;

  last(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;

  last(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return this.source.last(predicate, fallback as Delegate<[], T>);
  }

  map<R>(project: Delegate<[T, number], R>): Queryable<R> {
    return this.source.map(project);
  }

  max(select: Delegate<[T, number], number>): number {
    return this.source.max(select);
  }

  min(select: Delegate<[T, number], number>): number {
    return this.source.min(select);
  }

  /**
   * Sorts the elements of a sequence in ascending order by using a specified equals.
   */
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>): Queryable<T>;

  /**
   * Sorts the elements of a sequence in ascending order by using a specified equals.
   */
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder): Queryable<T>;

  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder = SortOrder.ASCENDING): Queryable<T> {
    return this.source.orderBy(selectKey, compareKeys, sortOrder);
  }

  /**
   * @throws {NoSuchItemException} if collection is empty
   */
  random(): T;

  /**
   * @param rnd Function which provides random integer value for specified range. In this case range is (0, length).
   * @throws {NoSuchItemException} if collection is empty
   */
  random(rnd: Delegate<[number, number], number>): T;

  random(rnd?: Delegate<[number, number], number>): T {
    return this.source.random(rnd as Delegate<[number, number], number>);
  }

  reverse(): Queryable<T> {
    return this.source.reverse();
  }

  selectMany<I, R>(project: Delegate<[T, number], Iterable<I>>, combine: Delegate<[T, I], R>): Queryable<R> {
    return this.source.selectMany(project, combine);
  }

  skip(offset: number): Queryable<T> {
    return this.source.skip(offset);
  }

  skipWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return this.source.skipWhile(condition);
  }

  slice(offset: number, limit: number): Queryable<T> {
    return this.source.slice(offset, limit);
  }

  sum(select: Delegate<[T, number], number>): number {
    return this.source.sum(select);
  }

  take(length: number): Queryable<T> {
    return this.source.take(length);
  }

  takeWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return this.source.takeWhile(condition);
  }

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(others: Iterable<T>): Queryable<T>;

  /**
   * Produces the set union of two sequences by using a specified IEqualityComparator<TItem>.
   */
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;

  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.union(others, equals);
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return this.source.zip(others, combine);
  }

  //#endregion

  //#region ToArray

  toArray(): Array<T> {
    return this.source.toArray();
  }

  //#endregion

  //#region ToJSON

  toJSON(): Array<T> {
    return this.source.toJSON();
  }

  //#endregion

}
