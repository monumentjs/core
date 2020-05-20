import { Delegate } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { Queryable } from '../../queryable/Queryable';
import { Optional } from '@monument/data';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface ReadOnlyList<T> extends Queryable<T>, Equatable<ReadOnlyList<T>> {
  readonly firstIndex: Optional<number>;
  readonly lastIndex: Optional<number>;

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean>): boolean;

  findIndex(predicate: Delegate<[T, number], boolean>): Optional<number>;

  /**
   * @throws {InvalidArgumentException} if index out of bounds
   * @author Alex Chugaev
   * @since 0.16.0
   */
  getAt(position: number): T | never;

  indexOf(item: T): Optional<number>;

  indexOf(item: T, equals: Delegate<[T, T], boolean>): Optional<number>;

  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): Optional<number>;

  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): Optional<number>;

  lastIndexOf(item: T): Optional<number>;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>): Optional<number>;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): Optional<number>;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): Optional<number>;
}
