import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';
import { EqualityComparator } from '../../../comparison/equality/EqualityComparator';
import { Equatable } from '../../../comparison/equality/Equatable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyList<T> extends ReadOnlyCollection<T>, Equatable<ReadOnlyList<T>> {
  readonly firstIndex: number;
  readonly lastIndex: number;

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, comparator: EqualityComparator<T>): boolean;

  /**
   * @throws {IndexOutOfBoundsException} if index out of bounds
   */
  getAt(index: number): T;

  indexOf(item: T): number;

  indexOf(item: T, comparator: EqualityComparator<T>): number;

  indexOf(item: T, startIndex: number): number;

  indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

  indexOf(item: T, startIndex: number, count: number): number;

  indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

  lastIndexOf(item: T): number;

  lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

  lastIndexOf(item: T, startIndex: number): number;

  lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

  lastIndexOf(item: T, startIndex: number, count: number): number;

  lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
}
