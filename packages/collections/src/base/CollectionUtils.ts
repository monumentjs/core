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
}
