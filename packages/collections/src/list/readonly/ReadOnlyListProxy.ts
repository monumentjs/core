import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { QueryableProxy } from '../../queryable/QueryableProxy';
import { ReadOnlyList } from './ReadOnlyList';

export class ReadOnlyListProxy<T, S extends ReadOnlyList<T>> extends QueryableProxy<T, S> implements ReadOnlyList<T> {

  //#region Getters and setters

  //#region ReadOnlyList

  get firstIndex(): number | undefined {
    return this.source.firstIndex;
  }

  get lastIndex(): number | undefined {
    return this.source.lastIndex;
  }

  //#endregion

  //#endregion


  //#region Methods

  //#region Equatable

  equals(other: ReadOnlyList<T>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean>): boolean;
  equals(other: ReadOnlyList<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this.source.equals(other, equals);
  }

  //#endregion

  //#region ReadOnlyList

  findIndex(predicate: Delegate<[T, number], boolean>): number | undefined {
    return this.source.findIndex(predicate);
  }

  findIndexes(predicate: Delegate<[T, number], boolean>): ReadOnlyList<number> {
    return this.source.findIndexes(predicate);
  }

  /**
   * @throws {InvalidArgumentException} if index out of bounds
   * @author Alex Chugaev
   * @since 0.16.0
   */
  getAt(index: number): T | never {
    return this.source.getAt(index);
  }

  indexOf(item: T): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, startIndex: number): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean>, startIndex: number, count: number): number | undefined;
  indexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, startIndex?: number, count?: number): number | undefined {
    return this.source.indexOf(item, equals, startIndex as number, count as number);
  }

  lastIndexOf(item: T): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, startIndex: number): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean>, startIndex: number, count: number): number | undefined;
  lastIndexOf(item: T, equals: Delegate<[T, T], boolean> = StrictEquals, startIndex?: number, count?: number): number | undefined {
    return this.source.lastIndexOf(item, equals, startIndex as number, count as number);
  }

  //#endregion

  //#endregion
}
