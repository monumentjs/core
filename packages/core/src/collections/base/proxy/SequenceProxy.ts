import {Sequence} from '../Sequence';
import {Equatable} from '../../../comparison/equality/Equatable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class SequenceProxy<T, TItems extends Sequence<T>> implements Sequence<T>, Equatable<Sequence<T>> {
    protected _items: TItems;

    public get length(): number {
        return this._items.length;
    }

    protected constructor(items: TItems) {
        this._items = items;
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public equals(other: Sequence<T>): boolean;
    public equals(other: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public equals(other: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        // tslint:disable:cyclomatic-complexity
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
            if (!comparator.equals(thisResult.value, otherResult.value)) {
                return false;
            }

            thisResult = thisIterator.next();
            otherResult = otherIterator.next();
        }

        return true;
    }
}
