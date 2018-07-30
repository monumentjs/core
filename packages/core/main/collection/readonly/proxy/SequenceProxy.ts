import {Sequence} from '../Sequence';
import {Equatable} from '../../../utils/comparison/Equatable';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {AbstractSequence} from '../AbstractSequence';


export abstract class SequenceProxy<T, TItems extends Sequence<T>> extends AbstractSequence<T> implements Sequence<T>, Equatable<Sequence<T>> {
    protected _items: TItems;

    public get length(): number {
        return this._items.length;
    }

    protected constructor(items: TItems) {
        super();

        this._items = items;
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public equals(other: Sequence<T>): boolean;
    public equals(other: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public equals(other: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        if (this === other) {
            return true;
        }

        if (this.length !== other.length) {
            return false;
        }

        const thisIterator: Iterator<T> = this[Symbol.iterator]();
        const otherIterator: Iterator<T> = other[Symbol.iterator]();

        let thisResult: IteratorResult<T> = thisIterator.next();
        let otherResult: IteratorResult<T> = otherIterator.next();

        while (!(thisResult.done || otherResult.done)) {
            if (!this.checkEquality(thisResult.value, otherResult.value, comparator)) {
                return false;
            }

            thisResult = thisIterator.next();
            otherResult = otherIterator.next();
        }

        return true;
    }
}
