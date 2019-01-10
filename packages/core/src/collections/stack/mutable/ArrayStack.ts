import {Cloneable} from '../../../base/Cloneable';
import {Stack} from './Stack';
import {EmptyStackException} from '../EmptyStackException';
import {ReadOnlyCollectionBase} from '../../collection/readonly/ReadOnlyCollectionBase';
import {ReadOnlyStack} from '../readonly/ReadOnlyStack';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArrayStack<T> extends ReadOnlyCollectionBase<T> implements Stack<T>, Cloneable<ArrayStack<T>> {
    private readonly _items: T[];

    public get length(): number {
        return this._items.length;
    }

    public constructor();

    public constructor(items: Iterable<T>);

    public constructor(items?: Iterable<T>) {
        super();

        this._items = items ? [...items] : [];
    }

    public clear(): boolean {
        if (this._items.length > 0) {
            this._items.length = 0;

            return true;
        }

        return false;
    }

    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items.pop() as T;
    }

    public push(item: T): boolean {
        this._items.push(item);

        return true;
    }

    public clone(): ArrayStack<T> {
        return new ArrayStack(this);
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items[this._items.length - 1];
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public equals(other: ReadOnlyStack<T>): boolean {
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
