import { Observable } from 'rxjs';
import { Cloneable, Delegate, Disposable } from '@monument/core';
import { ReadOnlyList } from '../readonly/ReadOnlyList';
import { ListChangeEvent } from './event/ListChangeEvent';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface MutableList<T> extends ReadOnlyList<T>, Cloneable<MutableList<T>>, Disposable {
  readonly changed: Observable<ListChangeEvent<T>>;

  add(item: T): boolean;

  addAll(items: Iterable<T>): boolean;

  addIfAbsent(item: T): boolean;

  addIfAbsent(item: T, equals: Delegate<[T, T], boolean>): boolean;

  clear(): boolean;

  insert(index: number, item: T): boolean;

  insertAll(index: number, items: Iterable<T>): boolean;

  remove(item: T): boolean;

  remove(item: T, equals: Delegate<[T, T], boolean>): boolean;

  removeAll(items: Iterable<T>): boolean;

  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;

  removeAt(index: number): T | never;

  removeBy(predicate: Delegate<[T, number], boolean>): boolean;

  retainAll(items: Iterable<T>): boolean;

  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;

  /**
   * @throws {IndexOutOfBoundsException}
   * @author Alex Chugaev
   * @since 0.16.0
   */
  setAt(index: number, newValue: T): T | never;
}
