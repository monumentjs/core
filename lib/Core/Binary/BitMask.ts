import List from '../Collections/List';


export const VALUABLE_NUMBER_BITS: number = 32;


export default class BitMask {
    public static fromFlags(flags: number[]): BitMask {
        let bitMask: BitMask = new BitMask();

        flags.forEach((flag: number) => {
            bitMask.value = bitMask.value | flag;
        });

        return bitMask;
    }


    private _value: number;

    /**
     * Gets actual value.
     */
    public get value(): number {
        return this._value;
    }

    /**
     * Sets actual value.
     * @param value
     */
    public set value(value: number) {
        this._value = value;
    }

    /**
     * Creates new instance of BitMask.
     */
    public constructor(initialValue: number = 0) {
        this._value = initialValue;
    }

    /**
     * Sets bit value at given position.
     * @param bitIndex
     * @param value
     */
    public setBitAt(bitIndex: number, value: boolean) {
        if (bitIndex < 0 || bitIndex >= VALUABLE_NUMBER_BITS) {
            throw new RangeError(`Index out of range [0...${VALUABLE_NUMBER_BITS - 1}]`);
        }

        if (value) {
            this._value = this._value | (1 << bitIndex);
        } else {
            this._value = this._value ^ (1 << bitIndex);
        }
    }

    /**
     * Gets bit value at given position.
     * @param bitIndex
     */
    public getBitAt(bitIndex: number): boolean {
        if (bitIndex < 0 || bitIndex >= VALUABLE_NUMBER_BITS) {
            throw new RangeError(`Index out of range [0...${VALUABLE_NUMBER_BITS - 1}]`);
        }

        return (this._value & (1 << bitIndex)) !== 0;
    }

    /**
     * Gets list of indexes of bits with value equal to 1.
     */
    public getEnabledBitsIndexes(): List<number> {
        let enabledBitsIndexes: List<number> = new List<number>();

        for (let bitIndex = 0; bitIndex < VALUABLE_NUMBER_BITS; bitIndex++) {
            if (this.getBitAt(bitIndex)) {
                enabledBitsIndexes.add(bitIndex);
            }
        }

        return enabledBitsIndexes;
    }

    /**
     * Gets list of flags of bits with value equal to 1.
     */
    public getEnabledFlags(): List<number> {
        let enabledBitsValues: List<number> = new List<number>();

        for (let bitIndex = 0; bitIndex < VALUABLE_NUMBER_BITS; bitIndex++) {
            if (this.getBitAt(bitIndex)) {
                enabledBitsValues.add(1 << bitIndex);
            }
        }

        return enabledBitsValues;
    }

    /**
     *
     * @param flag
     */
    public hasFlag(flag: number): boolean {
        return (this._value & flag) !== 0;
    }
}
