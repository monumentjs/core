import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { randomInt } from '@monument/random';
import { KeyValuePair } from '../../base/KeyValuePair';
import { aggregate } from '../../operators/aggregate';
import { all } from '../../operators/all';
import { any } from '../../operators/any';
import { append } from '../../operators/append';
import { appendAll } from '../../operators/appendAll';
import { concat } from '../../operators/concat';
import { distinct } from '../../operators/distinct';
import { empty } from '../../operators/empty';
import { intersect } from '../../operators/intersect';
import { isProperSubsetOf } from '../../operators/isProperSubsetOf';
import { isProperSupersetOf } from '../../operators/isProperSupersetOf';
import { isSubsetOf } from '../../operators/isSubsetOf';
import { isSupersetOf } from '../../operators/isSupersetOf';
import { overlaps } from '../../operators/overlaps';
import { remove } from '../../operators/remove';
import { removeAll } from '../../operators/removeAll';
import { removeBy } from '../../operators/removeBy';
import { retainAll } from '../../operators/retainAll';
import { symmetricExceptWith } from '../../operators/symmetricExceptWith';
import { Queryable } from '../../queryable/Queryable';
import { QueryableBase } from '../../queryable/QueryableBase';
import { ReadOnlySet } from '../readonly/ReadOnlySet';
import { Set } from './Set';

export class ArraySet<T> implements Set<T> {
  private readonly _equals: Delegate<[T, T], boolean>;
  private readonly array: Array<T>;
  private readonly queryable: Queryable<T>;

  get length(): number {
    return this.array.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  constructor(items: Iterable<T> = [], equals: Delegate<[T, T], boolean> = StrictEquals) {
    this._equals = equals;
    this.array = [...distinct(items, equals)];
    this.queryable = new QueryableBase(this.array);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.array[Symbol.iterator]();
  }

  add(item: T): Set<T> {
    return new ArraySet(append(this, item), this._equals);
  }

  addAll(items: Iterable<T>): Set<T> {
    return new ArraySet(appendAll(this, items), this._equals);
  }

  clear(): Set<T> {
    return new ArraySet(empty(), this._equals);
  }

  intersectWith(other: Iterable<T>): Set<T> {
    return new ArraySet(intersect(this, other, this._equals));
  }

  remove(item: T): Set<T> {
    return new ArraySet(remove(this, item, this._equals));
  }

  removeAll(items: Iterable<T>): Set<T> {
    return new ArraySet(removeAll(this, items, this._equals));
  }

  removeBy(predicate: Delegate<[T, number], boolean>): Set<T> {
    return new ArraySet(removeBy(this, predicate));
  }

  retainAll(items: Iterable<T>): Set<T> {
    return new ArraySet(retainAll(this, items, this._equals));
  }

  symmetricExceptWith(other: Iterable<T>): Set<T> {
    return new ArraySet(symmetricExceptWith(this, other, this._equals));
  }

  unionWith(other: Iterable<T>): Set<T> {
    return new ArraySet(concat(this, [other]));
  }

  //#region ReadOnlySet

  isProperSubsetOf(other: ReadOnlySet<T>): boolean {
    return isProperSubsetOf(this, other, this._equals);
  }

  isProperSupersetOf(other: ReadOnlySet<T>): boolean {
    return isProperSupersetOf(this, other, this._equals);
  }

  isSubsetOf(other: ReadOnlySet<T>): boolean {
    return isSubsetOf(this, other, this._equals);
  }

  isSupersetOf(other: ReadOnlySet<T>): boolean {
    return isSupersetOf(this, other, this._equals);
  }

  overlaps(other: ReadOnlySet<T>): boolean {
    return overlaps(this, other, this._equals);
  }

  //#endregion

  //#region Queryable

  aggregate<R>(project: Delegate<[R, T, number], R>, initialSeed: R): R {
    return aggregate(this.array, project, initialSeed);
  }

  all(predicate: Delegate<[T, number], boolean>): boolean {
    return all(this.array, predicate);
  }

  any(predicate: Delegate<[T, number], boolean>): boolean {
    return any(this.array, predicate);
  }

  average(select: Delegate<[T, number], number>): number {
    return this.queryable.average(select);
  }

  chunk(): Queryable<Iterable<T>>;
  chunk(size: number): Queryable<Iterable<T>>;
  chunk(size: number = 1): Queryable<Iterable<T>> {
    return this.queryable.chunk(size);
  }

  concat(...others: Array<Iterable<T>>): Queryable<T> {
    return this.queryable.concat(...others);
  }

  contains(item: T): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean>): boolean;
  contains(item: T, equals: Delegate<[T, T], boolean> = this._equals): boolean {
    return this.queryable.contains(item, equals);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): boolean {
    return this.queryable.containsAll(items, equals);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return this.queryable.count(predicate);
  }

  distinct(): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.queryable.distinct(equals);
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return this.queryable.entries();
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.queryable.except(items, equals);
  }

  filter<R = T>(predicate: Delegate<[T, number], boolean>): Queryable<R> {
    return this.queryable.filter(predicate);
  }

  first(predicate: Delegate<[T, number], boolean>): T | undefined;
  first(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
  first(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return this.queryable.first(predicate, fallback as Delegate<[], T>);
  }

  forEach(accept: Delegate<[T, number], boolean | void>): void {
    this.queryable.forEach(accept);
  }

  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    combine: Delegate<[K, Iterable<V>], R>
  ): Queryable<R>;
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    combine: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean>
  ): Queryable<R>;
  groupBy<K, V, R>(
    selectKey: Delegate<[T, number], K>,
    selectValue: Delegate<[T, number], V>,
    combine: Delegate<[K, Iterable<V>], R>,
    keysEquals: Delegate<[K, K], boolean> = StrictEquals
  ): Queryable<R> {
    return this.queryable.groupBy(selectKey, selectValue, combine, keysEquals);
  }

  intersect(otherItems: Iterable<T>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.queryable.intersect(otherItems, equals);
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
    return this.queryable.join(others, selectInnerKey, selectOuterKey, selectResult, keysEquals);
  }

  last(predicate: Delegate<[T, number], boolean>): T | undefined;
  last(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
  last(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return this.queryable.last(predicate, fallback as Delegate<[], T>);
  }

  map<R>(project: Delegate<[T, number], R>): Queryable<R> {
    return this.queryable.map(project);
  }

  max(select: Delegate<[T, number], number>): number {
    return this.queryable.max(select);
  }

  min(select: Delegate<[T, number], number>): number {
    return this.queryable.min(select);
  }

  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder = SortOrder.ASCENDING): Queryable<T> {
    return this.queryable.orderBy(selectKey, compareKeys, sortOrder);
  }

  random(): T;
  random(rnd: Delegate<[number, number], number>): T;
  random(rnd: Delegate<[number, number], number> = randomInt): T {
    return this.queryable.random(rnd);
  }

  reverse(): Queryable<T> {
    return this.queryable.reverse();
  }

  selectMany<I, R>(project: Delegate<[T, number], Iterable<I>>, combine: Delegate<[T, I], R>): Queryable<R> {
    return this.queryable.selectMany(project, combine);
  }

  skip(offset: number): Queryable<T> {
    return this.queryable.skip(offset);
  }

  skipWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return this.queryable.skipWhile(condition);
  }

  slice(offset: number, limit: number): Queryable<T> {
    return this.queryable.slice(offset, limit);
  }

  sum(select: Delegate<[T, number], number>): number {
    return this.queryable.sum(select);
  }

  take(limit: number): Queryable<T> {
    return this.queryable.take(limit);
  }

  takeWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return this.queryable.takeWhile(condition);
  }

  union(others: Iterable<T>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.queryable.union(others, equals);
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return this.queryable.zip(others, combine);
  }

  //#endregion

  //#region Equatable

  equals(other: ReadOnlySet<T>): boolean {
    if (this === other) {
      return true;
    }

    return this.length === other.length && this.containsAll(other) && other.containsAll(this);
  }

  //#endregion

  //#region ToArray

  toArray(): Array<T> {
    return [...this.array];
  }

  //#endregion

  //#region ToJSON

  toJSON(): Array<T> {
    return this.toArray();
  }

  //#endregion

}
