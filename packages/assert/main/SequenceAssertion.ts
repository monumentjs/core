import {RangeException} from '@monument/core/main/RangeException';
import {IndexOutOfBoundsException} from '@monument/core/main/exceptions/IndexOutOfBoundsException';


export class SequenceAssertion {
    private _sequence: ArrayLike<any>;


    public constructor(sequence: ArrayLike<any>) {
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
