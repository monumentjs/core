import {IndexOutOfBoundsException} from '../Exceptions/IndexOutOfBoundsException';
import {IEnumerable} from '../Collections/Abstraction/IEnumerable';
import {RangeException} from '../Exceptions/RangeException';


export class SequenceAssertion {
    private _sequence: IEnumerable<any>;


    public constructor(sequence: IEnumerable<any>) {
        this._sequence = sequence;
    }


    public containsSlice(offset: number = 0, length: number = this._sequence.length - offset): void {
        if (offset < 0) {
            throw new RangeException(`Slice offset (${offset}) cannot be less than 0.`);
        }

        if (length < 0) {
            throw new RangeException(`Slice length (${length}) cannot be less than 0.`);
        }

        if (length > this._sequence.length) {
            throw new RangeException(`Slice length (${length}) cannot be greater than length of the sequence (${this._sequence.length}).`);
        }

        if (offset + length > this._sequence.length) {
            throw new RangeException(
                `Invalid bounds (${offset}...${offset + length}) of slice range, ` +
                `original range is (0...${this._sequence.length}).`
            );
        }
    }


    public containsIndex(index: number): void {
        if (index < 0 || index >= this._sequence.length) {
            throw new IndexOutOfBoundsException(`Index out of bounds.`);
        }
    }
}
