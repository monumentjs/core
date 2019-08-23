import { Set } from './Set';
import { ArrayList } from '../../list/mutable/ArrayList';
import { Sequence } from '../../base/Sequence';
import { Cloneable } from '../../../base/Cloneable';
import { EqualsFunction } from '../../../comparison/equality/EqualsFunction';
import { StrictEquals } from '../../../comparison/equality/StrictEquals';
import { MethodNotImplementedException } from '../../../exceptions/MethodNotImplementedException';
import { ReadOnlyCollectionBase } from '../../collection/readonly/ReadOnlyCollectionBase';
import { ReadOnlySet } from '../readonly/ReadOnlySet';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArraySet<T> extends ReadOnlyCollectionBase<T> implements Set<T>, Cloneable<ArraySet<T>> {
  private readonly _comparator: EqualsFunction<T>;
  private readonly _items: ArrayList<T> = new ArrayList();

  get length(): number {
    return this._items.length;
  }

  get comparator(): EqualsFunction<T> {
    return this._comparator;
  }

  constructor(items?: Iterable<T>, comparator: EqualsFunction<T> = StrictEquals) {
    super();
    this._comparator = comparator;

    if (items != null) {
      this.addAll(items);
    }
  }

  add(item: T): boolean {
    return this._items.addIfAbsent(item, this.comparator);
  }

  addAll(items: Iterable<T>): boolean {
    const oldLength: number = this.length;

    for (const item of items) {
      this._items.addIfAbsent(item, this.comparator);
    }

    return this.length > oldLength;
  }

  clear(): boolean {
    return this._items.clear();
  }

  clone(): ArraySet<T> {
    return new ArraySet(this, this.comparator);
  }

  equals(other: ReadOnlySet<T>): boolean {
    return this.comparator === other.comparator && this.length === other.length && this.containsAll(other);
  }

  /**
   * Modifies the current set so that it contains only elements that are also in a specified collection.
   */
  intersectWith(other: Iterable<T>): boolean {
    return this.removeBy((ownItem: T): boolean => {
      for (const otherItem of other) {
        if (this.comparator(ownItem, otherItem)) {
          return false;
        }
      }

      return true;
    });
  }

  isProperSubsetOf(other: Sequence<T>): boolean {
    if (this.length >= other.length) {
      return false;
    }

    return this.isSubsetOf(other);
  }

  isProperSupersetOf(other: Sequence<T>): boolean {
    if (this.length <= other.length) {
      return false;
    }

    return this.isSupersetOf(other);
  }

  isSubsetOf(other: Sequence<T>): boolean {
    let isValidSubset: boolean = true;

    for (const ownItem of this) {
      let isCurrentItemInOtherSet: boolean = false;

      for (const otherItem of other) {
        if (this.comparator(ownItem, otherItem)) {
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

  isSupersetOf(other: Sequence<T>): boolean {
    let isValidSuperset: boolean = true;

    for (const ownItem of other) {
      let isOtherItemInCurrentSet: boolean = false;

      for (const currentItem of this) {
        if (this.comparator(currentItem, ownItem)) {
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
    for (const ownItem of this) {
      for (const otherItem of other) {
        if (this.comparator(ownItem, otherItem)) {
          return true;
        }
      }
    }

    return false;
  }

  remove(otherItem: T): boolean {
    return this._items.remove(otherItem, this.comparator);
  }

  removeAll(items: Iterable<T>): boolean {
    return this._items.removeAll(items, this.comparator);
  }

  removeBy(predicate: (item: T) => boolean): boolean {
    return this._items.removeBy(predicate);
  }

  retainAll(items: Iterable<T>): boolean {
    return this._items.retainAll(items, this.comparator);
  }

  setEquals(other: ReadOnlySet<T>): boolean {
    if (this.length !== other.length) {
      return false;
    }

    for (const otherItem of other) {
      if (!this.contains(otherItem)) {
        return false;
      }
    }

    for (const currentItem of this) {
      let currentItemInOtherCollection: boolean = false;

      for (const otherItem of other) {
        if (this.comparator(currentItem, otherItem)) {
          currentItemInOtherCollection = true;

          break;
        }
      }

      if (!currentItemInOtherCollection) {
        return false;
      }
    }

    return true;
  }

  symmetricExceptWith(other: Sequence<T>): boolean {
    let hasChanged: boolean = false;

    for (const otherItem of other) {
      if (this.contains(otherItem)) {
        if (this.remove(otherItem)) {
          hasChanged = true;
        }
      } else {
        if (this.add(otherItem)) {
          hasChanged = true;
        }
      }
    }

    return hasChanged;
  }

  unionWith(other: Sequence<T>): boolean {
    // TODO: implement
    throw new MethodNotImplementedException();
  }

  [Symbol.iterator](): Iterator<T> {
    return this._items[Symbol.iterator]();
  }
}
