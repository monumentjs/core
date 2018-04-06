import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {EmptyQueueException} from 'EmptyQueueException';
import {Queue} from 'Queue';
import {List} from 'List';
import {IteratorFunction} from 'IteratorFunction';
import {LinkedList} from './LinkedList';
import {AbstractCollection} from './AbstractCollection';


/**
 * Represents a first-in, first-out collection of objects.
 */
export class ListQueue<T> extends AbstractCollection<T> implements Queue<T> {
    protected _items: List<T>;


    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Iterable<T>) {
        super();

        this._items = new LinkedList(items);
    }


    public clone(): ListQueue<T> {
        return new ListQueue(this);
    }


    public getIterator(): Iterator<T> {
        return this._items.getIterator();
    }


    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEach(iterator);
    }


    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEachReversed(iterator);
    }


    public add(item: T): boolean {
        return this.enqueue(item);
    }


    public remove(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): boolean {
        return this._items.remove(item, comparator);
    }


    public removeAll(items: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): boolean {
        return this._items.removeAll(items, comparator);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }


    public clear(): boolean {
        return this._items.clear();
    }


    public enqueue(item: T): boolean {
        return this._items.insert(0, item);
    }


    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this._items.getAt(0);
    }


    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this._items.removeAt(this.length - 1);
    }
}
