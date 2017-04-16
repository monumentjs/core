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
            throw new RangeException(`Offset (${offset}) cannot be less than 0.`);
        }

        if (length < 0) {
            throw new RangeException(`Slice length (${length}) cannot be less than 0.`);
        }

        if (length > sequence.length) {
            throw new RangeException(
                `Slice length (${length}) cannot be greater than length of the sequence (${sequence.length}).`
            );
        }

        if (offset + length > sequence.length) {
            throw new RangeException(
                `Invalid bounds (${offset}...${offset + length}) of slice range, ` +
                `original range is (0...${sequence.length}).`
            );
        }
    }
    
    
    public static assertIndexBounds(sequence: IEnumerable<any>, index: number): void {
        if (index < 0 || index >= sequence.length) {
            throw new IndexOutOfBoundsException(`Index out of bounds.`);
        }
    }
}