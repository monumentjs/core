import { Delegate } from '@monument/core';
import { ReadOnlySet } from '../readonly/ReadOnlySet';

export interface Set<T> extends ReadOnlySet<T> {
  add(item: T): Set<T>;

  addAll(items: Iterable<T>): Set<T>;

  clear(): Set<T>;

  /**
   * Produces new set which contains only elements that are present in current set and in the specified collection.
   */
  intersectWith(other: Iterable<T>): Set<T>;

  remove(item: T): Set<T>;

  removeAll(items: Iterable<T>): Set<T>;

  removeBy(predicate: Delegate<[T, number], boolean>): Set<T>;

  retainAll(items: Iterable<T>): Set<T>;

  /**
   * Produces new set which contains only elements that are present either in the current set or
   * in the specified collection, but not both.
   */
  symmetricExceptWith(other: Iterable<T>): Set<T>;

  /**
   * Produces new set which contains all elements that are present in the current set,
   * in the specified collection, or in both.
   */
  unionWith(other: Iterable<T>): Set<T>;
}
