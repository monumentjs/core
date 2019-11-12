import { Delegate } from '@monument/core';
import { ReadOnlyList } from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface List<T> extends ReadOnlyList<T> {
  append(item: T): List<T>;

  appendAll(items: Iterable<T>): List<T>;

  appendIfAbsent(item: T): List<T>;

  appendIfAbsent(item: T, equals: Delegate<[T, T], boolean>): List<T>;

  clear(): List<T>;

  insert(position: number, item: T): List<T>;

  insertAll(position: number, items: Iterable<T>): List<T>;

  prepend(item: T): List<T>;

  prependAll(items: Iterable<T>): List<T>;

  remove(item: T): List<T>;

  remove(item: T, equals: Delegate<[T, T], boolean>): List<T>;

  removeAll(items: Iterable<T>): List<T>;

  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): List<T>;

  removeAt(position: number): List<T>;

  removeBy(predicate: Delegate<[T, number], boolean>): List<T>;

  retainAll(items: Iterable<T>): List<T>;

  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): List<T>;

  setAt(position: number, newValue: T): List<T>;
}
