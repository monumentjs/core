import { EqualsFunction } from '../../../comparison/equality/EqualsFunction';
import { ReadOnlyList } from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export interface List<T> extends ReadOnlyList<T> {
  add(item: T): boolean;

  addAll(items: Iterable<T>): boolean;

  addIfAbsent(item: T): boolean;

  addIfAbsent(item: T, comparator: EqualsFunction<T>): boolean;

  clear(): boolean;

  insert(index: number, item: T): boolean;

  insertAll(index: number, items: Iterable<T>): boolean;

  remove(item: T): boolean;

  remove(item: T, comparator: EqualsFunction<T>): boolean;

  removeAll(items: Iterable<T>): boolean;

  removeAll(items: Iterable<T>, comparator: EqualsFunction<T>): boolean;

  removeAt(index: number): T;

  removeBy(predicate: (item: T, index: number) => boolean): boolean;

  retainAll(items: Iterable<T>): boolean;

  retainAll(items: Iterable<T>, comparator: EqualsFunction<T>): boolean;

  setAt(index: number, newValue: T): T;
}
