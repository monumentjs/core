import { Cloneable } from '@monument/core';
import { Stack } from './Stack';
import { EmptyStackException } from '@monument/exceptions';
import { ReadOnlyCollectionBase } from '../../collection/readonly/ReadOnlyCollectionBase';
import { ReadOnlyStack } from '../readonly/ReadOnlyStack';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArrayStack<T> extends ReadOnlyCollectionBase<T> implements Stack<T>, Cloneable<ArrayStack<T>> {
  private readonly _items: T[];

  get length(): number {
    return this._items.length;
  }

  constructor();

  constructor(items: Iterable<T>);

  constructor(items?: Iterable<T>) {
    super();

    this._items = items ? [...items] : [];
  }

  clear(): boolean {
    if (this._items.length > 0) {
      this._items.length = 0;

      return true;
    }

    return false;
  }

  pop(): T {
    if (this.isEmpty) {
      throw new EmptyStackException();
    }

    return this._items.pop() as T;
  }

  push(item: T): boolean {
    this._items.push(item);

    return true;
  }

  clone(): ArrayStack<T> {
    return new ArrayStack(this);
  }

  peek(): T {
    if (this.isEmpty) {
      throw new EmptyStackException();
    }

    return this._items[this._items.length - 1];
  }

  [Symbol.iterator](): Iterator<T> {
    return this._items[Symbol.iterator]();
  }

  equals(other: ReadOnlyStack<T>): boolean {
    const ownLength = this.length;
    const otherLength = other.length;

    if (ownLength === 0 && otherLength === 0) {
      return true;
    }

    if (ownLength === otherLength) {
      return this.containsAll(other);
    }

    return false;
  }
}
