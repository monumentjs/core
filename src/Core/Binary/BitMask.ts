import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';
import {IndexOutOfBoundsException} from '../Exceptions/IndexOutOfBoundsException';
import {assertArgumentNotNull} from '../Assertion/Assert';
import {VALUABLE_NUMBER_BITS} from './constants';


export class BitMask {
    public static fromFlags(flags: number[]): BitMask {
        assertArgumentNotNull('flags', flags);

        let bitMask: BitMask = new BitMask();

        flags.forEach((flag: number) => {
            bitMask._value = bitMask._value | flag;
        });

        return bitMask;
    }


    private static validateBitIndex(bitIndex: number): void {
        if (bitIndex < 0 || bitIndex >= VALUABLE_NUMBER_BITS) {
            throw new IndexOutOfBoundsException(`Bit index is out of bounds (0...${VALUABLE_NUMBER_BITS})`);
        }
    }


    private _value: number;

    /**
     * Creates new instance of BitMask.
     */
    public constructor(initialValue: number = 0) {
        assertArgumentNotNull('initialValue', initialValue);

        this._value = initialValue;
    }

    /**
     * Sets bit value at given position.
     * @param bitIndex
     * @param value
     */
    public set(bitIndex: number, value: boolean): void {
        assertArgumentNotNull('bitIndex', bitIndex);
        assertArgumentNotNull('value', value);

        BitMask.validateBitIndex(bitIndex);

        if (value) {
            this.or(1 << bitIndex);
        } else {
            this.xor(1 << bitIndex);
        }
    }


    public unset(bitIndex: number): void {
        assertArgumentNotNull('bitIndex', bitIndex);

        BitMask.validateBitIndex(bitIndex);

        this.xor(1 << bitIndex);
    }


    public get(bitIndex: number): boolean {
        assertArgumentNotNull('bitIndex', bitIndex);

        BitMask.validateBitIndex(bitIndex);

        return (this._value & (1 << bitIndex)) !== 0;
    }


    public getEnabledBitsIndexes(): ReadOnlyCollection<number> {
        let enabledBitsIndexes: number[] = [];

        for (let bitIndex = 0; bitIndex < VALUABLE_NUMBER_BITS; bitIndex++) {
            if (this.get(bitIndex)) {
                enabledBitsIndexes.push(bitIndex);
            }
        }

        return new ReadOnlyCollection<number>(enabledBitsIndexes);
    }


    public getEnabledFlags(): ReadOnlyCollection<number> {
        let enabledBitsValues: number[] = [];

        for (let bitIndex = 0; bitIndex < VALUABLE_NUMBER_BITS; bitIndex++) {
            if (this.get(bitIndex)) {
                enabledBitsValues.push(1 << bitIndex);
            }
        }

        return new ReadOnlyCollection<number>(enabledBitsValues);
    }


    public hasFlag(flag: number): boolean {
        assertArgumentNotNull('flag', flag);

        return (this._value & flag) !== 0;
    }


    public and(value: number): void {
        assertArgumentNotNull('value', value);

        this._value = this._value & value;
    }


    public or(value: number): void {
        assertArgumentNotNull('value', value);

        this._value = this._value | value;
    }


    public xor(value: number): void {
        assertArgumentNotNull('value', value);

        this._value = this._value ^ value;
    }


    public toNumber(): number {
        return this._value;
    }


    public valueOf(): number {
        return this._value;
    }


    public toString(): string {
        let value: string = '';

        for (let i = 0; i < VALUABLE_NUMBER_BITS; i++) {
            value += this.get(i) ? '1' : '0';
        }

        return value;
    }
}
