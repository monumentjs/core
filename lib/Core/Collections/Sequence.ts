import IndexOutOfBoundsException from '../Exceptions/IndexOutOfBoundsException';
import {IEnumerable} from './IEnumerable';


export default class Sequence {
    public static assertBounds(
        sequence: IEnumerable<any>,
        offset: number = 0,
        length: number = sequence.length - offset
    ): void {
        if (offset < 0) {
            throw new RangeError(`Offset cannot be less than 0.`);
        }

        if (length < 0) {
            throw new RangeError(`Slice length cannot be less than 0.`);
        }

        if (length > sequence.length) {
            throw new RangeError(`Slice length cannot be greater than original length.`);
        }

        if (offset + length > sequence.length) {
            throw new RangeError(`Invalid bounds of slice range.`);
        }
    }
    
    
    public static throwIfIndexOutOfBounds(sequence: IEnumerable<any>, index: number): void {
        if (index < 0 || index >= sequence.length) {
            throw new IndexOutOfBoundsException(index, 0, sequence.length);
        }
    }
}