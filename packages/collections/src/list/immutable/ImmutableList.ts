import { Func2 } from '@monument/core';
import { ReadOnlyList } from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export interface ImmutableList<T> extends ReadOnlyList<T> {
  add(item: T): ImmutableList<T>;

  addAll(items: Iterable<T>): ImmutableList<T>;

  addIfAbsent(item: T): ImmutableList<T>;

  addIfAbsent(item: T, comparator: Func2<T, T, boolean>): ImmutableList<T>;

  clear(): ImmutableList<T>;

  insert(index: number, item: T): ImmutableList<T>;

  insertAll(index: number, items: Iterable<T>): ImmutableList<T>;

  remove(item: T): ImmutableList<T>;

  remove(item: T, comparator: Func2<T, T, boolean>): ImmutableList<T>;

  removeAll(items: Iterable<T>): ImmutableList<T>;

  removeAll(items: Iterable<T>, comparator: Func2<T, T, boolean>): ImmutableList<T>;

  removeAt(index: number): ImmutableList<T>;

  removeBy(predicate: Func2<T, number, boolean>): ImmutableList<T>;

  retainAll(items: Iterable<T>): ImmutableList<T>;

  retainAll(items: Iterable<T>, comparator: Func2<T, T, boolean>): ImmutableList<T>;

  setAt(index: number, newValue: T): ImmutableList<T>;
}
