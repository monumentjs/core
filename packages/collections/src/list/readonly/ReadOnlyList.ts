import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';
import { EqualsFunction, Equatable } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyList<T> extends ReadOnlyCollection<T>, Equatable<ReadOnlyList<T>> {
  readonly firstIndex: number;
  readonly lastIndex: number;

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, comparator: EqualsFunction<T>): boolean;

  /**
   * @throws {IndexOutOfBoundsException} if index out of bounds
   */
  getAt(index: number): T;

  indexOf(item: T): number;

  indexOf(item: T, comparator: EqualsFunction<T>): number;

  indexOf(item: T, startIndex: number): number;

  indexOf(item: T, startIndex: number, comparator: EqualsFunction<T>): number;

  indexOf(item: T, startIndex: number, count: number): number;

  indexOf(item: T, startIndex: number, count: number, comparator: EqualsFunction<T>): number;

  lastIndexOf(item: T): number;

  lastIndexOf(item: T, comparator: EqualsFunction<T>): number;

  lastIndexOf(item: T, startIndex: number): number;

  lastIndexOf(item: T, startIndex: number, comparator: EqualsFunction<T>): number;

  lastIndexOf(item: T, startIndex: number, count: number): number;

  lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualsFunction<T>): number;
}
