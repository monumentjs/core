import { Sequence } from '../../base/Sequence';
import { ReadOnlyCollection } from './ReadOnlyCollection';
import { ReadOnlyCollectionImpl } from './ReadOnlyCollectionImpl';
import { EqualsFunction } from '../../../comparison/equality/EqualsFunction';
import { StrictEquals } from '../../../comparison/equality/StrictEquals';
import { SortOrder } from '../../../comparison/order/SortOrder';
import { CompareFunction } from '../../../comparison/order/CompareFunction';
import { ReadOnlyMultiValueMap } from '../../multivaluemap/readonly/ReadOnlyMultiValueMap';
import { KeyValuePair } from '../../base/KeyValuePair';
import { AggregateFunction } from '../../function/AggregateFunction';
import { IteratorFunction } from '../../function/IteratorFunction';
import { CombineFunction } from '../../function/CombineFunction';
import { ProjectFunction } from '../../function/ProjectFunction';
import { SupplyFunction } from '../../../function/SupplyFunction';

export abstract class ReadOnlyCollectionBase<T> implements ReadOnlyCollection<T> {
  abstract readonly length: number;

  get isEmpty(): boolean {
    return this.length === 0;
  }

  abstract [Symbol.iterator](): Iterator<T>;

  aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate {
    return new ReadOnlyCollectionImpl(this).aggregate(iterator, initialSeed);
  }

  all(predicate: IteratorFunction<T, boolean>): boolean {
    return new ReadOnlyCollectionImpl(this).all(predicate);
  }

  any(predicate: IteratorFunction<T, boolean>): boolean {
    return new ReadOnlyCollectionImpl(this).any(predicate);
  }

  average(selector: IteratorFunction<T, number>): number {
    return new ReadOnlyCollectionImpl(this).average(selector);
  }

  chunk(size: number = 1): ReadOnlyCollection<Iterable<T>> {
    return new ReadOnlyCollectionImpl(this).chunk(size);
  }

  concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).concat(otherList, ...others);
  }

  contains(otherItem: T): boolean;

  contains(otherItem: T, comparator: EqualsFunction<T>): boolean;

  contains(otherItem: T, comparator: EqualsFunction<T> = StrictEquals): boolean {
    return new ReadOnlyCollectionImpl(this).contains(otherItem, comparator);
  }

  containsAll(items: Sequence<T>): boolean;

  containsAll(items: Sequence<T>, comparator: EqualsFunction<T>): boolean;

  containsAll(items: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): boolean {
    return new ReadOnlyCollectionImpl(this).containsAll(items, comparator);
  }

  count(predicate: IteratorFunction<T, boolean>): number {
    return new ReadOnlyCollectionImpl(this).count(predicate);
  }

  distinct(): ReadOnlyCollection<T>;

  distinct(comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  distinct(comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).distinct(comparator);
  }

  entries(): Iterable<KeyValuePair<number, T>> {
    return new ReadOnlyCollectionImpl(this).entries();
  }

  except(otherList: Iterable<T>): ReadOnlyCollection<T>;

  except(otherList: Iterable<T>, comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  except(otherList: Iterable<T>, comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).except(otherList, comparator);
  }

  findAll(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

  findAll(predicate: IteratorFunction<T, boolean>, limit: number): ReadOnlyCollection<T>;

  findAll(predicate: IteratorFunction<T, boolean>, limit: number, offset: number): ReadOnlyCollection<T>;

  findAll(predicate: IteratorFunction<T, boolean>, limit: number = Number.POSITIVE_INFINITY, offset: number = 0): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).findAll(predicate, limit, offset);
  }

  first(predicate: IteratorFunction<T, boolean>): T | undefined;

  first(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;

  first(predicate: IteratorFunction<T, boolean>, fallback?: SupplyFunction<T>): T | undefined {
    if (fallback === undefined) {
      return new ReadOnlyCollectionImpl(this).first(predicate);
    }

    return new ReadOnlyCollectionImpl(this).first(predicate, fallback);
  }

  firstOrDefault(fallback: SupplyFunction<T>): T {
    return new ReadOnlyCollectionImpl(this).firstOrDefault(fallback);
  }

  forEach(iterator: IteratorFunction<T, false | void>): void;

  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
    new ReadOnlyCollectionImpl(this).forEach(iterator, startIndex, count);
  }

  forEachBack(iterator: IteratorFunction<T, false | void>): void;

  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

  forEachBack(
    iterator: IteratorFunction<T, false | void>,
    startIndex: number = Math.max(this.length - 1, 0),
    count: number = startIndex + (this.length ? 1 : 0)
  ): void {
    new ReadOnlyCollectionImpl(this).forEachBack(iterator, startIndex, count);
  }

  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ReadOnlyMultiValueMap<TKey, T>;

  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualsFunction<TKey>): ReadOnlyMultiValueMap<TKey, T>;

  groupBy<TKey>(
    keySelector: IteratorFunction<T, TKey>,
    keyComparator: EqualsFunction<TKey> = StrictEquals
  ): ReadOnlyMultiValueMap<TKey, T> {
    return new ReadOnlyCollectionImpl(this).groupBy(keySelector, keyComparator);
  }

  intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;

  intersect(otherList: Sequence<T>, comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  intersect(otherList: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).intersect(otherList, comparator);
  }

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: IteratorFunction<TOuter, TKey>,
    innerKeySelector: IteratorFunction<T, TKey>,
    resultSelector: CombineFunction<T, TOuter, TResult>
  ): ReadOnlyCollection<TResult>;

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: IteratorFunction<TOuter, TKey>,
    innerKeySelector: IteratorFunction<T, TKey>,
    resultSelector: CombineFunction<T, TOuter, TResult>,
    keyComparator: EqualsFunction<TKey>
  ): ReadOnlyCollection<TResult>;

  join<TOuter, TKey, TResult>(
    outerList: Sequence<TOuter>,
    outerKeySelector: IteratorFunction<TOuter, TKey>,
    innerKeySelector: IteratorFunction<T, TKey>,
    resultSelector: CombineFunction<T, TOuter, TResult>,
    keyComparator: EqualsFunction<TKey> = StrictEquals
  ): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
  }

  last(predicate: IteratorFunction<T, boolean>): T | undefined;

  last(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;

  last(predicate: IteratorFunction<T, boolean>, fallback?: SupplyFunction<T>): T | undefined {
    if (fallback === undefined) {
      return new ReadOnlyCollectionImpl(this).last(predicate);
    }

    return new ReadOnlyCollectionImpl(this).last(predicate, fallback);
  }

  lastOrDefault(fallback: SupplyFunction<T>): T {
    return new ReadOnlyCollectionImpl(this).lastOrDefault(fallback);
  }

  map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).map(selector);
  }

  max(selector: IteratorFunction<T, number>): number {
    return new ReadOnlyCollectionImpl(this).max(selector);
  }

  min(selector: IteratorFunction<T, number>): number {
    return new ReadOnlyCollectionImpl(this).min(selector);
  }

  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: CompareFunction<TKey>): ReadOnlyCollection<T>;

  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: CompareFunction<TKey>, sortOrder: SortOrder): ReadOnlyCollection<T>;

  orderBy<TKey>(
    keySelector: ProjectFunction<T, TKey>,
    comparator: CompareFunction<TKey>,
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
    sequenceSelector: IteratorFunction<T, Iterable<TInnerItem>>,
    resultSelector: CombineFunction<T, TInnerItem, TResult>
  ): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).selectMany(sequenceSelector, resultSelector);
  }

  skip(offset: number): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).skip(offset);
  }

  skipWhile(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).skipWhile(predicate);
  }

  slice(offset: number): ReadOnlyCollection<T>;

  slice(offset: number, length: number): ReadOnlyCollection<T>;

  slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).slice(offset, length);
  }

  sum(selector: IteratorFunction<T, number>): number {
    return new ReadOnlyCollectionImpl(this).sum(selector);
  }

  take(length: number): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).take(length);
  }

  takeWhile(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).takeWhile(predicate);
  }

  toArray(): T[] {
    return [...this];
  }

  toJSON(): T[] {
    return this.toArray();
  }

  union(otherList: Sequence<T>): ReadOnlyCollection<T>;

  union(otherList: Sequence<T>, comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  union(otherList: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this).union(otherList, comparator);
  }

  zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ReadOnlyCollection<TResult> {
    return new ReadOnlyCollectionImpl(this).zip(otherList, resultSelector);
  }
}
