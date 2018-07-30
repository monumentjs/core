import {Sequence} from './Sequence';
import {RangeException} from '../../exceptions/RangeException';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ZERO} from '../../Constants';
import {Assert} from '../../assert/Assert';


export abstract class AbstractSequence<T> implements Sequence<T> {

    public abstract get length(): number;

    public abstract [Symbol.iterator](): Iterator<T>;

    protected checkEquality<I>(currentItem: I, otherItem: I, comparator?: EqualityComparator<I>): boolean {
        if (comparator != null) {
            return comparator.equals(currentItem, otherItem);
        } else {
            return currentItem === otherItem;
        }
    }

    protected validateSliceBounds<I>(startIndex: number, count: number): void {
        if (startIndex !== ZERO) {
            Assert.argument('startIndex', startIndex).isIndexOf(this);
        }

        Assert.argument('count', count).isLength();
        this.validateSliceRange(startIndex, count);
    }

    protected validateSliceRange(offset: number = 0, length: number = this.length - offset): void {
        if (offset < 0) {
            throw new RangeException(`Slice offset (${offset}) cannot be less than 0.`);
        }

        if (length < 0) {
            throw new RangeException(`Slice length (${length}) cannot be less than 0.`);
        }

        if (length > this.length) {
            throw new RangeException(`Slice length (${length}) cannot be greater than length of the sequence (${this.length}).`);
        }

        if (offset + length > this.length) {
            throw new RangeException(
                `Invalid bounds (${offset}...${offset + length}) of slice range, ` +
                `original range is (0...${this.length}).`
            );
        }
    }
}
