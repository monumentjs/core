import {Equatable} from '../Equatable';
import {EqualityComparator} from '../EqualityComparator';
import {Stack} from './Stack';
import {EmptyStackException} from './EmptyStackException';
import {LinkedList} from './LinkedList';
import {Sequence} from './Sequence';
import {Cloneable} from '../Cloneable';
import {ListWrapper} from './ListWrapper';


export class ListStack<T> extends ListWrapper<T> implements Cloneable<ListStack<T>>, Stack<T>, Equatable<Stack<T>> {

    public constructor(items?: Sequence<T>) {
        super(new LinkedList(items));
    }

    public clone(): ListStack<T> {
        return new ListStack(this);
    }

    public equals(other: Stack<T>): boolean;
    public equals(other: Stack<T>, comparator: EqualityComparator<T>): boolean;
    public equals(other: Stack<T>, comparator?: EqualityComparator<T>): boolean {
        if (this === other) {
            return true;
        }

        if (this.length !== other.length) {
            return false;
        }

        const currentIterator: Iterator<T> = this[Symbol.iterator]();
        const otherIterator: Iterator<T> = other[Symbol.iterator]();

        let a: IteratorResult<T> = currentIterator.next();
        let b: IteratorResult<T> = otherIterator.next();

        while (!a.done && !b.done) {
            if (!this.checkEquality(a.value, b.value, comparator)) {
                return false;
            }

            a = currentIterator.next();
            b = otherIterator.next();
        }

        return true;
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this.getAt(this.lastIndex);
    }

    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this.removeAt(this.lastIndex);
    }

    public push(item: T): boolean {
        return this.add(item);
    }
}
