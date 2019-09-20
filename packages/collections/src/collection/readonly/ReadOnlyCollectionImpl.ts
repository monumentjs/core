import {
  EqualsFunction,
  CompareFunction,
  ReadOnlyCollection,
  ReadOnlyMultiValueMap,
  Sequence,
  SortOrder,
  SupplyFunction
} from '@monument/contracts';
import { StrictEquals, RandomInt } from '@monument/core';
import {
  InvalidOperationException,
  InvalidArgumentException,
  NoSuchItemException,
  IndexOutOfBoundsException
} from '@monument/exceptions';
import { CollectionUtils } from '../../base/CollectionUtils';
import { LinkedMultiValueMap } from '../../multivaluemap/mutable/LinkedMultiValueMap';
import { KeyValuePair } from '../../base/KeyValuePair';
import { AggregateFunction } from '../../function/AggregateFunction';
import { IteratorFunction } from '../../function/IteratorFunction';
import { CombineFunction } from '../../function/CombineFunction';
import { ProjectFunction } from '../../function/ProjectFunction';

/**
 * @todo need to rename it prior to release of V1
 * @author Alex Chugaev
 * @since 0.0.1
 * @final
 * @readonly
 */
export class ReadOnlyCollectionImpl<T> implements ReadOnlyCollection<T> {
  private readonly _source: Iterable<T>;

  get isEmpty(): boolean {
    for (const _ of this) {
      return false;
    }

    return true;
  }

  get length(): number {
    let length: number = 0;

    for (const _ of this) {
      length++;
    }

    return length;
  }

  constructor(source: Iterable<T>, isStatic: boolean = false) {
    this._source = isStatic ? [...source] : source;
  }

  [Symbol.iterator](): Iterator<T> {
    return this._source[Symbol.iterator]();
  }

  aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate {
    let lastSeed: TAggregate = initialSeed;

    for (const [ownIndex, ownItem] of this.entries()) {
      lastSeed = iterator(lastSeed, ownItem, ownIndex);
    }

    return lastSeed;
  }

  all(predicate: IteratorFunction<T, boolean>): boolean {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
    }

    for (const [ownIndex, ownItem] of this.entries()) {
      if (!predicate(ownItem, ownIndex)) {
        return false;
      }
    }

    return true;
  }

  any(predicate: IteratorFunction<T, boolean>): boolean {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
    }

    for (const [ownIndex, ownItem] of this.entries()) {
      if (predicate(ownItem, ownIndex)) {
        return true;
      }
    }

    return false;
  }

  average(selector: IteratorFunction<T, number>): number {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
    }

    return this.sum(selector) / this.length;
  }

  chunk(size: number = 1): ReadOnlyCollection<Iterable<T>> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<Iterable<T>> {
        let itemsLeft: number = size;
        let chunk: T[] = [];

        for (const ownItem of self) {
          chunk.push(ownItem);
          itemsLeft--;

          if (itemsLeft === 0) {
            yield chunk;
            itemsLeft = size;
            chunk = [];
          }
        }

        if (chunk.length > 0) {
          yield chunk;
        }
      }
    });
  }

  concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const item of self) {
          yield item;
        }

        for (const item of otherList) {
          yield item;
        }

        for (const list of others) {
          for (const item of list) {
            yield item;
          }
        }
      }
    });
  }

  contains(otherItem: T): boolean;

  contains(otherItem: T, comparator: EqualsFunction<T>): boolean;

  contains(otherItem: T, comparator: EqualsFunction<T> = StrictEquals): boolean {
    for (const currentItem of this) {
      if (comparator(currentItem, otherItem)) {
        return true;
      }
    }

    return false;
  }

  containsAll(items: Sequence<T>): boolean;

  containsAll(items: Sequence<T>, comparator: EqualsFunction<T>): boolean;

  containsAll(items: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): boolean {
    if (items.length === 0) {
      return false;
    }

    for (const item of items) {
      if (!this.contains(item, comparator)) {
        return false;
      }
    }

    return true;
  }

  count(predicate: IteratorFunction<T, boolean>): number {
    return this.aggregate((count: number, ownItem: T, index: number) => {
      const itemMatchesPredicate: boolean = predicate(ownItem, index);

      if (itemMatchesPredicate) {
        return count + 1;
      }

      return count;
    }, 0);
  }

  /**
   * Returns distinct elements from a sequence by using a specified EqualsFunction to compare values.
   */
  distinct(): ReadOnlyCollection<T>;

  distinct(comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  distinct(comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        const uniqueItems: T[] = [];
        const uniqueItems$ = new ReadOnlyCollectionImpl(uniqueItems);

        for (const ownItem of self) {
          if (!uniqueItems$.contains(ownItem, comparator)) {
            uniqueItems.push(ownItem);

            yield ownItem;
          }
        }
      }
    });
  }

  *entries(): Iterable<KeyValuePair<number, T>> {
    let index: number = 0;

    for (const ownItem of this) {
      yield [index, ownItem];

      index++;
    }
  }

  equals(otherList: Sequence<T>): boolean;

  equals(otherList: Sequence<T>, comparator: EqualsFunction<T>): boolean;

  equals(otherList: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): boolean {
    const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

    if (this.length !== otherList$.length) {
      return false;
    }

    if (this.isEmpty && otherList$.isEmpty) {
      return true;
    }

    const thisIterator: Iterator<T> = this[Symbol.iterator]();
    const otherIterator: Iterator<T> = otherList[Symbol.iterator]();

    let thisIteratorResult: IteratorResult<T> = thisIterator.next();
    let otherIteratorResult: IteratorResult<T> = otherIterator.next();

    while (thisIteratorResult.done === false && otherIteratorResult.done === false) {
      if (!comparator(thisIteratorResult.value, otherIteratorResult.value)) {
        return false;
      }

      thisIteratorResult = thisIterator.next();
      otherIteratorResult = otherIterator.next();
    }

    return true;
  }

  /**
   * Produces the set difference of two sequences.
   */
  except(otherList: Iterable<T>): ReadOnlyCollection<T>;

  /**
   * Produces the set difference of two sequences.
   */
  except(otherList: Iterable<T>, comparator: EqualsFunction<T>): ReadOnlyCollection<T>;

  /**
   * Produces the set difference of two sequences.
   */
  except(otherList: Iterable<T>, comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    const self: this = this;
    const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const ownItem of self) {
          if (!otherList$.contains(ownItem, comparator)) {
            yield ownItem;
          }
        }

        for (const otherItem of otherList$) {
          if (!self.contains(otherItem, comparator)) {
            yield otherItem;
          }
        }
      }
    });
  }

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>, limit: number): ReadOnlyCollection<T>;

  /**
   * Calls predicate function on each item in sequence.
   * Returns new collection containing items for which predicate function returned `true`.
   */
  findAll(predicate: IteratorFunction<T, boolean>, limit: number, offset: number): ReadOnlyCollection<T>;

  findAll(predicate: IteratorFunction<T, boolean>, limit: number = Number.POSITIVE_INFINITY, offset: number = 0): ReadOnlyCollection<T> {
    if (limit < 0) {
      throw new InvalidArgumentException(`Limit is negative (${limit})`);
    }

    if (offset < 0) {
      throw new InvalidArgumentException(`Offset is negative (${offset})`);
    }

    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        let matchesCount: number = 0;
        let itemsLeft: number = limit;

        for (const [index, ownItem] of self.entries()) {
          if (predicate(ownItem, index)) {
            if (itemsLeft > 0 && matchesCount >= offset) {
              yield ownItem;

              itemsLeft--;
            }

            matchesCount++;
          }
        }
      }
    });
  }

  first(predicate: IteratorFunction<T, boolean>): T | undefined;
  first(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;
  first(predicate: IteratorFunction<T, boolean>, fallback?: SupplyFunction<T>): T | undefined {
    for (const [index, ownItem] of this.entries()) {
      if (predicate(ownItem, index)) {
        return ownItem;
      }
    }

    return fallback ? fallback() : undefined;
  }

  firstOrDefault(fallback: SupplyFunction<T>): T {
    if (this.isEmpty) {
      return fallback();
    } else {
      return this.getAt(0);
    }
  }

  forEach(iterator: IteratorFunction<T, false | void>): void;
  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
  forEach(iterator: IteratorFunction<T, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
    CollectionUtils.validateSliceBounds(this, startIndex, count);

    let itemsLeft: number = count;

    for (const [index, ownItem] of this.entries()) {
      if (itemsLeft === 0) {
        break;
      }

      if (index >= startIndex) {
        const result: boolean | void = iterator(ownItem, index);

        if (result === false) {
          return;
        }

        itemsLeft--;
      }
    }
  }

  forEachBack(iterator: IteratorFunction<T, false | void>): void;
  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
  forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
  forEachBack(
    iterator: IteratorFunction<T, false | void>,
    startIndex: number = Math.max(this.length - 1, 0),
    count: number = startIndex + (this.length ? 1 : 0)
  ): void {
    if (startIndex < 0) {
      throw new InvalidArgumentException('Start index cannot be negative.');
    }

    if (count < 0) {
      throw new InvalidArgumentException('Count cannot be negative.');
    }

    let index: number = startIndex;
    let itemsLeft: number = count;

    while (itemsLeft > 0) {
      if (iterator(this.getAt(index), index) === false) {
        break;
      }

      index--;
      itemsLeft--;
    }
  }

  getAt(index: number): T {
    if (index < 0) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    for (const [position, ownItem] of this.entries()) {
      if (index === position) {
        return ownItem;
      }
    }

    throw new IndexOutOfBoundsException(index, this.length);
  }

  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ReadOnlyMultiValueMap<TKey, T>;
  groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualsFunction<TKey>): ReadOnlyMultiValueMap<TKey, T>;
  groupBy<TKey>(
    keySelector: IteratorFunction<T, TKey>,
    keyComparator: EqualsFunction<TKey> = StrictEquals
  ): ReadOnlyMultiValueMap<TKey, T> {
    const groups: LinkedMultiValueMap<TKey, T> = new LinkedMultiValueMap(keyComparator);

    for (const [index, item] of this.entries()) {
      groups.put(keySelector(item, index), item);
    }

    return groups;
  }

  intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;
  intersect(otherList: Sequence<T>, comparator: EqualsFunction<T>): ReadOnlyCollection<T>;
  intersect(otherList: Sequence<T>, comparator: EqualsFunction<T> = StrictEquals): ReadOnlyCollection<T> {
    const self: this = this;
    const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const item of self) {
          if (otherList$.contains(item, comparator)) {
            yield item;
          }
        }
      }
    });
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
    const self = this;
    const outerList$: ReadOnlyCollectionImpl<TOuter> = new ReadOnlyCollectionImpl(outerList);

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<TResult> {
        for (const [index, ownItem] of self.entries()) {
          const innerKey: TKey = innerKeySelector(ownItem, index);

          for (const [outerIndex, outerItem] of outerList$.entries()) {
            const outerKey: TKey = outerKeySelector(outerItem, outerIndex);

            if (keyComparator(innerKey, outerKey)) {
              yield resultSelector(ownItem, outerItem);
            }
          }
        }
      }
    });
  }

  last(predicate: IteratorFunction<T, boolean>): T | undefined;

  last(predicate: IteratorFunction<T, boolean>, fallback: SupplyFunction<T>): T;

  last(predicate: IteratorFunction<T, boolean>, fallback?: SupplyFunction<T>): T | undefined {
    let lastItem: T | undefined;
    let itemFound: boolean = false;

    for (const [index, ownItem] of this.entries()) {
      if (predicate(ownItem, index)) {
        lastItem = ownItem;
        itemFound = true;
      }
    }

    return itemFound ? lastItem : fallback ? fallback() : undefined;
  }

  lastOrDefault(fallback: SupplyFunction<T>): T {
    if (this.isEmpty) {
      return fallback();
    } else {
      return this.getAt(this.length - 1);
    }
  }

  map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<TResult> {
        for (const [index, ownItem] of self.entries()) {
          yield selector(ownItem, index);
        }
      }
    });
  }

  max(selector: IteratorFunction<T, number>): number {
    if (this.isEmpty) {
      throw new InvalidOperationException('Unable to perform operation on empty list.');
    }

    return this.aggregate((maxValue: number, ownItem: T, index: number): number => {
      const itemValue: number = selector(ownItem, index);

      if (index === 0) {
        return itemValue;
      }

      return Math.max(maxValue, itemValue);
    }, 0);
  }

  min(selector: IteratorFunction<T, number>): number {
    if (this.isEmpty) {
      throw new InvalidOperationException('Unable to perform operation on empty list.');
    }

    return this.aggregate((minValue: number, ownItem: T, index: number): number => {
      const itemValue: number = selector(ownItem, index);

      if (index === 0) {
        return itemValue;
      }

      return Math.min(minValue, itemValue);
    }, 0);
  }

  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: CompareFunction<TKey>): ReadOnlyCollection<T>;
  orderBy<TKey>(keySelector: ProjectFunction<T, TKey>, comparator: CompareFunction<TKey>, sortOrder: SortOrder): ReadOnlyCollection<T>;
  orderBy<TKey>(
    keySelector: ProjectFunction<T, TKey>,
    comparator: CompareFunction<TKey>,
    sortOrder: SortOrder = SortOrder.ASCENDING
  ): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(
      this.toArray().sort((x: T, y: T): number => {
        const xKey: TKey = keySelector(x);
        const yKey: TKey = keySelector(y);

        return comparator(xKey, yKey) * sortOrder;
      })
    );
  }

  random(): T {
    if (this.isEmpty) {
      throw new NoSuchItemException('Random item not found.');
    }

    const index: number = new RandomInt(0, this.length).value;

    return this.getAt(index);
  }

  reverse(): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this.toArray().reverse());
  }

  selectMany<TInnerItem, TResult>(
    collectionSelector: IteratorFunction<T, Iterable<TInnerItem>>,
    resultSelector: CombineFunction<T, TInnerItem, TResult>
  ): ReadOnlyCollection<TResult> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<TResult> {
        for (const [ownIndex, ownItem] of self.entries()) {
          const collection: Iterable<TInnerItem> = collectionSelector(ownItem, ownIndex);

          for (const innerItem of collection) {
            yield resultSelector(ownItem, innerItem);
          }
        }
      }
    });
  }

  skip(offset: number): ReadOnlyCollection<T> {
    const self: this = this;

    if (offset < 0) {
      throw new IndexOutOfBoundsException('Offset cannot be negative.');
    }

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        let index: number = 0;

        for (const item of self) {
          if (index >= offset) {
            yield item;
          }

          index++;
        }
      }
    });
  }

  skipWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        let skip: boolean = true;

        for (const [index, item] of self.entries()) {
          if (skip) {
            skip = condition(item, index);
          }

          if (!skip) {
            yield item;
          }
        }
      }
    });
  }

  slice(offset: number): ReadOnlyCollection<T>;
  slice(offset: number, length: number): ReadOnlyCollection<T>;
  slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
    CollectionUtils.validateSliceBounds(this, offset, length);

    const self: this = this;
    const maxIndex: number = offset + length;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const [index, item] of self.entries()) {
          if (index >= maxIndex) {
            break;
          }

          if (index >= offset) {
            yield item;
          }
        }
      }
    });
  }

  sum(selector: IteratorFunction<T, number>): number {
    if (this.isEmpty) {
      throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
    }

    return this.aggregate((total: number, ownItem: T, index: number): number => {
      const selectedValue: number = selector(ownItem, index);

      return total + selectedValue;
    }, 0);
  }

  take(length: number): ReadOnlyCollection<T> {
    if (length < 0) {
      throw new InvalidArgumentException('Slice length cannot be negative.');
    }

    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const [index, item] of self.entries()) {
          if (index >= length) {
            break;
          }

          yield item;
        }
      }
    });
  }

  takeWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        for (const [index, item] of self.entries()) {
          if (!condition(item, index)) {
            break;
          }

          yield item;
        }
      }
    });
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
    const self = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<T> {
        const union: T[] = self.toArray();
        const union$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(union);

        for (const item of self) {
          yield item;
        }

        for (const item of otherList) {
          if (!union$.contains(item, comparator)) {
            union.push(item);
            yield item;
          }
        }
      }
    });
  }

  zip<TOther, TResult>(otherItems: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ReadOnlyCollection<TResult> {
    const self: this = this;

    return new ReadOnlyCollectionImpl({
      *[Symbol.iterator](): Iterator<TResult> {
        const otherItems$ = new ReadOnlyCollectionImpl(otherItems);
        const minLength: number = Math.min(self.length, otherItems$.length);

        for (const [index, otherItem] of otherItems$.entries()) {
          if (index >= minLength) {
            break;
          }

          const ownItem: T = self.getAt(index);
          const result: TResult = resultSelector(ownItem, otherItem);

          yield result;
        }
      }
    });
  }
}
