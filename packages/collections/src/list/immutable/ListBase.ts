import { Delegate } from '@monument/core';
import { ReadOnlyListBase } from '../readonly/ReadOnlyListBase';
import { prepend } from '../../operators/prepend';
import { prependAll } from '../../operators/prependAll';
import { removeAll } from '../../operators/removeAll';
import { retainAll } from '../../operators/retainAll';
import { append } from '../../operators/append';
import { appendAll } from '../../operators/appendAll';
import { appendIfAbsent } from '../../operators/appendIfAbsent';
import { insert } from '../../operators/insert';
import { insertAll } from '../../operators/insertAll';
import { remove } from '../../operators/remove';
import { removeAt } from '../../operators/removeAt';
import { removeBy } from '../../operators/removeBy';
import { setAt } from '../../operators/setAt';
import { empty } from '../../operators/empty';
import { List } from './List';

export class ListBase<T> extends ReadOnlyListBase<T> implements List<T> {

  append(item: T): List<T> {
    return new ListBase(append(this, item));
  }

  appendAll(items: Iterable<T>): List<T> {
    return new ListBase(appendAll(this, items));
  }

  appendIfAbsent(item: T): List<T>;
  appendIfAbsent(item: T, _equals: Delegate<[T, T], boolean>): List<T>;
  appendIfAbsent(item: T, _equals?: Delegate<[T, T], boolean>): List<T> {
    return new ListBase(appendIfAbsent(this, item, _equals as Delegate<[T, T], boolean>));
  }

  clear(): List<T> {
    return this.length === 0 ? this : new ListBase(empty());
  }

  insert(position: number, item: T): List<T> {
    return new ListBase(insert(this, position, item));
  }

  insertAll(position: number, items: Iterable<T>): List<T> {
    return new ListBase(insertAll(this, position, items));
  }

  prepend(item: T): List<T> {
    return new ListBase(prepend(this, item));
  }

  prependAll(items: Iterable<T>): List<T> {
    return new ListBase(prependAll(this, items));
  }

  remove(item: T): List<T>;
  remove(item: T, _equals: Delegate<[T, T], boolean>): List<T>;
  remove(item: T, _equals?: Delegate<[T, T], boolean>): List<T> {
    return new ListBase(remove(this, item, _equals as Delegate<[T, T], boolean>));
  }

  removeAll(items: Iterable<T>): List<T>;
  removeAll(items: Iterable<T>, _equals: Delegate<[T, T], boolean>): List<T>;
  removeAll(items: Iterable<T>, _equals?: Delegate<[T, T], boolean>): List<T> {
    return new ListBase(removeAll(this, items, _equals as Delegate<[T, T], boolean>));
  }

  removeAt(position: number): List<T> {
    return new ListBase(removeAt(this, position));
  }

  removeBy(predicate: Delegate<[T, number], boolean>): List<T> {
    return new ListBase(removeBy(this, predicate));
  }

  retainAll(others: Iterable<T>): List<T>;
  retainAll(others: Iterable<T>, _equals: Delegate<[T, T], boolean>): List<T>;
  retainAll(others: Iterable<T>, _equals?: Delegate<[T, T], boolean>): List<T> {
    return new ListBase(retainAll(this, others, _equals as Delegate<[T, T], boolean>));
  }

  setAt(position: number, update: T): List<T> {
    return new ListBase(setAt(this, position, update));
  }
}
