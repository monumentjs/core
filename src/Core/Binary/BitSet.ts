import {Assert} from '../Assertion/Assert';
import {ICloneable, IEquatable, IJSONSerializable} from '../types';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';
import {IEnumerable} from '../Collections/IEnumerable';


export class BitSet implements ICloneable<BitSet>, IEquatable<BitSet>, IJSONSerializable<boolean[]> {
    public static fromBits(bits: IEnumerable<boolean>): BitSet {
        Assert.argument('bits', bits).notNull();

        let bitSet: BitSet = new BitSet(bits.length);

        for (let i = 0; i < bits.length; i++) {
            bitSet._bits[i] = bits[i];
        }

        return bitSet;
    }


    public static fromByteArray(bytes: IEnumerable<number>): BitSet {
        Assert.argument('bytes', bytes).notNull();

        let bitSetSize: number = bytes.length * 8;
        let bitSet: BitSet = new BitSet(bitSetSize);
        let bitIndex: number = 0;

        for (let byte of bytes) {
            for (let i = 0; i < 8; i++) {
                bitSet._bits[bitIndex] = (byte & (1 << i)) !== 0;

                bitIndex++;
            }
        }

        return bitSet;
    }


    private _bits: boolean[];


    public get length(): number {
        return this._bits.length;
    }


    public get isEmpty(): boolean {
        for (let bit of this._bits) {
            if (bit) {
                return false;
            }
        }

        return true;
    }


    public get cardinality(): number {
        let cardinality: number = 0;

        for (let bit of this._bits) {
            if (bit) {
                cardinality += 1;
            }
        }

        return cardinality;
    }

    /**
     * Creates new instance of BitMask.
     */
    public constructor(bitsCount: number = 0) {
        Assert.argument('bitsCount', bitsCount).notNull();
        Assert.argument('bitsCount', bitsCount).bounds(0, Infinity);

        this._bits = new Array(bitsCount);
    }


    public clone(): BitSet {
        let clone: BitSet = new BitSet();

        for (let i = 0; i < this._bits.length; i++) {
            clone._bits[i] = this._bits[i];
        }

        return clone;
    }


    public equals(other: BitSet): boolean {
        Assert.argument('other', other).notNull();

        if (this._bits.length !== other._bits.length) {
            return false;
        }

        for (let i = 0; i < this._bits.length; i++) {
            if (this._bits[i] !== other._bits[i]) {
                return false;
            }
        }

        return true;
    }


    public set(bitIndex: number, value: boolean = true): void {
        Assert.argument('bitIndex', bitIndex).notNull();
        Assert.argument('value', value).notNull();
        Assert.argument('bitIndex', bitIndex).isIndex();

        this._bits[bitIndex] = value;
    }


    public setRange(fromIndex: number, toIndex: number, value: boolean = true): void {
        Assert.argument('fromIndex', fromIndex).notNull().isIndex();
        Assert.argument('toIndex', toIndex).notNull().isIndex();
        Assert.argument('value', value).notNull();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = value;
        }
    }


    public setAll(value: boolean = true): void {
        Assert.argument('value', value).notNull();

        for (let i = 0; i < this._bits.length; i++) {
            this._bits[i] = value;
        }
    }


    public setByMask(mask: BitSet): void {
        Assert.argument('mask', mask).notNull();

        for (let i = 0; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = true;
            }
        }
    }


    public clear(bitIndex: number): void {
        Assert.argument('bitIndex', bitIndex).notNull().isIndex();

        this._bits[bitIndex] = false;
    }


    public clearRange(fromIndex: number, toIndex: number): void {
        Assert.argument('fromIndex', fromIndex).notNull().isIndex();
        Assert.argument('toIndex', toIndex).notNull().isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = false;
        }
    }


    public clearAll(): void {
        this.setAll(false);
    }


    public clearByMask(mask: BitSet): void {
        Assert.argument('mask', mask).notNull();

        for (let i = 0; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = false;
            }
        }
    }


    public invert(bitIndex: number): void {
        Assert.argument('bitIndex', bitIndex).notNull().isIndex();

        this._bits[bitIndex] = !this._bits[bitIndex];
    }


    public invertRange(fromIndex: number, toIndex: number): void {
        Assert.argument('fromIndex', fromIndex).notNull().isIndex();
        Assert.argument('toIndex', toIndex).notNull().isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = !this._bits[i];
        }
    }


    public invertAll(): void {
        for (let i = 0; i < this._bits.length; i++) {
            this._bits[i] = !this._bits[i];
        }
    }


    public get(bitIndex: number): boolean {
        Assert.argument('bitIndex', bitIndex).notNull().isIndex();

        return this._bits[bitIndex] || false;
    }


    public getRange(fromIndex: number, toIndex: number): BitSet {
        Assert.argument('fromIndex', fromIndex).notNull().isIndex();
        Assert.argument('toIndex', toIndex).notNull().isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        let slice: BitSet = new BitSet(toIndex - fromIndex);

        for (let index = fromIndex, position = 0; index < toIndex; index++, position++) {
            slice._bits[position] = this._bits[index];
        }

        return slice;
    }


    public indexOf(bitValue: boolean, fromIndex?: number): number {
        Assert.argument('bitValue', bitValue).notNull();

        if (fromIndex) {
            Assert.argument('fromIndex', fromIndex).indexBounds(0, this._bits.length);
        }

        if (fromIndex != null) {
            return this._bits.indexOf(bitValue, fromIndex);
        } else {
            return this._bits.indexOf(bitValue);
        }
    }


    public lastIndexOf(bitValue: boolean, fromIndex?: number): number {
        Assert.argument('bitValue', bitValue).notNull();

        if (fromIndex) {
            Assert.argument('fromIndex', fromIndex).indexBounds(0, this._bits.length);
        }

        if (fromIndex != null) {
            return this._bits.lastIndexOf(bitValue, fromIndex);
        } else {
            return this._bits.lastIndexOf(bitValue);
        }
    }


    public findBits(bitValue: boolean): ReadOnlyCollection<number> {
        Assert.argument('bitValue', bitValue).notNull();

        let indexes: number[] = [];

        for (let i = 0; i < this._bits.length; i++) {
            if (this._bits[i] === bitValue) {
                indexes.push(i);
            }
        }

        return new ReadOnlyCollection(indexes);
    }


    public and(set: BitSet): void {
        Assert.argument('set', set).notNull();

        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) && set.get(i);
        }
    }


    public or(set: BitSet): void {
        Assert.argument('set', set).notNull();

        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) || set.get(i);
        }
    }


    public xor(set: BitSet): void {
        Assert.argument('set', set).notNull();

        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) !== set.get(i);
        }
    }


    public intersects(other: BitSet): boolean {
        Assert.argument('other', other).notNull();

        let minLength: number = Math.min(this.length, other.length);

        for (let i = 0; i < minLength; i++) {
            if (this._bits[i] && other._bits[i]) {
                return true;
            }
        }

        return false;
    }


    public toString(): string {
        let setIndexes: ReadOnlyCollection<number> = this.findBits(true);

        return `{${setIndexes.toArray().join(', ')}}`;
    }


    public toJSON(): boolean[] {
        return this._bits;
    }


    public toByteArray(): number[] {
        let bytes: number[] = [];

        for (let i = 0; i < this._bits.length; i++) {
            if (i % 8 === 0) {
                bytes.push(0);
            }

            if (this._bits[i]) {
                bytes[bytes.length - 1] |= (1 << (i % 8));
            }
        }

        return bytes;
    }
}
