import {Assert} from '../../assert/Assert';
import {Cloneable} from '../../Cloneable';
import {Equatable} from '../../utils/comparison/Equatable';
import {JSONSerializable} from '../../JSONSerializable';
import {Collection} from '../mutable/Collection';
import {ArrayList} from '../mutable/ArrayList';
import {Countable} from '../readonly/Countable';
import {ZERO} from '../../Constants';


export class BitSet implements Countable, Cloneable<BitSet>, Equatable<BitSet>, JSONSerializable<boolean[]> {
    private static readonly CARDINALITY_ZERO: number = ZERO;

    public static fromBits(bits: boolean[]): BitSet {
        let bitSet: BitSet = new BitSet(bits.length);

        for (let i = ZERO; i < bits.length; i++) {
            bitSet._bits[i] = bits[i] as boolean;
        }

        return bitSet;
    }

    public static fromByteArray(bytes: number[]): BitSet {
        let bitSetSize: number = bytes.length * 8;
        let bitSet: BitSet = new BitSet(bitSetSize);
        let bitIndex: number = ZERO;

        for (let byte of bytes) {
            for (let i = ZERO; i < 8; i++) {
                bitSet._bits[bitIndex] = (byte & (1 << i)) !== ZERO;

                bitIndex++;
            }
        }

        return bitSet;
    }

    private readonly _bits: boolean[];

    public get cardinality(): number {
        let cardinality: number = BitSet.CARDINALITY_ZERO;

        for (const bit of this._bits) {
            if (bit) {
                cardinality += 1;
            }
        }

        return cardinality;
    }

    public get isEmpty(): boolean {
        for (const bit of this._bits) {
            if (bit) {
                return false;
            }
        }

        return true;
    }

    public get length(): number {
        return this._bits.length;
    }

    public constructor(bitsCount: number = ZERO) {
        Assert.argument('bitsCount', bitsCount).isLength();

        this._bits = new Array(bitsCount);
    }

    public and(set: BitSet): void {
        for (let i = ZERO; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) && set.get(i);
        }
    }

    public clear(bitIndex: number): void {
        Assert.argument('bitIndex', bitIndex).isIndex();

        this._bits[bitIndex] = false;
    }

    public clearAll(): void {
        this.setAll(false);
    }

    public clearByMask(mask: BitSet): void {
        for (let i = ZERO; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = false;
            }
        }
    }

    public clearRange(fromIndex: number, toIndex: number): void {
        Assert.argument('fromIndex', fromIndex).isIndex();
        Assert.argument('toIndex', toIndex).isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = false;
        }
    }

    public clone(): BitSet {
        let clone: BitSet = new BitSet();

        for (let i = ZERO; i < this._bits.length; i++) {
            clone._bits[i] = this._bits[i];
        }

        return clone;
    }

    public equals(other: BitSet): boolean {
        if (this._bits.length !== other._bits.length) {
            return false;
        }

        for (let i = ZERO; i < this._bits.length; i++) {
            if (this._bits[i] !== other._bits[i]) {
                return false;
            }
        }

        return true;
    }

    public findBits(bitValue: boolean): Collection<number> {
        let indexes: Collection<number> = new ArrayList();

        for (let index = ZERO; index < this._bits.length; index++) {
            if (this._bits[index] === bitValue) {
                indexes.add(index);
            }
        }

        return indexes;
    }

    public get(bitIndex: number): boolean {
        Assert.argument('bitIndex', bitIndex).isIndex();

        return this._bits[bitIndex] || false;
    }

    public getRange(fromIndex: number, toIndex: number): BitSet {
        Assert.argument('fromIndex', fromIndex).isIndex();
        Assert.argument('toIndex', toIndex).isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        let slice: BitSet = new BitSet(toIndex - fromIndex);

        for (let index = fromIndex, position = ZERO; index < toIndex; index++, position++) {
            slice._bits[position] = this._bits[index];
        }

        return slice;
    }

    public indexOf(bitValue: boolean, fromIndex?: number): number {
        if (fromIndex) {
            Assert.argument('fromIndex', fromIndex).indexBounds(ZERO, this._bits.length);
        }

        if (fromIndex != null) {
            return this._bits.indexOf(bitValue, fromIndex);
        } else {
            return this._bits.indexOf(bitValue);
        }
    }

    public intersects(other: BitSet): boolean {
        let minLength: number = Math.min(this.length, other.length);

        for (let i = ZERO; i < minLength; i++) {
            if (this._bits[i] && other._bits[i]) {
                return true;
            }
        }

        return false;
    }

    public invert(bitIndex: number): void {
        Assert.argument('bitIndex', bitIndex).isIndex();

        this._bits[bitIndex] = !this._bits[bitIndex];
    }

    public invertAll(): void {
        for (let i = ZERO; i < this._bits.length; i++) {
            this._bits[i] = !this._bits[i];
        }
    }

    public invertRange(fromIndex: number, toIndex: number): void {
        Assert.argument('fromIndex', fromIndex).isIndex();
        Assert.argument('toIndex', toIndex).isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = !this._bits[i];
        }
    }

    public lastIndexOf(bitValue: boolean, fromIndex?: number): number {
        if (fromIndex) {
            Assert.argument('fromIndex', fromIndex).indexBounds(ZERO, this._bits.length);
        }

        if (fromIndex != null) {
            return this._bits.lastIndexOf(bitValue, fromIndex);
        } else {
            return this._bits.lastIndexOf(bitValue);
        }
    }

    public or(set: BitSet): void {
        for (let i = ZERO; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) || set.get(i);
        }
    }

    public set(bitIndex: number, value: boolean = true): void {
        Assert.argument('bitIndex', bitIndex).isIndex();

        this._bits[bitIndex] = value;
    }

    public setAll(value: boolean = true): void {
        for (let i = ZERO; i < this._bits.length; i++) {
            this._bits[i] = value;
        }
    }

    public setByMask(mask: BitSet): void {
        for (let i = ZERO; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = true;
            }
        }
    }

    public setRange(fromIndex: number, toIndex: number, value: boolean = true): void {
        Assert.argument('fromIndex', fromIndex).isIndex();
        Assert.argument('toIndex', toIndex).isIndex();
        Assert.range(fromIndex, toIndex).ofArguments('fromIndex', 'toIndex');

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = value;
        }
    }

    public toByteArray(): number[] {
        const bytes: number[] = [];

        for (let i = ZERO; i < this._bits.length; i++) {
            if (i % 8 === ZERO) {
                bytes.push(ZERO);
            }

            if (this._bits[i]) {
                bytes[bytes.length - 1] |= (1 << (i % 8));
            }
        }

        return bytes;
    }

    public toJSON(): boolean[] {
        return this._bits;
    }

    public toString(): string {
        const setIndexes: Collection<number> = this.findBits(true);

        return `{${setIndexes.toArray().join(', ')}}`;
    }

    public xor(set: BitSet): void {
        for (let i = ZERO; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) !== set.get(i);
        }
    }
}
