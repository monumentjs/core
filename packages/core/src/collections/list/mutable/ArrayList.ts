import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';
import { Cloneable } from '../../../base/Cloneable';
import { EqualityComparator } from '../../../comparison/equality/EqualityComparator';
import { ReferenceEqualityComparator } from '../../../comparison/equality/ReferenceEqualityComparator';
import { ReadOnlyCollectionBase } from '../../collection/readonly/ReadOnlyCollectionBase';
import { List } from './List';
import { CollectionUtils } from '../../base/CollectionUtils';
import { IndexOutOfBoundsException } from '../../../exceptions/IndexOutOfBoundsException';
import { RangeException } from '../../../exceptions/RangeException';
import { ReadOnlyCollectionImpl } from '../../collection/readonly/ReadOnlyCollectionImpl';
import { ReadOnlyList } from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArrayList<T> extends ReadOnlyCollectionBase<T> implements List<T>, Cloneable<ArrayList<T>> {
  private readonly _items: T[];

  get length(): number {
    return this._items.length;
  }

  get firstIndex(): number {
    return this._items.length > 0 ? 0 : -1;
  }

  get lastIndex(): number {
    return this._items.length - 1;
  }

  constructor(items?: Iterable<T>) {
    super();
    this._items = items == null ? [] : [...items];
  }

  [Symbol.iterator](): Iterator<T> {
    return this._items[Symbol.iterator]();
  }

  add(item: T): boolean {
    this._items.push(item);

    return true;
  }

  addAll(items: Iterable<T>): boolean {
    const oldLength: number = this.length;

    this._items.push(...items);

    return this.length !== oldLength;
  }

  addIfAbsent(item: T): boolean;

  addIfAbsent(item: T, comparator: EqualityComparator<T>): boolean;

  addIfAbsent(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): boolean {
    if (this.contains(item, comparator)) {
      return false;
    }

    return this.add(item);
  }

  clear(): boolean {
    if (this._items.length > 0) {
      this._items.length = 0;

      return true;
    }

    return false;
  }

  clone(): ArrayList<T> {
    return new ArrayList(this._items);
  }

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, comparator: EqualityComparator<T>): boolean;

  equals(other: ReadOnlyList<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): boolean {
    if (this === other) {
      return true;
    }

    if (this.length !== other.length) {
      return false;
    }

    const otherIterator: Iterator<T> = other[Symbol.iterator]();

    for (const ownItem of this) {
      const otherItem: T = otherIterator.next().value;

      if (!comparator.equals(ownItem, otherItem)) {
        return false;
      }
    }

    return true;
  }

  getAt(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    return this._items[index];
  }

  reverse(): ReadOnlyCollection<T> {
    return new ReadOnlyCollectionImpl(this._items.reverse());
  }

  indexOf(item: T): number;

  indexOf(item: T, comparator: EqualityComparator<T>): number;

  indexOf(item: T, startIndex: number): number;

  indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

  indexOf(item: T, startIndex: number, count: number): number;

  indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

  indexOf(
    item: T,
    startIndex?: number | EqualityComparator<T>,
    count?: number | EqualityComparator<T>,
    comparator?: EqualityComparator<T>
  ): number {
    const [_startIndex, _count, _comparator] = this.getIndexOfArgs(startIndex, count, comparator);

    CollectionUtils.validateSliceBounds(this, _startIndex, _count);

    let result: number = -1;

    this.forEach(
      (ownItem: T, ownIndex: number) => {
        if (_comparator.equals(ownItem, item)) {
          result = ownIndex;

          return false;
        }
      },
      _startIndex,
      _count
    );

    return result;
  }

  insert(index: number, item: T): boolean {
    if (index < 0 || index > this.length) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    this._items.splice(index, 0, item);

    return true;
  }

  insertAll(index: number, items: Iterable<T>): boolean {
    if (index < 0 || index > this.length) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    const oldLength: number = this.length;

    this._items.splice(index, 0, ...items);

    return this.length !== oldLength;
  }

  lastIndexOf(item: T): number;

  lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

  lastIndexOf(item: T, startIndex: number): number;

  lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

  lastIndexOf(item: T, startIndex: number, count: number): number;

  lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

  lastIndexOf(
    item: T,
    startIndex?: number | EqualityComparator<T>,
    count?: number | EqualityComparator<T>,
    comparator?: EqualityComparator<T>
  ): number {
    const [_startIndex, _count, _comparator] = this.getLastIndexOfArgs(startIndex, count, comparator);

    if (_startIndex !== 0) {
      CollectionUtils.validateIndexBounds(this, _startIndex);
    }

    if (_count < 0 || _count > this.length) {
      throw new RangeException(`Scan range length is not valid. Value=${_count}`);
    }

    let result: number = -1;

    this.forEachBack(
      (ownItem: T, ownIndex: number) => {
        if (_comparator.equals(item, ownItem)) {
          result = ownIndex;

          return false;
        }
      },
      _startIndex,
      _count
    );

    return result;
  }

  remove(item: T): boolean;

  remove(item: T, comparator: EqualityComparator<T>): boolean;

  remove(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): boolean {
    return this.removeBy((ownItem: T): boolean => {
      return comparator.equals(item, ownItem);
    });
  }

  removeAll(items: Iterable<T>): boolean;

  removeAll(items: Iterable<T>, comparator: EqualityComparator<T>): boolean;

  removeAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): boolean {
    let modified: boolean = false;

    for (const item of items) {
      if (this.remove(item, comparator)) {
        modified = true;
      }
    }

    return modified;
  }

  removeAt(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    return this._items.splice(index, 1)[0];
  }

  removeBy(predicate: (item: T, index: number) => boolean): boolean {
    const oldLength: number = this.length;

    for (let index = 0, actualIndex = 0; index < oldLength; index++, actualIndex++) {
      const item: T = this._items[actualIndex];
      const itemMatchesPredicate: boolean = predicate(item, index);

      if (itemMatchesPredicate) {
        this._items.splice(actualIndex, 1);

        actualIndex--;
      }
    }

    return this.length !== oldLength;
  }

  retainAll(items: Iterable<T>): boolean;

  retainAll(items: Iterable<T>, comparator: EqualityComparator<T>): boolean;

  retainAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): boolean {
    return this.removeBy((ownItem: T): boolean => {
      for (const item of items) {
        if (comparator.equals(ownItem, item)) {
          return false;
        }
      }

      return true;
    });
  }

  setAt(index: number, newValue: T): T {
    if (index < 0 || index > this.length) {
      throw new IndexOutOfBoundsException(index, this.length);
    }

    const oldValue: T = this._items[index];

    this._items[index] = newValue;

    return oldValue;
  }

  private getLastIndexOfArgs(
    startIndex?: number | EqualityComparator<T>,
    count?: number | EqualityComparator<T>,
    comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()
  ): [number, number, EqualityComparator<T>] {
    let _startIndex: number;
    let _count: number;
    let _comparator: EqualityComparator<T> = comparator;

    switch (typeof startIndex) {
      case 'object':
        _comparator = startIndex;
        _startIndex = Math.max(this.length - 1, 0);
        break;
      case 'number':
        _startIndex = startIndex;
        break;
      default:
        _startIndex = Math.max(this.length - 1, 0);
        break;
    }

    switch (typeof count) {
      case 'object':
        _comparator = count;
        _count = _startIndex + (this.length ? 1 : 0);
        break;
      case 'number':
        _count = count;
        break;
      default:
        _count = _startIndex + (this.length ? 1 : 0);
        break;
    }

    return [_startIndex, _count, _comparator];
  }

  private getIndexOfArgs(
    startIndex?: number | EqualityComparator<T>,
    count?: number | EqualityComparator<T>,
    comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()
  ): [number, number, EqualityComparator<T>] {
    let _startIndex: number;
    let _count: number;
    let _comparator: EqualityComparator<T> = comparator;

    switch (typeof startIndex) {
      case 'object':
        _comparator = startIndex;
        _startIndex = 0;
        break;
      case 'number':
        _startIndex = startIndex;
        break;
      default:
        _startIndex = 0;
        break;
    }

    switch (typeof count) {
      case 'object':
        _comparator = count;
        _count = this.length - _startIndex;
        break;
      case 'number':
        _count = count;
        break;
      default:
        _count = this.length - _startIndex;
        break;
    }

    return [_startIndex, _count, _comparator];
  }
}
