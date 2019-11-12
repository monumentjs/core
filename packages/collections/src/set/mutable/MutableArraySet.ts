import { ComparisonResult, SortOrder, StrictEquals } from '@monument/comparison';
import { Cloneable, Delegate } from '@monument/core';
import { randomInt } from '@monument/random';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pairwise, shareReplay } from 'rxjs/operators';
import { KeyValuePair } from '../../base/KeyValuePair';
import { Queryable } from '../../queryable/Queryable';
import { Set } from '../../set/immutable/Set';
import { ArraySet } from '../immutable/ArraySet';
import { ReadOnlySet } from '../readonly/ReadOnlySet';
import { SetChangeEvent } from './event/SetChangeEvent';
import { MutableSet } from './MutableSet';

/**
 * Represents mutable set based on immutable `ArraySet<T>`.
 * @emits SetChangeEvent when current set changed
 * @see ArraySet
 * @see MutableSet
 * @see SetChangeEvent
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class MutableArraySet<T> implements MutableSet<T>, Cloneable<MutableArraySet<T>> {
  private readonly _equals: Delegate<[T, T], boolean>;
  private readonly _source: BehaviorSubject<Set<T>>;

  protected get source(): Set<T> {
    return this._source.value;
  }

  protected set source(list: Set<T>) {
    this._source.next(list);
  }

  //#region MutableList

  readonly changed: Observable<SetChangeEvent<T>>;

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

  constructor(items: Iterable<T> = [], equals: Delegate<[T, T], boolean> = StrictEquals) {
    this._equals = equals;
    this._source = new BehaviorSubject<Set<T>>(new ArraySet(items, equals));

    this.changed = this._source.pipe(
      distinctUntilChanged(),
      pairwise(),
      map(([previous, current]) => new SetChangeEvent(this, previous, current)),
      shareReplay(1)
    );
  }

  //#region Iterable

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  //#endregion

  //#region Cloneable

  clone(): MutableArraySet<T> {
    return new MutableArraySet(this, this._equals);
  }

  //#endregion

  //#region Equatable

  equals(other: ReadOnlySet<T>): boolean {
    return this.setEquals(other);
  }

  //#endregion

  //#region ToArray

  toArray(): Array<T> {
    return [...this];
  }

  //#endregion

  //#region ToJSON

  toJSON(): Array<T> {
    return [...this];
  }

  //#endregion

  //#region MutableSet

  add(item: T): boolean {
    return this._update(set => set.add(item));
  }

  addAll(items: Iterable<T>): boolean {
    return this._update(set => set.addAll(items));
  }

  clear(): boolean {
    return this._update(set => set.clear());
  }

  /**
   * Modifies the current set so that it contains only elements that are also in a specified collection.
   */
  intersectWith(other: Iterable<T>): boolean {
    return this._update(set => set.intersectWith(other));
  }

  remove(item: T): boolean {
    return this._update(set => set.remove(item));
  }

  removeAll(items: Iterable<T>): boolean {
    return this._update(set => set.removeAll(items));
  }

  removeBy(predicate: Delegate<[T, number], boolean>): boolean {
    return this._update(set => set.removeBy(predicate));
  }

  retainAll(items: Iterable<T>): boolean {
    return this._update(set => set.retainAll(items));
  }

  symmetricExceptWith(other: ReadOnlySet<T>): boolean {
    return this._update(set => set.symmetricExceptWith(other));
  }

  unionWith(other: ReadOnlySet<T>): boolean {
    return this._update(set => set.unionWith(other));
  }

  //#endregion

  //#region ReadOnlySet

  isProperSubsetOf(other: ReadOnlySet<T>): boolean {
    if (this.length >= other.length) {
      return false;
    }

    return this.isSubsetOf(other);
  }

  isProperSupersetOf(other: ReadOnlySet<T>): boolean {
    if (this.length <= other.length) {
      return false;
    }

    return this.isSupersetOf(other);
  }

  isSubsetOf(other: ReadOnlySet<T>): boolean {
    let isValidSubset: boolean = true;

    for (const ownItem of this) {
      let isCurrentItemInOtherSet: boolean = false;

      for (const otherItem of other) {
        if (this._equals(ownItem, otherItem)) {
          isCurrentItemInOtherSet = true;

          break;
        }
      }

      if (!isCurrentItemInOtherSet) {
        isValidSubset = false;

        break;
      }
    }

    return isValidSubset;
  }

  isSupersetOf(other: ReadOnlySet<T>): boolean {
    let isValidSuperset: boolean = true;

    for (const ownItem of other) {
      let isOtherItemInCurrentSet: boolean = false;

      for (const currentItem of this) {
        if (this._equals(currentItem, ownItem)) {
          isOtherItemInCurrentSet = true;

          break;
        }
      }

      if (!isOtherItemInCurrentSet) {
        isValidSuperset = false;

        break;
      }
    }

    return isValidSuperset;
  }

  overlaps(other: ReadOnlySet<T>): boolean {
    if (this.isEmpty) {
      return false;
    }

    for (const item of other) {
      if (this.contains(item)) {
        return true;
      }
    }

    return false;
  }

  setEquals(other: ReadOnlySet<T>): boolean {
    return this.length === other.length && this.containsAll(other) && other.containsAll(this);
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
  contains(item: T, equals: Delegate<[T, T], boolean> = this._equals): boolean {
    return this.source.contains(item, equals);
  }

  containsAll(items: Iterable<T>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  containsAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): boolean {
    return this.source.containsAll(items, equals);
  }

  count(predicate: Delegate<[T, number], boolean>): number {
    return this.source.count(predicate);
  }

  distinct(): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean>): Queryable<T>;
  distinct(equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.source.distinct(equals);
  }

  entries(): Queryable<KeyValuePair<number, T>> {
    return this.source.entries();
  }

  except(items: Iterable<T>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  except(items: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
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
    this.source.forEach(consume);
  }

  groupBy<K, V, R>(selectKey: Delegate<[T, number], K>, selectValue: Delegate<[T, number], V>, selectResult: Delegate<[K, Iterable<V>], R>): Queryable<R>;
  groupBy<K, V, R>(selectKey: Delegate<[T, number], K>, selectValue: Delegate<[T, number], V>, selectResult: Delegate<[K, Iterable<V>], R>, keysEquals: Delegate<[K, K], boolean>): Queryable<R>;
  groupBy<K, V, R>(selectKey: Delegate<[T, number], K>, selectValue: Delegate<[T, number], V>, selectResult: Delegate<[K, Iterable<V>], R>, keysEquals: Delegate<[K, K], boolean> = StrictEquals): Queryable<R> {
    return this.source.groupBy(selectKey, selectValue, selectResult, keysEquals);
  }

  intersect(otherItems: Iterable<T>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean>): Queryable<T>;
  intersect(otherItems: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.source.intersect(otherItems, equals);
  }

  join<O, K, R>(others: Iterable<O>, selectInnerKey: Delegate<[T, number], K>, selectOuterKey: Delegate<[O, number], K>, selectResult: Delegate<[T, O], R>): Queryable<R>;
  join<O, K, R>(others: Iterable<O>, selectInnerKey: Delegate<[T, number], K>, selectOuterKey: Delegate<[O, number], K>, selectResult: Delegate<[T, O], R>, keysEquals: Delegate<[K, K], boolean>): Queryable<R>;
  join<O, K, R>(others: Iterable<O>, selectInnerKey: Delegate<[T, number], K>, selectOuterKey: Delegate<[O, number], K>, selectResult: Delegate<[T, O], R>, keysEquals: Delegate<[K, K], boolean> = StrictEquals): Queryable<R> {
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
  union(others: Iterable<T>, equals: Delegate<[T, T], boolean> = this._equals): Queryable<T> {
    return this.source.union(others, equals);
  }

  zip<O, R>(others: Iterable<O>, combine: Delegate<[T, O], R>): Queryable<R> {
    return this.source.zip(others, combine);
  }

  //#endregion

  private _update(execute: Delegate<[Set<T>], Set<T>>): boolean {
    const newSet = execute(this.source);

    if (this.source !== newSet) {
      this.source = newSet;

      return true;
    }

    return false;
  }

}
