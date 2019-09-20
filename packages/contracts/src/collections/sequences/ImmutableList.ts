import { ReadOnlyList } from './ReadOnlyList';
import { EqualsFunction } from '../../functions/EqualityComparator';
import { IteratorFunction } from '@monument/collections';

/**
 * @todo need to change implementations to abstractions
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 * @readonly
 */
export interface ImmutableList<T> extends ReadOnlyList<T> {
  add(item: T): ImmutableList<T>;

  addAll(items: Iterable<T>): ImmutableList<T>;

  addIfAbsent(item: T): ImmutableList<T>;

  addIfAbsent(item: T, comparator: EqualsFunction<T>): ImmutableList<T>;

  clear(): ImmutableList<T>;

  insert(index: number, item: T): ImmutableList<T>;

  insertAll(index: number, items: Iterable<T>): ImmutableList<T>;

  remove(item: T): ImmutableList<T>;

  remove(item: T, comparator: EqualsFunction<T>): ImmutableList<T>;

  removeAll(items: Iterable<T>): ImmutableList<T>;

  removeAll(items: Iterable<T>, comparator: EqualsFunction<T>): ImmutableList<T>;

  removeAt(index: number): ImmutableList<T>;

  removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;

  retainAll(items: Iterable<T>): ImmutableList<T>;

  retainAll(items: Iterable<T>, comparator: EqualsFunction<T>): ImmutableList<T>;

  setAt(index: number, newValue: T): ImmutableList<T>;
}
