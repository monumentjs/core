import IndexOutOfBoundsException from '../Exceptions/IndexOutOfBoundsException';
import {IEnumerable} from './IEnumerable';
import RangeException from '../Exceptions/RangeException';


export default class Sequence {
    public static assertSliceBounds(
        sequence: IEnumerable<any>,
        offset: number = 0,
        length: number = sequence.length - offset
    ): void {
        if (offset < 0) {
            throw new RangeException(`Offset cannot be less than 0.`);
        }

        if (length < 0) {
            throw new RangeException(`Slice length cannot be less than 0.`);
        }

        if (length > sequence.length) {
            throw new RangeException(`Slice length cannot be greater than original length.`);
        }

        if (offset + length > sequence.length) {
            throw new RangeException(`Invalid bounds of slice range.`);
        }
    }
    
    
    public static assertIndexBounds(sequence: IEnumerable<any>, index: number): void {
        if (index < 0 || index >= sequence.length) {
            throw new IndexOutOfBoundsException(`Index out of bounds.`);
        }
    }
}