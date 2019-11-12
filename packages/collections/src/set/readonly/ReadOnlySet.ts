import { Equatable } from '@monument/comparison';
import { Queryable } from '../../queryable/Queryable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlySet<T> extends Queryable<T>, Equatable<ReadOnlySet<T>> {
  /**
   * Determines whether the current set is a proper (strict) subset of a specified collection.
   */
  isProperSubsetOf(other: ReadOnlySet<T>): boolean;

  /**
   * Determines whether the current set is a superset of a specified collection.
   */
  isProperSupersetOf(other: ReadOnlySet<T>): boolean;

  /**
   * Determines whether a set is a subset of a specified collection.
   */
  isSubsetOf(other: ReadOnlySet<T>): boolean;

  /**
   * Determines whether the current set is a superset of a specified collection.
   */
  isSupersetOf(other: ReadOnlySet<T>): boolean;

  /**
   * Determines whether the current set overlaps with the specified collection.
   */
  overlaps(other: ReadOnlySet<T>): boolean;
}
