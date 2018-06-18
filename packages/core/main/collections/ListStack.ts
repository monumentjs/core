import {Equatable} from '../Equatable';
import {EqualityComparator} from '../EqualityComparator';
import {Stack} from './Stack';
import {IteratorFunction} from './IteratorFunction';
import {EmptyStackException} from './EmptyStackException';
import {LinkedList} from './LinkedList';
import {AbstractCollection} from './AbstractCollection';


export class ListStack<T> extends AbstractCollection<T> implements Stack<T>, Equatable<Stack<T>> {
    private _items: LinkedList<T>;


    // Countable interface implementation

    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Iterable<T>) {
        super();

        this._items = new LinkedList();

        if (items != null) {
            this.addAll(items);
        }
    }


    // Cloneable interface implementation

    public clone(): ListStack<T> {
        return new ListStack(this);
    }


    // Enumerable interface implementation

    public get iterator(): Iterator<T> {
        return this._items.iterator;
    }


    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        this._items.forEach(iterator, startIndex, count);
    }


    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        this._items.forEachReversed(iterator, startIndex, count);
    }


    // Collection interface implementation

    public add(item: T): boolean {
        return this._items.add(item);
    }


    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        return this._items.remove(item, comparator);
    }


    public removeAll(
        items: Iterable<T>,
        comparator?: EqualityComparator<T>
    ): boolean {
        return this._items.removeAll(items, comparator);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }


    public clear(): boolean {
        return this._items.clear();
    }


    // Stack interface implementation

    public push(item: T): boolean {
        return this._items.add(item);
    }


    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items.getAt(this.length - 1);
    }


    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items.removeAt(this.length - 1);
    }


    public equals(
        other: Stack<T>,
        comparator?: EqualityComparator<T>
    ): boolean {
        if (this === other) {
            return true;
        }

        if (this.length !== other.length) {
            return false;
        }

        const currentIterator: Iterator<T> = this.iterator;
        const otherIterator: Iterator<T> = other.iterator;

        let a: IteratorResult<T> = currentIterator.next();
        let b: IteratorResult<T> = otherIterator.next();

        while (!a.done && !b.done) {
            if (!this.checkItemsEquality(a.value, b.value, comparator)) {
                return false;
            }

            a = currentIterator.next();
            b = otherIterator.next();
        }

        return true;
    }
}
