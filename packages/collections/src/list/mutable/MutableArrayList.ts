import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pairwise, shareReplay } from 'rxjs/operators';
import { Delegate } from '@monument/core';
import { StrictEquals } from '@monument/comparison';
import { IndexOutOfBoundsException } from '../../exceptions/IndexOutOfBoundsException';
import { ListChangeEvent } from './event/ListChangeEvent';
import { ArrayList } from '../immutable/ArrayList';
import { List } from '../immutable/List';
import { ReadOnlyListProxy } from '../readonly/ReadOnlyListProxy';
import { MutableList } from './MutableList';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class MutableArrayList<T> extends ReadOnlyListProxy<T, List<T>> implements MutableList<T> {
  private readonly source$: BehaviorSubject<List<T>>;

  protected get source(): List<T> {
    return this.source$.value;
  }

  protected set source(list: List<T>) {
    this.source$.next(list);
  }

  //#region Getters and setters

  //#region MutableList

  readonly changed: Observable<ListChangeEvent<T>>;

  //#endregion

  //#endregion

  //#region Constructor

  constructor(items?: Iterable<T>) {
    const list = new ArrayList(items);

    super(list);

    this.source$ = new BehaviorSubject<List<T>>(list);

    this.changed = this.source$.pipe(
      distinctUntilChanged(),
      pairwise(),
      map(([previous, current]) => new ListChangeEvent(this, previous, current)),
      shareReplay(1)
    );
  }

  //#endregion

  //#region Methods

  //#region Cloneable

  clone(): MutableList<T> {
    return new MutableArrayList(this.source);
  }

  //#endregion

  //#region Disposable

  dispose(): void {
    this.source$.unsubscribe();
  }

  //#endregion

  //#region MutableList

  add(item: T): boolean {
    return this._update(list => list.append(item));
  }

  addAll(items: Iterable<T>): boolean {
    return this._update(list => list.appendAll(items));
  }

  addIfAbsent(item: T): boolean;
  addIfAbsent(item: T, equals: Delegate<[T, T], boolean>): boolean;
  addIfAbsent(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.appendIfAbsent(item, equals));
  }

  clear(): boolean {
    return this._update(list => list.clear());
  }

  insert(index: number, item: T): boolean {
    return this._update(list => list.insert(index, item));
  }

  insertAll(index: number, items: Iterable<T>): boolean {
    return this._update(list => list.insertAll(index, items));
  }

  remove(item: T): boolean;
  remove(item: T, equals: Delegate<[T, T], boolean>): boolean;
  remove(item: T, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.remove(item, equals));
  }

  removeAll(items: Iterable<T>): boolean;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  removeAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.removeAll(items, equals));
  }

  removeAt(index: number): T | never {
    const value = this.source.getAt(index);

    this.source = this.source.removeAt(index);

    return value;
  }

  removeBy(predicate: Delegate<[T, number], boolean>): boolean {
    return this._update(list => list.removeBy(predicate));
  }

  retainAll(items: Iterable<T>): boolean;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean>): boolean;
  retainAll(items: Iterable<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    return this._update(list => list.retainAll(items, equals));
  }

  setAt(position: number, newValue: T): T {
    if (position < 0 || position > this.length) {
      throw new IndexOutOfBoundsException(position, this.length);
    }

    const oldValue: T = this.source.getAt(position);

    this.source = this.source.setAt(position, newValue);

    return oldValue;
  }

  //#endregion

  private _update(execute: Delegate<[List<T>], List<T>>): boolean {
    const newList = execute(this.source);

    if (this.source !== newList) {
      this.source = newList;

      return true;
    }

    return false;
  }

  //#endregion

}
