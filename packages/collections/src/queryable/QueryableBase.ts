import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { randomInt } from '@monument/random';
import { KeyValuePair } from '../base/KeyValuePair';
import { aggregate } from '../operators/aggregate';
import { all } from '../operators/all';
import { any } from '../operators/any';
import { average } from '../operators/average';
import { chunk } from '../operators/chunk';
import { concat } from '../operators/concat';
import { contains } from '../operators/contains';
import { containsAll } from '../operators/containsAll';
import { distinct } from '../operators/distinct';
import { entries } from '../operators/entries';
import { except } from '../operators/except';
import { filter } from '../operators/filter';
import { first } from '../operators/first';
import { forEach } from '../operators/forEach';
import { groupBy } from '../operators/groupBy';
import { intersect } from '../operators/intersect';
import { isEmpty } from '../operators/isEmpty';
import { join } from '../operators/join';
import { last } from '../operators/last';
import { length } from '../operators/length';
import { map } from '../operators/map';
import { max } from '../operators/max';
import { min } from '../operators/min';
import { orderBy } from '../operators/orderBy';
import { random } from '../operators/random';
import { reverse } from '../operators/reverse';
import { selectMany } from '../operators/selectMany';
import { skip } from '../operators/skip';
import { skipWhile } from '../operators/skipWhile';
import { slice } from '../operators/slice';
import { sum } from '../operators/sum';
import { take } from '../operators/take';
import { takeWhile } from '../operators/takeWhile';
import { union } from '../operators/union';
import { zip } from '../operators/zip';
import { Queryable } from './Queryable';
import { Optional } from '../../../data';

export class QueryableBase<T> implements Queryable<T> {

  get length(): number {
    return length(this);
  }

  get isEmpty(): boolean {
    return isEmpty(this);
  }

  constructor(protected readonly source: Iterable<T>) {
  }

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  aggregate<R>(project: Delegate<[R, T, number], R>, initialSeed: R): R {
    return aggregate(this, project, initialSeed);
  }

  all(predicate: Delegate<[T, number], boolean>): boolean {
    return all(this, predicate);
  }

  any(predicate: Delegate<[T, number], boolean>): boolean {
    return any(this, predicate);
  }

  average(select: Delegate<[T, number], number>): number {
    return average(this, select);
  }

  chunk(): Queryable<Iterable<T>>;
  chunk(size: number): Queryable<Iterable<T>>;
  chunk(size: number = 1): Queryable<Iterable<T>> {
    return new QueryableBase(chunk(this, size));
  }

  concat(...others: Array<Iterable<T>>): Queryable<T> {
    return new QueryableBase(concat(this, others));
  }

  contains(item: T): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean>): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return contains(this, item, equals);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return containsAll(this, items, equals);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return length(filter(this, predicate));
  }

  distinct(): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return new QueryableBase(distinct(this, equals));
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return new QueryableBase(entries(this));
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return new QueryableBase(except(this, items, equals));
  }

  filter<R = T>(predicate: Delegate<[T, number], boolean>): Queryable<R> {
    return new QueryableBase(filter(this, predicate));
  }

  first(): Optional<T> {
    return first(this);
  }

  forEach(consume: Delegate<[T, number], boolean | void>): void {
    forEach(this, consume);
  }

  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>
  ): Queryable<R>;
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean>
  ): Queryable<R>;
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    selectResult: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean> = StrictEquals
  ): Queryable<R> {
    return new QueryableBase(groupBy(this, selectKey, selectValue, selectResult, keysEquals));
  }

  intersect(otherItems: Iterable<T>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return new QueryableBase(intersect(this, otherItems, equals));
  }

  join<O, K, R>(
    others: Iterable<O>,
    selectInnerKey: Delegate<[T, number], K>,
    selectOuterKey: Delegate<[O, number], K>,
    selectResult: Delegate<[T, O], R>
  ): Queryable<R>;
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
    return new QueryableBase(join(this, others, selectInnerKey, selectOuterKey, selectResult, keysEquals));
  }

  last(): Optional<T> {
    return last(this);
  }

  map<R>(project: Delegate<[T, number], R>): Queryable<R> {
    return new QueryableBase(map(this, project));
  }

  max(select: Delegate<[T, number], number>): number {
    return max(this, select);
  }

  min(select: Delegate<[T, number], number>): number {
    return min(this, select);
  }

  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder = SortOrder.ASCENDING): Queryable<T> {
    return new QueryableBase(orderBy(this, selectKey, compareKeys, sortOrder));
  }

  random(): T;
  random(rnd: Delegate<[number, number], number>): T;
  random(rnd: Delegate<[number, number], number> = randomInt): T {
    return random(this, rnd);
  }

  reverse(): Queryable<T> {
    return new QueryableBase(reverse(this));
  }

  selectMany<I, R>(project: Delegate<[T, number], Iterable<I>>, combine: Delegate<[T, I], R>): Queryable<R> {
    return new QueryableBase(selectMany(this, project, combine));
  }

  skip(offset: number): Queryable<T> {
    return new QueryableBase(skip(this, offset));
  }

  skipWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return new QueryableBase(skipWhile(this, condition));
  }

  slice(offset: number, limit: number): Queryable<T> {
    return new QueryableBase(slice(this, offset, limit));
  }

  sum(select: Delegate<[T, number], number>): number {
    return sum(this, select);
  }

  take(limit: number): Queryable<T> {
    return new QueryableBase(take(this, limit));
  }

  takeWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return new QueryableBase(takeWhile(this, condition));
  }

  union(others: Iterable<T>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return new QueryableBase(union(this, others, equals));
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return new QueryableBase(zip(this, others, combine));
  }

  toArray(): Array<T> {
    return [...this];
  }

  toJSON(): Array<T> {
    return [...this];
  }
}
