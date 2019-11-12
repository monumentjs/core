import { Delegate } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { Queryable } from '../../queryable/Queryable';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface ReadOnlyList<T> extends Queryable<T>, Equatable<ReadOnlyList<T>> {
  readonly firstIndex: number | undefined;
  readonly lastIndex: number | undefined;

  equals(other: ReadOnlyList<T>): boolean;

  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean>): boolean;

  findIndex(predicate: Delegate<[T, number], boolean>): number | undefined;

  /**
   * @throws {InvalidArgumentException} if index out of bounds
   * @author Alex Chugaev
   * @since 0.16.0
   */
  getAt(position: number): T | never;

  indexOf(item: T): number | undefined;

  indexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;

  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;

  indexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;

  lastIndexOf(item: T): number | undefined;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number): number | undefined;

  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
}
