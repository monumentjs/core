import { argument } from '@monument/assert';
import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { InvalidOperationException } from '@monument/exceptions';
import { randomInt } from '@monument/random';
import { KeyValuePair } from '../../base/KeyValuePair';
import { append } from '../../operators/append';
import { appendAll } from '../../operators/appendAll';
import { equals as _equals } from '../../operators/equals';
import { findIndex } from '../../operators/findIndex';
import { indexOf } from '../../operators/indexOf';
import { insert } from '../../operators/insert';
import { insertAll } from '../../operators/insertAll';
import { isEmpty } from '../../operators/isEmpty';
import { lastIndexOf } from '../../operators/lastIndexOf';
import { prepend } from '../../operators/prepend';
import { prependAll } from '../../operators/prependAll';
import { remove } from '../../operators/remove';
import { removeAll } from '../../operators/removeAll';
import { removeAt } from '../../operators/removeAt';
import { removeBy } from '../../operators/removeBy';
import { retainAll } from '../../operators/retainAll';
import { setAt } from '../../operators/setAt';
import { Queryable } from '../../queryable/Queryable';
import { QueryableBase } from '../../queryable/QueryableBase';
import { ReadOnlyList } from '../readonly/ReadOnlyList';
import { List } from './List';
import { Optional } from '@monument/data';

/**
 * Represents immutable list based on native `Array`.
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class ArrayList<T> implements List<T> {
  private readonly array: ReadonlyArray<T>;
  private readonly queryable: QueryableBase<T>;

  get length(): number {
    return this.array.length;
  }

  get isEmpty(): boolean {
    return this.array.length === 0;
  }

  get firstIndex(): Optional<number> {
    return this.isEmpty ? Optional.empty() : Optional.of(0);
  }

  get lastIndex(): Optional<number> {
    return this.isEmpty ? Optional.empty() : Optional.of(this.length - 1);
  }

  constructor(items: Iterable<T> = []) {
    this.array = [...items];
    this.queryable = new QueryableBase(this.array);
  }

  //#region Iterable

  [Symbol.iterator](): Iterator<T> {
    return this.array[Symbol.iterator]();
  }

  //#endregion

  //#region List

  append(item: T): List<T> {
    return new ArrayList(append(this.array, item));
  }

  appendAll(items: Iterable<T>): List<T> {
    if (isEmpty(items)) {
      return this;
    }

    return new ArrayList(appendAll(this.array, items));
  }

  appendIfAbsent(item: T): List<T>;
  appendIfAbsent(item: T, equals: Delegate<[T, T], boolean>): List<T>;
  appendIfAbsent(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): List<T> {
    if (!this.contains(item, equals)) {
      return this.append(item);
    }

    return this;
  }

  clear(): List<T> {
    return this.isEmpty ? this : new ArrayList<T>();
  }

  insert(position: number, item: T): List<T> {
    return new ArrayList(insert(this.array, position, item));
  }

  insertAll(position: number, items: Iterable<T>): List<T> {
    const newList = new ArrayList(insertAll(this.array, position, items));

    return newList.length > this.length ? newList : this;
  }

  prepend(item: T): List<T> {
    return new ArrayList(prepend(this.array, item));
  }

  prependAll(items: Iterable<T>): List<T> {
    if (isEmpty(items)) {
      return this;
    }

    return new ArrayList(prependAll(this.array, items));
  }

  remove(item: T): List<T>;
  remove(item: T, equals: Delegate<[T, T], boolean>): List<T>;
  remove(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): List<T> {
    const newList = new ArrayList(remove(this.array, item, equals));

    if (newList.length !== this.length) {
      return newList;
    }

    return this;
  }

  removeAll(items: Iterable<T>): List<T>;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): List<T>;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): List<T> {
    const newList = new ArrayList(removeAll(this.array, items, equals));

    if (newList.length !== this.length) {
      return newList;
    }

    return this;
  }

  removeAt(position: number): List<T> {
    return new ArrayList(removeAt(this.array, position));
  }

  removeBy(predicate: Delegate<[T, number], boolean>): List<T> {
    const newList = new ArrayList(removeBy(this.array, predicate));

    if (newList.length !== this.length) {
      return newList;
    }

    return this;
  }

  retainAll(items: Iterable<T>): List<T>;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): List<T>;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): List<T> {
    const newList = new ArrayList(retainAll(this.array, items, equals));

    if (newList.length !== this.length) {
      return newList;
    }

    return this;
  }

  setAt(position: number, newValue: T): List<T> {
    return new ArrayList(setAt(this.array, position, newValue));
  }

  //#endregion

  toArray(): Array<T> {
    return this.queryable.toArray();
  }

  toJSON(): Array<T> {
    return this.queryable.toJSON();
  }

  //#region Equatable

  equals(other: ReadOnlyList<T>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    if (this.length !== other.length) {
      return false;
    }

    return _equals(this.queryable, other, equals);
  }

  //#endregion

  //#region ReadOnlyList

  findIndex(predicate: Delegate<[T, number], boolean>): Optional<number> {
    return findIndex(this.array, predicate);
  }

  getAt(position: number): T | never {
    argument(position >= 0, `Position cannot be negative: position=${position}`);
    argument(position < this.array.length, `Position is out of bounds: position=${position}, length=${this.array.length}`);

    return this.array[position];
  }

  indexOf(item: T): Optional<number>;
  indexOf(item: T, equals: Delegate<[T, T], boolean>): Optional<number>;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): Optional<number>;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): Optional<number>;
  indexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, offset: number = 0, limit: number = Infinity): Optional<number> {
    return indexOf(this.array, item, equals, offset, limit);
  }

  lastIndexOf(item: T): Optional<number>;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>): Optional<number>;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): Optional<number>;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): Optional<number>;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, offset: number = 0, limit: number = Infinity): Optional<number> {
    return lastIndexOf(this.array, item, equals, offset, limit);
  }

  //#endregion

  //#region Queryable

  aggregate<R>(project: Delegate<[R, T, number], R>, initialSeed: R): R {
    return this.array.reduce((previous, current, index) => project(previous, current, index), initialSeed);
  }

  all(predicate: Delegate<[T, number], boolean>): boolean {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty collections.`);
    }

    return this.array.every((value, index) => predicate(value, index));
  }

  any(predicate: Delegate<[T, number], boolean>): boolean {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty collections.`);
    }

    return this.array.some((value, index) => predicate(value, index));
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
  contains(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.queryable.contains(item, equals);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.queryable.containsAll(items, equals);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return this.queryable.count(predicate);
  }

  distinct(): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.queryable.distinct(equals);
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return this.queryable.entries();
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.queryable.except(items, equals);
  }

  filter<R = T>(predicate: Delegate<[T, number], boolean>): Queryable<R> {
    return this.queryable.filter(predicate);
  }

  first(): Optional<T> {
    return this.queryable.first();
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
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
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

  last(): Optional<T> {
    return this.queryable.last();
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
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.queryable.union(others, equals);
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return this.queryable.zip(others, combine);
  }

  //#endregion
}
