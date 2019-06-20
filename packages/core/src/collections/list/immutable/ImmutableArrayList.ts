import { Cloneable } from '../../../base/Cloneable';
import { ImmutableList } from './ImmutableList';
import { ReadOnlyCollectionBase } from '../../collection/readonly/ReadOnlyCollectionBase';
import { EqualityComparator } from '../../../comparison/equality/EqualityComparator';
import { IteratorFunction } from '../../function/IteratorFunction';
import { ReferenceEqualityComparator } from '../../../comparison/equality/ReferenceEqualityComparator';
import { ArrayList } from '../mutable/ArrayList';
import { ReadOnlyList } from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class ImmutableArrayList<T> extends ReadOnlyCollectionBase<T> implements ImmutableList<T>, Cloneable<ImmutableArrayList<T>> {
  private readonly _items: ArrayList<T>;

  get firstIndex(): number {
    return this._items.firstIndex;
  }

  get lastIndex(): number {
    return this._items.lastIndex;
  }

  get length(): number {
    return this._items.length;
  }

  constructor(items?: Iterable<T>) {
    super();
    this._items = new ArrayList(items);
  }

  [Symbol.iterator](): Iterator<T> {
    return this._items[Symbol.iterator]();
  }

  add(item: T): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    copy._items.add(item);

    return copy;
  }

  addAll(items: Iterable<T>): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.addAll(items)) {
      return copy;
    }

    return this;
  }

  addIfAbsent(item: T): ImmutableList<T>;
  addIfAbsent(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
  addIfAbsent(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.addIfAbsent(item, comparator)) {
      return copy;
    }

    return this;
  }

  clear(): ImmutableList<T> {
    if (this.isEmpty) {
      return this;
    }

    return new ImmutableArrayList();
  }

  clone(): ImmutableArrayList<T> {
    return new ImmutableArrayList<T>(this._items);
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
    return this._items.getAt(index);
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
    // @ts-ignore
    return this._items.indexOf(item, startIndex, count, comparator);
  }

  insert(index: number, item: T): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    copy._items.insert(index, item);

    return copy;
  }

  insertAll(index: number, items: Iterable<T>): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.insertAll(index, items)) {
      return copy;
    }

    return this;
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
    // @ts-ignore
    return this._items.lastIndexOf(item, startIndex, count, comparator);
  }

  remove(item: T): ImmutableList<T>;
  remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
  remove(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.remove(item, comparator)) {
      return copy;
    }

    return this;
  }

  removeAll(items: Iterable<T>): ImmutableList<T>;
  removeAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
  removeAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.removeAll(items, comparator)) {
      return copy;
    }

    return this;
  }

  removeAt(index: number): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    copy._items.removeAt(index);

    return copy;
  }

  removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.removeBy(predicate)) {
      return copy;
    }

    return this;
  }

  retainAll(items: Iterable<T>): ImmutableList<T>;
  retainAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
  retainAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    if (copy._items.retainAll(items, comparator)) {
      return copy;
    }

    return this;
  }

  setAt(index: number, newValue: T): ImmutableList<T> {
    const copy: ImmutableArrayList<T> = this.clone();

    copy._items.setAt(index, newValue);

    return copy;
  }
}
