import { Observable } from 'rxjs';
import { ReadOnlySet } from '../readonly/ReadOnlySet';
import { Delegate } from '@monument/core';
import { SetChangeEvent } from './event/SetChangeEvent';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface MutableSet<T> extends ReadOnlySet<T> {
  readonly changed: Observable<SetChangeEvent<T>>;

  add(item: T): boolean;

  addAll(items: Iterable<T>): boolean;

  clear(): boolean;

  /**
   * Modifies the current set so that it contains only elements that are also in a specified collection.
   */
  intersectWith(other: Iterable<T>): boolean;

  remove(item: T): boolean;

  removeAll(items: Iterable<T>): boolean;

  removeBy(predicate: Delegate<[T], boolean>): boolean;

  retainAll(items: Iterable<T>): boolean;

  /**
   * Modifies the current set so that it contains only elements that are present either in the current set or
   * in the specified collection, but not both.
   */
  symmetricExceptWith(other: Iterable<T>): boolean;

  /**
   * Modifies the current set so that it contains all elements that are present in the current set,
   * in the specified collection, or in both.
   */
  unionWith(other: Iterable<T>): boolean;
}
