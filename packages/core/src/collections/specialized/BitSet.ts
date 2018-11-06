import {Cloneable} from '../../base/Cloneable';
import {Equatable} from '../../comparison/equality/Equatable';
import {ToJSON} from '../../base/ToJSON';
import {ArrayList} from '../list/mutable/ArrayList';
import {Sequence} from '../base/Sequence';
import {CollectionUtils} from '../base/CollectionUtils';
import {ReadOnlyList} from '../list/readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class BitSet implements Sequence<boolean>, Cloneable<BitSet>, Equatable<BitSet>, ToJSON<boolean[]> {
    private static readonly CARDINALITY_ZERO: number = 0;

    public static fromBits(bits: boolean[]): BitSet {
        const bitSet: BitSet = new BitSet(bits.length);

        for (let i = 0; i < bits.length; i++) {
            bitSet._bits[i] = bits[i] as boolean;
        }

        return bitSet;
    }

    public static fromByteArray(bytes: number[]): BitSet {
        const bitSetSize: number = bytes.length * 8;
        const bitSet: BitSet = new BitSet(bitSetSize);
        let bitIndex: number = 0;

        for (const byte of bytes) {
            for (let i = 0; i < 8; i++) {
                bitSet._bits[bitIndex] = (byte & (1 << i)) !== 0;

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

    public constructor(bitsCount: number = 0) {
        CollectionUtils.validateLength(bitsCount);

        this._bits = new Array(bitsCount);
    }

    public [Symbol.iterator](): Iterator<boolean> {
        return this._bits[Symbol.iterator]();
    }

    public and(set: BitSet): void {
        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) && set.get(i);
        }
    }

    public clear(bitIndex: number): void {
        CollectionUtils.validateIndex(bitIndex);

        this._bits[bitIndex] = false;
    }

    public clearAll(): void {
        this.setAll(false);
    }

    public clearByMask(mask: BitSet): void {
        for (let i = 0; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = false;
            }
        }
    }

    public clearRange(fromIndex: number, toIndex: number): void {
        CollectionUtils.validateIndex(fromIndex);
        CollectionUtils.validateIndex(toIndex);
        CollectionUtils.validateBounds(fromIndex, toIndex);

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = false;
        }
    }

    public clone(): BitSet {
        const clone: BitSet = new BitSet();

        for (let i = 0; i < this._bits.length; i++) {
            clone._bits[i] = this._bits[i];
        }

        return clone;
    }

    public equals(other: BitSet): boolean {
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

    public findBits(bitValue: boolean): ReadOnlyList<number> {
        const indexes: ArrayList<number> = new ArrayList();

        for (let index = 0; index < this._bits.length; index++) {
            if (this._bits[index] === bitValue) {
                indexes.add(index);
            }
        }

        return indexes;
    }

    public get(bitIndex: number): boolean {
        CollectionUtils.validateIndex(bitIndex);

        return this._bits[bitIndex] || false;
    }

    public getRange(fromIndex: number, toIndex: number): BitSet {
        CollectionUtils.validateIndex(fromIndex);
        CollectionUtils.validateIndex(toIndex);
        CollectionUtils.validateBounds(fromIndex, toIndex);

        const slice: BitSet = new BitSet(toIndex - fromIndex);

        for (let index = fromIndex, position = 0; index < toIndex; index++, position++) {
            slice._bits[position] = this._bits[index];
        }

        return slice;
    }

    public indexOf(bitValue: boolean, fromIndex: number = 0): number {
        if (fromIndex !== 0) {
            CollectionUtils.validateIndexBounds(this._bits, fromIndex);
        }

        if (fromIndex !== 0) {
            return this._bits.indexOf(bitValue, fromIndex);
        } else {
            return this._bits.indexOf(bitValue);
        }
    }

    public intersects(other: BitSet): boolean {
        const minLength: number = Math.min(this.length, other.length);

        for (let i = 0; i < minLength; i++) {
            if (this._bits[i] && other._bits[i]) {
                return true;
            }
        }

        return false;
    }

    public invert(bitIndex: number): void {
        CollectionUtils.validateIndex(bitIndex);

        this._bits[bitIndex] = !this._bits[bitIndex];
    }

    public invertAll(): void {
        for (let i = 0; i < this._bits.length; i++) {
            this._bits[i] = !this._bits[i];
        }
    }

    public invertRange(fromIndex: number, toIndex: number): void {
        CollectionUtils.validateIndex(fromIndex);
        CollectionUtils.validateIndex(toIndex);
        CollectionUtils.validateBounds(fromIndex, toIndex);

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = !this._bits[i];
        }
    }

    public lastIndexOf(bitValue: boolean, fromIndex: number = Math.max(this._bits.length - 1, 0)): number {
        if (fromIndex !== 0) {
            CollectionUtils.validateIndexBounds(this._bits, fromIndex);
        }

        if (fromIndex !== 0) {
            return this._bits.lastIndexOf(bitValue, fromIndex);
        } else {
            return this._bits.lastIndexOf(bitValue);
        }
    }

    public or(set: BitSet): void {
        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) || set.get(i);
        }
    }

    public set(bitIndex: number, value: boolean = true): void {
        CollectionUtils.validateIndex(bitIndex);

        this._bits[bitIndex] = value;
    }

    public setAll(value: boolean = true): void {
        for (let i = 0; i < this._bits.length; i++) {
            this._bits[i] = value;
        }
    }

    public setByMask(mask: BitSet): void {
        for (let i = 0; i < mask._bits.length; i++) {
            if (mask._bits[i]) {
                this._bits[i] = true;
            }
        }
    }

    public setRange(fromIndex: number, toIndex: number, value: boolean = true): void {
        CollectionUtils.validateIndex(fromIndex);
        CollectionUtils.validateIndex(toIndex);
        CollectionUtils.validateBounds(fromIndex, toIndex);

        for (let i = fromIndex; i < toIndex; i++) {
            this._bits[i] = value;
        }
    }

    public toByteArray(): number[] {
        const bytes: number[] = [];

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

    public toJSON(): boolean[] {
        return this._bits;
    }

    public toString(): string {
        const setIndexes: ReadOnlyList<number> = this.findBits(true);

        return `{${setIndexes.toArray().join(', ')}}`;
    }

    public xor(set: BitSet): void {
        for (let i = 0; i < set._bits.length; i++) {
            this._bits[i] = this.get(i) !== set.get(i);
        }
    }
}
