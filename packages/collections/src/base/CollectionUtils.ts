import { RangeException } from '@monument/exceptions';
import { IndexOutOfBoundsException } from '../exceptions/IndexOutOfBoundsException';
import { Sequence } from './Sequence';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CollectionUtils {
  static validateBounds(from: number, to: number): void {
    if (from > to) {
      throw new RangeException(`Invalid range bounds: from=${from}, to=${to}`);
    }
  }

  static validateLength(length: number) {
    if (!isFinite(length) || isNaN(length) || length < 0) {
      throw new RangeException(`Value of length is not valid: value=${length}`);
    }
  }

  static validateIndex(index: number) {
    if (!isFinite(index) || isNaN(index) || index < 0) {
      throw new IndexOutOfBoundsException(`Index is not valid: value=${index}`);
    }
  }

  static validateIndexBounds(sequence: Sequence<any>, index: number): void {
    const length: number = sequence.length;

    if (index < 0 || index >= length) {
      throw new IndexOutOfBoundsException(index, length);
    }
  }

  static validateSliceBounds(sequence: Sequence<any>, sliceOffset: number, sliceLength: number): void {
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
  static validateSliceRange(sequence: Sequence<any>, sliceOffset: number = 0, sliceLength: number = sequence.length - sliceOffset): void {
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
        `Invalid bounds (${sliceOffset}...${sliceOffset + sliceLength}) of slice range, ` + `original range is (0...${sequence.length}).`
      );
    }
  }
}
