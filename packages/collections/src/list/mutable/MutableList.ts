import { Cloneable, Delegate, Disposable } from '@monument/core';
import { Observable } from 'rxjs';
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

  insert(position: number, item: T): boolean;

  insertAll(position: number, items: Iterable<T>): boolean;

  remove(item: T): boolean;

  remove(item: T, equals: Delegate<[T, T], boolean>): boolean;

  removeAll(items: Iterable<T>): boolean;

  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;

  removeAt(position: number): T | never;

  removeBy(predicate: Delegate<[T, number], boolean>): boolean;

  retainAll(items: Iterable<T>): boolean;

  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;

  /**
   * @throws {InvalidArgumentException}
   * @author Alex Chugaev
   * @since 0.16.0
   */
  setAt(position: number, newValue: T): T | never;
}
