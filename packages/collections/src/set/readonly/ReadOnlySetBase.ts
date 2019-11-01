import { Delegate } from '@monument/core';
import { QueryableBase } from '../../queryable/QueryableBase';
import { ReadOnlySet } from './ReadOnlySet';

export class ReadOnlySetBase<T> extends QueryableBase<T> implements ReadOnlySet<T> {
  constructor(source: Iterable<T>, protected readonly _equals: Delegate<[T, T], boolean>) {
    super(source);
  }

  equals(other: ReadOnlySet<T>): boolean {
    return this.length === other.length && this.containsAll(other, this._equals) && other.containsAll(this, this._equals);
  }

  isProperSubsetOf(other: ReadOnlySet<T>): boolean {
    if (this.isEmpty) {
      return true;
    }

    return other.containsAll(this, this._equals) && !this.containsAll(other, this._equals);
  }

  isProperSupersetOf(other: ReadOnlySet<T>): boolean {
    return false;
  }

  isSubsetOf(other: ReadOnlySet<T>): boolean {
    if (this.isEmpty) {
      return true;
    }

    return other.containsAll(this, this._equals);
  }

  isSupersetOf(other: ReadOnlySet<T>): boolean {
    if (other.isEmpty) {
      return true;
    }

    if (this.length < other.length) {
      return false;
    }

    return this.containsAll(other, this._equals);
  }

  overlaps(other: ReadOnlySet<T>): boolean {
    return false;
  }

  setEquals(other: ReadOnlySet<T>): boolean {
    return false;
  }

}
