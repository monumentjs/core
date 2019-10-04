import { Func2 } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyList<T> extends ReadOnlyCollection<T>, Equatable<ReadOnlyList<T>> {
  readonly firstIndex: number;
  readonly lastIndex: number;

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, comparator: Func2<T, T, boolean>): boolean;

  /**
   * @throws {IndexOutOfBoundsException} if index out of bounds
   */
  getAt(index: number): T;

  indexOf(item: T): number;

  indexOf(item: T, comparator: Func2<T, T, boolean>): number;

  indexOf(item: T, startIndex: number): number;

  indexOf(item: T, startIndex: number, comparator: Func2<T, T, boolean>): number;

  indexOf(item: T, startIndex: number, count: number): number;

  indexOf(item: T, startIndex: number, count: number, comparator: Func2<T, T, boolean>): number;

  lastIndexOf(item: T): number;

  lastIndexOf(item: T, comparator: Func2<T, T, boolean>): number;

  lastIndexOf(item: T, startIndex: number): number;

  lastIndexOf(item: T, startIndex: number, comparator: Func2<T, T, boolean>): number;

  lastIndexOf(item: T, startIndex: number, count: number): number;

  lastIndexOf(item: T, startIndex: number, count: number, comparator: Func2<T, T, boolean>): number;
}
