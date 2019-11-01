import { Delegate } from '@monument/core';
import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { randomInt } from '@monument/random';
import { KeyValuePair } from '../base/KeyValuePair';
import { Queryable } from './Queryable';
import { average } from '../operators/average';
import { chunk } from '../operators/chunk';
import { orderBy } from '../operators/orderBy';
import { sum } from '../operators/sum';
import { findAll } from '../operators/findAll';
import { aggregate } from '../operators/aggregate';
import { random } from '../operators/random';
import { slice } from '../operators/slice';
import { join } from '../operators/join';
import { all } from '../operators/all';
import { intersect } from '../operators/intersect';
import { forEach } from '../operators/forEach';
import { containsAll } from '../operators/containsAll';
import { union } from '../operators/union';
import { reverse } from '../operators/reverse';
import { contains } from '../operators/contains';
import { entries } from '../operators/entries';
import { selectMany } from '../operators/selectMany';
import { except } from '../operators/except';
import { any } from '../operators/any';
import { length } from '../operators/length';
import { isEmpty } from '../operators/isEmpty';
import { concat } from '../operators/concat';
import { count } from '../operators/count';
import { distinct } from '../operators/distinct';
import { first } from '../operators/first';
import { groupBy } from '../operators/groupBy';
import { last } from '../operators/last';
import { map } from '../operators/map';
import { max } from '../operators/max';
import { min } from '../operators/min';
import { skip } from '../operators/skip';
import { skipWhile } from '../operators/skipWhile';
import { take } from '../operators/take';
import { takeWhile } from '../operators/takeWhile';
import { zip } from '../operators/zip';

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
  chunk(size?: number): Queryable<Iterable<T>> {
    return new QueryableBase(chunk(this, size as number));
  }

  concat(...others: Array<Iterable<T>>): Queryable<T> {
    return new QueryableBase(concat(this, others));
  }

  contains(item: T): boolean;
  contains(item: T, _equals: Delegate<[T, T], boolean>): boolean;
  contains(item: T, _equals?: Delegate<[T, T], boolean>): boolean {
    return contains(this, item, _equals as Delegate<[T, T], boolean>);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, _equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, _equals?: Delegate<[T, T], boolean>): boolean {
    return containsAll(this, items, _equals as Delegate<[T, T], boolean>);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return count(this, predicate);
  }

  distinct(): Queryable<T>;
  distinct(_equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(_equals?: Delegate<[T, T], boolean>): Queryable<T> {
    return new QueryableBase(distinct(this, _equals as Delegate<[T, T], boolean>));
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return new QueryableBase(entries(this, (item, index) => [index, item]));
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, _equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, _equals?: Delegate<[T, T], boolean>): Queryable<T> {
    return new QueryableBase(except(this, items, _equals as Delegate<[T, T], boolean>));
  }

  findAll(predicate: Delegate<[T, number], boolean>): Queryable<T>;
  findAll(predicate: Delegate<[T, number], boolean>, limit: number): Queryable<T>;
  findAll(predicate: Delegate<[T, number], boolean>, limit: number, offset: number): Queryable<T>;
  findAll(predicate: Delegate<[T, number], boolean>, limit?: number, offset?: number): Queryable<T> {
    return new QueryableBase(findAll(this, predicate, limit as number, offset as number));
  }

  first(predicate: Delegate<[T, number], boolean>): T | undefined;
  first(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
  first(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return first(this, predicate, fallback as Delegate<[], T>);
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
    return new QueryableBase(groupBy(this, selectKey, selectValue, selectResult, keysEquals as Delegate<[K, K], boolean>));
  }

  intersect(otherItems: Iterable<T>): Queryable<T>;
  intersect(otherItems: Iterable<T>, _equals: Delegate<[T, T], boolean>): Queryable<T>;
  intersect(otherItems: Iterable<T>, _equals?: Delegate<[T, T], boolean>): Queryable<T> {
    return new QueryableBase(intersect(this, otherItems, _equals as Delegate<[T, T], boolean>));
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
    keysEquals?: Delegate<[K, K], boolean>
  ): Queryable<R> {
    return new QueryableBase(join(this, others, selectInnerKey, selectOuterKey, selectResult, keysEquals as Delegate<[K, K], boolean>));
  }

  last(predicate: Delegate<[T, number], boolean>): T | undefined;
  last(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
  last(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return last(this, predicate, fallback as Delegate<[], T>);
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
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder?: SortOrder): Queryable<T> {
    return new QueryableBase(orderBy(this, selectKey, compareKeys, sortOrder as SortOrder));
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
  union(others: Iterable<T>, _equals: Delegate<[T, T], boolean>): Queryable<T>;
  union(others: Iterable<T>, _equals?: Delegate<[T, T], boolean>): Queryable<T> {
    return new QueryableBase(union(this, others, _equals as Delegate<[T, T], boolean>));
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
