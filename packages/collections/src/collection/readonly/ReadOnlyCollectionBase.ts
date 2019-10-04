import { Func, Func1, Func2, Func3 } from '@monument/core';
import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Sequence } from '../../base/Sequence';
import { KeyValuePair } from '../../base/KeyValuePair';
import { ReadOnlyMultiValueMap } from '../../multivaluemap/readonly/ReadOnlyMultiValueMap';
import { ReadOnlyCollection } from './ReadOnlyCollection';
import { ReadOnlyCollectionImpl } from './ReadOnlyCollectionImpl';

export abstract class ReadOnlyCollectionBase<T> implements ReadOnlyCollection<T> {
  abstract readonly length: number;

  get isEmpty(): boolean {
    return this.length === 0;
  }

  abstract [Symbol.iterator](): Iterator<T>;

  aggregate<TAggregate>(iterator: Func3<TAggregate, T, number, TAggregate>, initialSeed: TAggregate): TAggregate {
    return new ReadOnlyCollectionImpl(this).aggregate(iterator, initialSeed);
  }

  all(predicate: Func2<T, number, boolean>): boolean {
    return new ReadOnlyCollectionImpl(this).all(predicate);
  }

  any(predicate: Func2<T, number, boolean>): boolean {
    return new ReadOnlyCollectionImpl(this).any(predicate);
  }

  average(selector: Func2<T, number, number>): number {
    return new ReadOnlyCollectionImpl(this).average(selector);
  }

  chunk(size: number = 1): ReadOnlyCollection<Iterable<T>> {
    return new ReadOnlyCollectionImpl(this).chunk(size);
  }

  concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).concat(otherList, ...others);
  }

  contains(otherItem: T): boolean;

  contains(otherItem: T, comparator: Func2<T, T, boolean>): boolean;

  contains(otherItem: T, comparator: Func2<T, T, boolean> = StrictEquals): boolean {
    return new ReadOnlyCollectionImpl(this).contains(otherItem, comparator);
  }

  containsAll(items: Sequence<T>): boolean;

  containsAll(items: Sequence<T>, comparator: Func2<T, T, boolean>): boolean;

  containsAll(items: Sequence<T>, comparator: Func2<T, T, boolean> = StrictEquals): boolean {
    return new ReadOnlyCollectionImpl(this).containsAll(items, comparator);
  }

  count(predicate: Func2<T, number, boolean>): number {
    return new ReadOnlyCollectionImpl(this).count(predicate);
  }

  distinct(): ReadOnlyCollection<T>;

  distinct(comparator: Func2<T, T, boolean>): ReadOnlyCollection<T>;

  distinct(comparator: Func2<T, T, boolean> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).distinct(comparator);
  }

  entries(): Iterable<KeyValuePair<number, T>> {
    return new ReadOnlyCollectionImpl(this).entries();
  }

  except(otherList: Iterable<T>): ReadOnlyCollection<T>;

  except(otherList: Iterable<T>, comparator: Func2<T, T, boolean>): ReadOnlyCollection<T>;

  except(otherList: Iterable<T>, comparator: Func2<T, T, boolean> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).except(otherList, comparator);
  }

  findAll(predicate: Func2<T, number, boolean>): ReadOnlyCollection<T>;

  findAll(predicate: Func2<T, number, boolean>, limit: number): ReadOnlyCollection<T>;

  findAll(predicate: Func2<T, number, boolean>, limit: number, offset: number): ReadOnlyCollection<T>;

  findAll(predicate: Func2<T, number, boolean>, limit: number = Number.POSITIVE_INFINITY, offset: number = 0): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).findAll(predicate, limit, offset);
  }

  first(predicate: Func2<T, number, boolean>): T | undefined;

  first(predicate: Func2<T, number, boolean>, fallback: Func<T>): T;

  first(predicate: Func2<T, number, boolean>, fallback?: Func<T>): T | undefined {
    if (fallback === undefined) {
      return new ReadOnlyCollectionImpl(this).first(predicate);
    }

    return new ReadOnlyCollectionImpl(this).first(predicate, fallback);
  }

  firstOrDefault(fallback: Func<T>): T {
    return new ReadOnlyCollectionImpl(this).firstOrDefault(fallback);
  }

  forEach(iterator: Func2<T, number, false | void>): void;

  forEach(iterator: Func2<T, number, false | void>, startIndex: number): void;

  forEach(iterator: Func2<T, number, false | void>, startIndex: number, count: number): void;

  forEach(iterator: Func2<T, number, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
    new ReadOnlyCollectionImpl(this).forEach(iterator, startIndex, count);
  }

  forEachBack(iterator: Func2<T, number, false | void>): void;

  forEachBack(iterator: Func2<T, number, false | void>, startIndex: number): void;

  forEachBack(iterator: Func2<T, number, false | void>, startIndex: number, count: number): void;

  forEachBack(
    iterator: Func2<T, number, false | void>,
    startIndex: number = Math.max(this.length - 1, 0),
    count: number = startIndex + (this.length ? 1 : 0)
  ): void {
    new ReadOnlyCollectionImpl(this).forEachBack(iterator, startIndex, count);
  }

  groupBy<TKey>(keySelector: Func2<T, number, TKey>): ReadOnlyMultiValueMap<TKey, T>;

  groupBy<TKey>(keySelector: Func2<T, number, TKey>, keyComparator: Func2<TKey, TKey, boolean>): ReadOnlyMultiValueMap<TKey, T>;

  groupBy<TKey>(
    keySelector: Func2<T, number, TKey>,
    keyComparator: Func2<TKey, TKey, boolean> = StrictEquals
  ): ReadOnlyMultiValueMap<TKey, T> {
    return new ReadOnlyCollectionImpl(this).groupBy(keySelector, keyComparator);
  }

  intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;

  intersect(otherList: Sequence<T>, comparator: Func2<T, T, boolean>): ReadOnlyCollection<T>;

  intersect(otherList: Sequence<T>, comparator: Func2<T, T, boolean> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).intersect(otherList, comparator);
  }

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: Func2<TOuter, number, TKey>,
    innerKeySelector: Func2<T, number, TKey>,
    resultSelector: Func2<T, TOuter, TResult>
  ): ReadOnlyCollection<TResult>;

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: Func2<TOuter, number, TKey>,
    innerKeySelector: Func2<T, number, TKey>,
    resultSelector: Func2<T, TOuter, TResult>,
    keyComparator: Func2<TKey, TKey, boolean>
  ): ReadOnlyCollection<TResult>;

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: Func2<TOuter, number, TKey>,
    innerKeySelector: Func2<T, number, TKey>,
    resultSelector: Func2<T, TOuter, TResult>,
    keyComparator: Func2<TKey, TKey, boolean> = StrictEquals
  ): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
  }

  last(predicate: Func2<T, number, boolean>): T | undefined;

  last(predicate: Func2<T, number, boolean>, fallback: Func<T>): T;

  last(predicate: Func2<T, number, boolean>, fallback?: Func<T>): T | undefined {
    if (fallback === undefined) {
      return new ReadOnlyCollectionImpl(this).last(predicate);
    }

    return new ReadOnlyCollectionImpl(this).last(predicate, fallback);
  }

  lastOrDefault(fallback: Func<T>): T {
    return new ReadOnlyCollectionImpl(this).lastOrDefault(fallback);
  }

  map<TResult>(selector: Func2<T, number, TResult>): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).map(selector);
  }

  max(selector: Func2<T, number, number>): number {
    return new ReadOnlyCollectionImpl(this).max(selector);
  }

  min(selector: Func2<T, number, number>): number {
    return new ReadOnlyCollectionImpl(this).min(selector);
  }

  orderBy<TKey>(keySelector: Func1<T, TKey>, comparator: Func2<TKey, TKey, ComparisonResult>): ReadOnlyCollection<T>;

  orderBy<TKey>(keySelector: Func1<T, TKey>, comparator: Func2<TKey, TKey, ComparisonResult>, sortOrder: SortOrder): ReadOnlyCollection<T>;

  orderBy<TKey>(
    keySelector: Func1<T, TKey>,
    comparator: Func2<TKey, TKey, ComparisonResult>,
    sortOrder: SortOrder = SortOrder.ASCENDING
  ): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).orderBy(keySelector, comparator, sortOrder);
  }

  random(): T {
    return new ReadOnlyCollectionImpl(this).random();
  }

  reverse(): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).reverse();
  }

  selectMany<TInnerItem, TResult>(
    sequenceSelector: Func2<T, number, Iterable<TInnerItem>>,
    resultSelector: Func2<T, TInnerItem, TResult>
  ): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).selectMany(sequenceSelector, resultSelector);
  }

  skip(offset: number): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).skip(offset);
  }

  skipWhile(predicate: Func2<T, number, boolean>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).skipWhile(predicate);
  }

  slice(offset: number): ReadOnlyCollection<T>;

  slice(offset: number, length: number): ReadOnlyCollection<T>;

  slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).slice(offset, length);
  }

  sum(selector: Func2<T, number, number>): number {
    return new ReadOnlyCollectionImpl(this).sum(selector);
  }

  take(length: number): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).take(length);
  }

  takeWhile(predicate: Func2<T, number, boolean>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).takeWhile(predicate);
  }

  toArray(): T[] {
    return [...this];
  }

  toJSON(): T[] {
    return this.toArray();
  }

  union(otherList: Sequence<T>): ReadOnlyCollection<T>;

  union(otherList: Sequence<T>, comparator: Func2<T, T, boolean>): ReadOnlyCollection<T>;

  union(otherList: Sequence<T>, comparator: Func2<T, T, boolean> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).union(otherList, comparator);
  }

  zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: Func2<T, TOther, TResult>): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).zip(otherList, resultSelector);
  }
}
