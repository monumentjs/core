import { Delegate } from '@monument/core';
import { indexOf } from '../../operators/indexOf';
import { findIndexes } from '../../operators/findIndexes';
import { findIndex } from '../../operators/findIndex';
import { lastIndexOf } from '../../operators/lastIndexOf';
import { getAt } from '../../operators/getAt';
import { equals } from '../../operators/equals';
import { QueryableBase } from '../../queryable/QueryableBase';
import { ReadOnlyList } from './ReadOnlyList';

/**
 * Represents default implementation of `ReadOnlyList` based mostly on queryable operators.
 * @since 0.16.0
 * @author Alex Chugaev
 */
export class ReadOnlyListBase<T> extends QueryableBase<T> implements ReadOnlyList<T> {

  get firstIndex(): number | undefined {
    return this.isEmpty ? undefined : 0;
  }

  get lastIndex(): number | undefined {
    const _count = this.length;

    if (_count > 0) {
      return _count - 1;
    }
  }

  equals(other: ReadOnlyList<T>): boolean;
  equals(other: ReadOnlyList<T>, _equals: Delegate<[T, T], boolean>): boolean;
  equals(other: ReadOnlyList<T>, _equals?: Delegate<[T, T], boolean>): boolean {
    return equals(this, other, _equals as Delegate<[T, T], boolean>);
  }

  findIndex(predicate: Delegate<[T, number], boolean>): number | undefined {
    return findIndex(this, predicate);
  }

  findIndexes(predicate: Delegate<[T, number], boolean>): ReadOnlyList<number> {
    return new ReadOnlyListBase(findIndexes(this, predicate));
  }

  getAt(index: number): T | never {
    return getAt(this, index);
  }

  indexOf(item: T): number | undefined;
  indexOf(item: T, _equals: Delegate<[T, T], boolean>): number | undefined;
  indexOf(item: T, _equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
  indexOf(item: T, _equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
  indexOf(item: T, _equals?: Delegate<[T, T], boolean>, offset?: number, limit?: number): number | undefined {
    return indexOf(this, item, _equals as Delegate<[T, T], boolean>, offset as number, limit as number);
  }

  lastIndexOf(item: T): number | undefined;
  lastIndexOf(item: T, _equals: Delegate<[T, T], boolean>): number | undefined;
  lastIndexOf(item: T, _equals: Delegate<[T, T], boolean>, offset: number): number | undefined;
  lastIndexOf(item: T, _equals: Delegate<[T, T], boolean>, offset: number, limit: number): number | undefined;
  lastIndexOf(item: T, _equals?: Delegate<[T, T], boolean>, offset?: number, limit?: number): number | undefined {
    return lastIndexOf(this, item, _equals as Delegate<[T, T], boolean>, offset as number, limit as number);
  }
}
