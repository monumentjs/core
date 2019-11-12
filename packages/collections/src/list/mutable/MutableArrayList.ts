import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Delegate } from '@monument/core';
import { randomInt } from '@monument/random';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pairwise, shareReplay } from 'rxjs/operators';
import { KeyValuePair } from '../../base/KeyValuePair';
import { IndexOutOfBoundsException } from '../../exceptions/IndexOutOfBoundsException';
import { Queryable } from '../../queryable/Queryable';
import { ArrayList } from '../immutable/ArrayList';
import { List } from '../immutable/List';
import { ReadOnlyList } from '../readonly/ReadOnlyList';
import { ListChangeEvent } from './event/ListChangeEvent';
import { MutableList } from './MutableList';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class MutableArrayList<T> implements MutableList<T> {
  private readonly source$: BehaviorSubject<List<T>>;

  protected get source(): List<T> {
    return this.source$.value;
  }

  protected set source(list: List<T>) {
    this.source$.next(list);
  }

  //#region Getters and setters

  //#region MutableList

  readonly changed: Observable<ListChangeEvent<T>>;

  //#endregion

  //#region ReadOnlyList

  get firstIndex(): number | undefined {
    return this.source.firstIndex;
  }

  get lastIndex(): number | undefined {
    return this.source.lastIndex;
  }

  //#endregion

  //#region Queryable

  get isEmpty(): boolean {
    return this.source.isEmpty;
  }

  //#endregion

  //#region Sequence

  get length(): number {
    return this.source.length;
  }

  //#endregion

  //#endregion

  //#region Constructor

  constructor(items?: Iterable<T>) {
    this.source$ = new BehaviorSubject<List<T>>(new ArrayList(items));

    this.changed = this.source$.pipe(
      distinctUntilChanged(),
      pairwise(),
      map(([previous, current]) => new ListChangeEvent(this, previous, current)),
      shareReplay(1)
    );
  }

  //#endregion

  //#region Methods

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  //#region Equatable

  equals(other: ReadOnlyList<T>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.source.equals(other, equals);
  }

  //#endregion

  //#region Cloneable

  clone(): MutableList<T> {
    return new MutableArrayList(this.source);
  }

  //#endregion

  //#region Disposable

  dispose(): void {
    this.source$.unsubscribe();
  }

  //#endregion

  //#region MutableList

  add(item: T): boolean {
    return this._update(list => list.append(item));
  }

  addAll(items: Iterable<T>): boolean {
    return this._update(list => list.appendAll(items));
  }

  addIfAbsent(item: T): boolean;
  addIfAbsent(item: T, equals: Delegate<[T, T], boolean>): boolean;
  addIfAbsent(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.appendIfAbsent(item, equals));
  }

  clear(): boolean {
    return this._update(list => list.clear());
  }

  insert(index: number, item: T): boolean {
    return this._update(list => list.insert(index, item));
  }

  insertAll(index: number, items: Iterable<T>): boolean {
    return this._update(list => list.insertAll(index, items));
  }

  remove(item: T): boolean;
  remove(item: T, equals: Delegate<[T, T], boolean>): boolean;
  remove(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.remove(item, equals));
  }

  removeAll(items: Iterable<T>): boolean;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.removeAll(items, equals));
  }

  removeAt(index: number): T | never {
    const value = this.source.getAt(index);

    this.source = this.source.removeAt(index);

    return value;
  }

  removeBy(predicate: Delegate<[T, number], boolean>): boolean {
    return this._update(list => list.removeBy(predicate));
  }

  retainAll(items: Iterable<T>): boolean;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.retainAll(items, equals));
  }

  setAt(position: number, newValue: T): T {
    if (position < 0 || position > this.length) {
      throw new IndexOutOfBoundsException(position, this.length);
    }

    const oldValue: T = this.source.getAt(position);

    this.source = this.source.setAt(position, newValue);

    return oldValue;
  }

  //#endregion

  //#region ReadOnlyList

  findIndex(predicate: Delegate<[T, number], boolean>): number | undefined {
    return this.source.findIndex(predicate);
  }

  getAt(position: number): T {
    return this.source.getAt(position);
  }

  indexOf(item: T): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, offset = 0, limit = Infinity): number | undefined {
    return this.source.indexOf(item, equals, offset, limit);
  }

  lastIndexOf(item: T): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, offset: number = 0, limit: number = Infinity): number | undefined {
    return this.source.lastIndexOf(item, equals, offset, limit);
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
  chunk(size: number = 1): Queryable<Iterable<T>> {
    return this.source.chunk(size);
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

  distinct(): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.distinct(equals);
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return this.source.entries();
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.except(items, equals);
  }

  filter<R = T>(predicate: Delegate<[T, number], boolean>): Queryable<R> {
    return this.source.filter(predicate);
  }

  first(predicate: Delegate<[T, number], boolean>): T | undefined;
  first(predicate: Delegate<[T, number], boolean>, fallback: Delegate<[], T>): T;
  first(predicate: Delegate<[T, number], boolean>, fallback?: Delegate<[], T>): T | undefined {
    return this.source.first(predicate, fallback as Delegate<[], T>);
  }

  forEach(consume: Delegate<[T, number], boolean | void>): void {
    return this.source.forEach(consume);
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
    return this.source.groupBy(selectKey, selectValue, selectResult, keysEquals);
  }

  intersect(otherItems: Iterable<T>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.intersect(otherItems, equals);
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
    return this.source.join(others, selectInnerKey, selectOuterKey, selectResult, keysEquals);
  }

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

  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder): Queryable<T>;
  orderBy<K>(selectKey: Delegate<[T], K>, compareKeys: Delegate<[K, K], ComparisonResult>, sortOrder: SortOrder = SortOrder.ASCENDING): Queryable<T> {
    return this.source.orderBy(selectKey, compareKeys, sortOrder);
  }

  random(): T;
  random(rnd: Delegate<[number, number], number>): T;
  random(rnd: Delegate<[number, number], number> = randomInt): T {
    return this.source.random(rnd);
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

  take(limit: number): Queryable<T> {
    return this.source.take(limit);
  }

  takeWhile(condition: Delegate<[T, number], boolean>): Queryable<T> {
    return this.source.takeWhile(condition);
  }

  union(others: Iterable<T>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): Queryable<T> {
    return this.source.union(others, equals);
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return this.source.zip(others, combine);
  }

  //#endregion

  toArray(): Array<T> {
    return this.source.toArray();
  }

  toJSON(): Array<T> {
    return this.source.toJSON();
  }

  private _update(execute: Delegate<[List<T>], List<T>>): boolean {
    const newList = execute(this.source);

    if (this.source !== newList) {
      this.source = newList;

      return true;
    }

    return false;
  }

  //#endregion
}
