import {Sequence} from './Sequence';
import {RangeException} from '../../exceptions/RangeException';
import {IndexOutOfBoundsException} from '../../exceptions/IndexOutOfBoundsException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CollectionUtils {
    public static validateBounds(from: number, to: number): void {
        if (from > to) {
            throw new RangeException(`Invalid range bounds: from=${from}, to=${to}`);
        }
    }

    public static validateLength(length: number) {
        if (!isFinite(length) || isNaN(length) || length < 0) {
            throw new RangeException(`Value of length is not valid: value=${length}`);
        }
    }

    public static validateIndex(index: number) {
        if (!isFinite(index) || isNaN(index) || index < 0) {
            throw new IndexOutOfBoundsException(`Index is not valid: value=${index}`);
        }
    }

    public static validateIndexBounds(sequence: Sequence<any>, index: number): void {
        if (index < 0 || index >= sequence.length) {
            throw new IndexOutOfBoundsException(index, sequence.length);
        }
    }

    public static validateSliceBounds(sequence: Sequence<any>, sliceOffset: number, sliceLength: number): void {
        if (sliceOffset !== 0) {
            this.validateIndexBounds(sequence, sliceOffset);
        }

        this.validateLength(sliceLength);

        this.validateSliceRange(sequence, sliceOffset, sliceLength);
    }

    /**
     *
     * @throws {RangeException} length
     */
    public static validateSliceRange(
        sequence: Sequence<any>,
        sliceOffset: number = 0,
        sliceLength: number = sequence.length - sliceOffset
    ): void {
        if (sliceOffset < 0) {
            throw new RangeException(`Slice offset (${sliceOffset}) cannot be less than 0.`);
        }

        if (sliceLength < 0) {
            throw new RangeException(`Slice length (${sliceLength}) cannot be less than 0.`);
        }

        if (sliceLength > sequence.length) {
            throw new RangeException(`Slice length (${sliceLength}) cannot be greater than length of the sequence (${sequence.length}).`);
        }

        if (sliceOffset + sliceLength > sequence.length) {
            throw new RangeException(
                `Invalid bounds (${sliceOffset}...${sliceOffset + sliceLength}) of slice range, ` +
                `original range is (0...${sequence.length}).`
            );
        }
    }
}
