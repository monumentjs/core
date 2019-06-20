import { Queue } from './Queue';
import { EmptyQueueException } from '../EmptyQueueException';
import { ReadOnlyCollectionBase } from '../../collection/readonly/ReadOnlyCollectionBase';
import { Cloneable } from '../../../base/Cloneable';

/**
 * Represents a first-in, first-out collection of objects.
 *
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArrayQueue<T> extends ReadOnlyCollectionBase<T> implements Queue<T>, Cloneable<ArrayQueue<T>> {
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

  [Symbol.iterator](): Iterator<T> {
    return this._items[Symbol.iterator]();
  }

  clear(): boolean {
    if (this._items.length > 0) {
      this._items.length = 0;

      return true;
    }

    return false;
  }

  dequeue(): T {
    if (this.isEmpty) {
      throw new EmptyQueueException();
    }

    return this._items.shift() as T;
  }

  enqueue(item: T): boolean {
    this._items.push(item);

    return true;
  }

  clone(): ArrayQueue<T> {
    return new ArrayQueue(this._items);
  }

  peek(): T {
    if (this.isEmpty) {
      throw new EmptyQueueException();
    }

    return this._items[0];
  }
}
