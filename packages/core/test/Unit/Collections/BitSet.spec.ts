import { BitSet } from '../../../../collections/main/BitSet';
import { ArgumentNullException } from '../../../main/exceptions/ArgumentNullException';
import { ArgumentIndexOutOfBoundsException } from '../../../main/exceptions/ArgumentIndexOutOfBoundsException';
import { RangeException } from '../../../main/RangeException';
import { Collection } from '../../../../collections/main/Collection';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { Case } from '../../../../test-drive/Decorators/Case';


@Test()
export class BitSetSpec {


    @Case()
    public 'constructor() create new instance of BitSet class'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.length).toBe(0);
        expect(bitSet.cardinality).toBe(0);
    }


    @Case()
    public 'get cardinality returns number of set bits'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.length).toBe(0);
        expect(bitSet.cardinality).toBe(0);

        bitSet = BitSet.fromBits([false, false, false, false]);

        expect(bitSet.length).toBe(4);
        expect(bitSet.cardinality).toBe(0);

        bitSet = BitSet.fromBits([false, false, true, false]);

        expect(bitSet.length).toBe(4);
        expect(bitSet.cardinality).toBe(1);
    }


    @Case()
    public 'get() throws if `bitIndex` argument is less than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.get(-1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'get() returns `false` when bit index is greater than set length'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.length).toBe(0);
        expect(bitSet.get(1)).toBe(false);
    }


    @Case()
    public 'get() gets value of the bit at the given position'() {
        let bitSet: BitSet = new BitSet();

        bitSet.setRange(0, 3);

        expect(bitSet.get(0)).toEqual(true);
        expect(bitSet.get(1)).toEqual(true);
        expect(bitSet.get(2)).toEqual(true);
        expect(bitSet.get(3)).toEqual(false);
        expect(bitSet.get(4)).toEqual(false);
    }


    @Case()
    public 'getRange() throws if any of arguments is less than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.getRange(-1, 10)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.getRange(0, -1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'getRange() throws if left bound is greater than right bound'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.getRange(10, 9)).toThrow(RangeException);
    }


    @Case()
    public 'getRange() returns range of bits'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(1);

        expect(bitSet.length).toBe(2);

        let slice: BitSet = bitSet.getRange(1, 2);

        expect(slice.length).toBe(1);
        expect(slice.get(0)).toBe(true);
    }


    @Case()
    public 'set() throws if `bitIndex` argument is less than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.set(-1)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.set(-1, true)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.set(-1, false)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'set() sets value of the bit at the given position to `true`'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(3);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(false);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(true);

        bitSet.set(1);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(true);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(true);

        bitSet.set(3, false);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(true);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(false);
    }


    @Case()
    public 'set() sets value of the bit at the given position to specified value'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(3);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(false);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(true);

        bitSet.set(1);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(true);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(true);

        bitSet.set(3, false);

        expect(bitSet.get(0)).toEqual(false);
        expect(bitSet.get(1)).toEqual(true);
        expect(bitSet.get(2)).toEqual(false);
        expect(bitSet.get(3)).toEqual(false);
    }


    @Case()
    public 'set() increments set length if necessary'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);

        expect(bitSet.length).toEqual(1);

        bitSet.set(1);

        expect(bitSet.length).toEqual(2);

        bitSet.set(1, false);

        expect(bitSet.length).toEqual(2);
    }


    @Case()
    public 'setRange() throws if any of arguments is not defined'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.setRange(0, 1, undefined)).not.toThrow(ArgumentNullException);
    }


    @Case()
    public 'setRange() throws if range is not valid'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.setRange(-1, 1)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.setRange(0, -1)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.setRange(1, 0)).toThrow(RangeException);
    }


    @Case()
    public 'setAll() sets all bits to given value'() {
        let bitSet: BitSet = new BitSet(3);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);

        bitSet.setAll(true);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(true);
        expect(bitSet.get(1)).toBe(true);
        expect(bitSet.get(2)).toBe(true);

        bitSet.setAll(false);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'setByMask() sets all corresponding set bits in current bit set'() {
        let bitSet: BitSet = new BitSet();
        let mask: BitSet = new BitSet(3);

        mask.set(0);
        mask.set(2);

        bitSet.setByMask(mask);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(true);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(true);
    }


    @Case()
    public 'clear() throws if `bitIndex` argument is lower than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.clear(-1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'clear() clears bit at given position'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(true);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(true);

        bitSet.clear(0);
        bitSet.clear(2);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'clear() increases size of bit set'() {
        let bitSet: BitSet = new BitSet();

        bitSet.clear(0);
        bitSet.clear(2);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'clearRange() throws if `fromIndex` argument is lower than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.clearRange(-1, 1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'clearRange() throws if `toIndex` argument is lower than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.clearRange(0, -1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'clearRange() clears specified amount of bits starting from given position'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);

        bitSet.clearRange(0, 1);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(true);

        bitSet.clearRange(2, 3);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'clearRange() increases size of bit set'() {
        let bitSet: BitSet = new BitSet();

        bitSet.clear(0);

        expect(bitSet.length).toBe(1);

        bitSet.clear(2);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'clearAll() clears all bits in set'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(2);

        bitSet.clearAll();

        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'clearRange() does not decrements length of set'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(2);

        bitSet.clearAll();

        expect(bitSet.length).toBe(3);
    }


    @Case()
    public 'clearByMask() clears corresponding bits for whose value in mask is set'() {
        let bitSet: BitSet = BitSet.fromBits([false, true, true]);
        let mask: BitSet = BitSet.fromBits([false, false, true]);

        bitSet.clearByMask(mask);

        expect(bitSet.length).toBe(3);
        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(true);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'findBits() returns read-only collection of set bits indexes'() {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);
        bitSet.set(4);

        let setBits: Collection<number> = bitSet.findBits(true);

        expect(setBits.length).toEqual(3);
        expect(setBits.contains(0)).toBe(true);
        expect(setBits.contains(2)).toBe(true);
        expect(setBits.contains(4)).toBe(true);
    }


    @Case()
    public 'findBits() returns read-only collection of clear bits indexes'() {
        let bitSet: BitSet = BitSet.fromBits([true, false, true, false, true, false]);
        let clearBits: Collection<number> = bitSet.findBits(false);

        expect(clearBits.length).toEqual(3);
        expect(clearBits.contains(1)).toBe(true);
        expect(clearBits.contains(3)).toBe(true);
        expect(clearBits.contains(5)).toBe(true);
    }


    @Case()
    public 'invert() throws if `bitIndex` argument has invalid range'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.invert(-1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'invert() inverts value if specified bit to the opposite'() {
        let bitSet: BitSet = new BitSet();

        bitSet.invert(2);

        expect(bitSet.get(0)).toBe(false);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(true);
    }


    @Case()
    public 'invert() increments set length if necessary'() {
        let bitSet: BitSet = new BitSet();

        bitSet.invert(2);

        expect(bitSet.length).toBe(3);
    }


    @Case()
    public 'invertRange() throws if arguments has invalid range'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.invertRange(-1, 1)).toThrow(ArgumentIndexOutOfBoundsException);
        expect(() => bitSet.invertRange(1, -1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'invertRange() inverts bits values to the opposite in specified range'() {
        let bitSet: BitSet = new BitSet();

        bitSet.invertRange(0, 2);

        expect(bitSet.get(0)).toBe(true);
        expect(bitSet.get(1)).toBe(true);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'invertRange() increments set length if necessary'() {
        let bitSet: BitSet = new BitSet();

        bitSet.invertRange(0, 2);

        expect(bitSet.length).toBe(2);
    }


    @Case()
    public 'invertAll() inverts values of all bits in set'() {
        let bitSet: BitSet = BitSet.fromBits([false, true, true]);

        bitSet.invertAll();

        expect(bitSet.get(0)).toBe(true);
        expect(bitSet.get(1)).toBe(false);
        expect(bitSet.get(2)).toBe(false);
    }


    @Case()
    public 'invertAll() does not change length of set'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.length).toBe(0);

        bitSet.invertAll();

        expect(bitSet.length).toBe(0);

        bitSet = BitSet.fromBits([false, true, true]);

        bitSet.invertAll();

        expect(bitSet.length).toBe(3);
    }


    @Case()
    public 'indexOf() does not throw if `fromIndex` argument is not defined'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.indexOf(true, undefined)).not.toThrow(ArgumentNullException);
    }


    @Case()
    public 'indexOf() throws if `fromIndex` argument is lower than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.indexOf(true, -1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'indexOf() throws if `fromIndex` argument is out of set range'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.indexOf(true, 1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'indexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.indexOf(true, 0)).not.toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'indexOf() returns index of first bit with specified value'() {
        let bitSet: BitSet = new BitSet();

        bitSet = BitSet.fromBits([true, false, true, false]);

        expect(bitSet.indexOf(true)).toBe(0);
        expect(bitSet.indexOf(false)).toBe(1);
        expect(bitSet.indexOf(true, 1)).toBe(2);
        expect(bitSet.indexOf(false, 2)).toBe(3);
    }


    @Case()
    public 'lastIndexOf() does not throw if `fromIndex` argument is not defined'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.lastIndexOf(true, undefined)).not.toThrow(ArgumentNullException);
    }


    @Case()
    public 'lastIndexOf() throws if `fromIndex` argument is lower than zero'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.lastIndexOf(true, -1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'lastIndexOf() throws if `fromIndex` argument is out of set range'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.lastIndexOf(true, 1)).toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'lastIndexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too'() {
        let bitSet: BitSet = new BitSet();

        expect(() => bitSet.lastIndexOf(true, 0)).not.toThrow(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'lastIndexOf() returns index of last bit with specified value'() {
        let bitSet: BitSet = BitSet.fromBits([true, false, true, false]);

        expect(bitSet.lastIndexOf(true)).toBe(2);
        expect(bitSet.lastIndexOf(false)).toBe(3);
        expect(bitSet.lastIndexOf(true, 1)).toBe(0);
        expect(bitSet.lastIndexOf(false, 2)).toBe(1);
    }


    @Case()
    public 'and(), or(), xor() performs logical AND operation'() {
        let bits1: BitSet = new BitSet(16);
        let bits2: BitSet = new BitSet(16);

        // set some bits

        for (let i = 0; i < 16; i++) {
            if ((i % 2) === 0) {
                bits1.set(i);
            }

            if ((i % 5) !== 0) {
                bits2.set(i);
            }
        }

        bits2.and(bits1);

        expect(bits2.findBits(true).toArray()).toEqual([2, 4, 6, 8, 12, 14]);

        bits2.or(bits1);

        expect(bits2.findBits(true).toArray()).toEqual([0, 2, 4, 6, 8, 10, 12, 14]);

        bits2.xor(bits1);

        expect(bits2.findBits(true).toArray()).toEqual([]);
    }


    @Case()
    public 'intersects() determines whether sets intersects 1'() {
        let one: BitSet = BitSet.fromBits([true]);
        let other: BitSet = BitSet.fromBits([true, false]);

        expect(one.intersects(other)).toBe(true);
    }


    @Case()
    public 'intersects() determines whether sets intersects 2'() {
        let one: BitSet = BitSet.fromBits([false]);
        let other: BitSet = BitSet.fromBits([true, false]);

        expect(one.intersects(other)).toBe(false);
    }


    @Case()
    public 'intersects() determines whether sets intersects 3'() {
        let one: BitSet = BitSet.fromBits([]);
        let other: BitSet = BitSet.fromBits([true, false]);

        expect(one.intersects(other)).toBe(false);
    }


    @Case()
    public 'toString() returns string representation of bit set'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.toString()).toBe(`{}`);

        bitSet = BitSet.fromBits([false]);

        expect(bitSet.toString()).toBe(`{}`);

        bitSet = BitSet.fromBits([false, true]);

        expect(bitSet.toString()).toBe(`{1}`);

        bitSet = BitSet.fromBits([true, true]);

        expect(bitSet.toString()).toBe(`{0, 1}`);
    }


    @Case()
    public 'toByteArray() creates byte array'() {
        let bitSet: BitSet = new BitSet();

        expect(bitSet.toByteArray()).toEqual([]);

        bitSet = BitSet.fromBits([false]);

        expect(bitSet.toByteArray()).toEqual([0]);

        bitSet = BitSet.fromBits([false, true]);

        expect(bitSet.toByteArray()).toEqual([2]);

        bitSet = BitSet.fromBits([true, true]);

        expect(bitSet.toByteArray()).toEqual([3]);

        bitSet = BitSet.fromBits([
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);

        let bytes = bitSet.toByteArray();

        expect(bytes).toEqual([255, 128]);
        expect(bytes.length).toEqual(2);
    }


    @Case()
    public 'equals() creates new bit set byte array'() {

        let bitSet: BitSet = BitSet.fromBits([
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);

        let bytes = bitSet.toByteArray();

        bitSet = BitSet.fromByteArray(bytes);

        expect(bitSet.toJSON()).toEqual([
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);
    }
}
