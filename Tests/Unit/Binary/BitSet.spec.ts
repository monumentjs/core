import {BitSet} from '../../../Source/Binary/BitSet';
import {ReadOnlyCollection} from '../../../Source/Collections/ReadOnlyCollection';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {IndexOutOfBoundsException} from '../../../Source/Exceptions/IndexOutOfBoundsException';
import {RangeException} from '../../../Source/Exceptions/RangeException';
import {IEnumerable} from '../../../Source/Collections/IEnumerable';


describe('BitSet', () => {
    let bitSet: BitSet = null;


    beforeEach(() => {
        expect(function () {
            bitSet = new BitSet();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('create new instance of BitSet class', () => {
            expect(bitSet.length).toBe(0);
            expect(bitSet.cardinality).toBe(0);
        });
    });


    describe('#cardinality', () => {
        it('returns number of set bits', () => {
            expect(bitSet.length).toBe(0);
            expect(bitSet.cardinality).toBe(0);

            bitSet = BitSet.fromBits([false, false, false, false]);

            expect(bitSet.length).toBe(4);
            expect(bitSet.cardinality).toBe(0);

            bitSet = BitSet.fromBits([false, false, true, false]);

            expect(bitSet.length).toBe(4);
            expect(bitSet.cardinality).toBe(1);

        });
    });


    describe('#get()', () => {
        it(`throws if 'bitIndex' argument is not defined`, () => {
            expect(() => bitSet.get(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.get(undefined)).toThrow(ArgumentNullException);
        });

        it(`throws if 'bitIndex' argument is less than zero`, () => {
            expect(() => bitSet.get(-1)).toThrow(IndexOutOfBoundsException);
        });

        it(`returns 'false' when bit's index is greater than set length`, () => {
            expect(bitSet.length).toBe(0);
            expect(bitSet.get(1)).toBe(false);
        });

        it('gets value of the bit at the given position', () => {
            bitSet.setRange(0, 3);

            expect(bitSet.get(0)).toEqual(true);
            expect(bitSet.get(1)).toEqual(true);
            expect(bitSet.get(2)).toEqual(true);
            expect(bitSet.get(3)).toEqual(false);
            expect(bitSet.get(4)).toEqual(false);
        });
    });


    describe('#getRange()', () => {
        it(`throws if any of arguments is not defined`, () => {
            expect(() => bitSet.getRange(null, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.getRange(0, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.getRange(null, 0)).toThrow(ArgumentNullException);
            expect(() => bitSet.getRange(undefined, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.getRange(0, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.getRange(undefined, 0)).toThrow(ArgumentNullException);
        });

        it(`throws if any of arguments is less than zero`, () => {
            expect(() => bitSet.getRange(-1, 10)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.getRange(0, -1)).toThrow(IndexOutOfBoundsException);
        });

        it(`throws if left bound is greater than right bound`, () => {
            expect(() => bitSet.getRange(10, 9)).toThrow(RangeException);
        });

        it(`returns range of bits`, () => {
            bitSet.set(1);

            expect(bitSet.length).toBe(2);

            let slice: BitSet = bitSet.getRange(1, 2);

            expect(slice.length).toBe(1);
            expect(slice.get(0)).toBe(true);
        });
    });


    describe('#set()', () => {
        it(`throws if 'bitIndex' argument is not defined`, () => {
            expect(() => bitSet.set(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.set(undefined)).toThrow(ArgumentNullException);

            expect(() => bitSet.set(null, true)).toThrow(ArgumentNullException);
            expect(() => bitSet.set(undefined, true)).toThrow(ArgumentNullException);

            expect(() => bitSet.set(null, false)).toThrow(ArgumentNullException);
            expect(() => bitSet.set(undefined, false)).toThrow(ArgumentNullException);
        });

        it(`throws if 'bitIndex' argument is less than zero`, () => {
            expect(() => bitSet.set(-1)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.set(-1, true)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.set(-1, false)).toThrow(IndexOutOfBoundsException);
        });

        it(`sets value of the bit at the given position to 'true'`, () => {
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
        });

        it('sets value of the bit at the given position to specified value', () => {
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
        });

        it('increments set length if necessary', () => {
            bitSet.set(0);

            expect(bitSet.length).toEqual(1);

            bitSet.set(1);

            expect(bitSet.length).toEqual(2);

            bitSet.set(1, false);

            expect(bitSet.length).toEqual(2);
        });
    });


    describe('#setRange()', () => {
        it(`throws if any of arguments is not defined`, () => {
            expect(() => bitSet.setRange(null, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(0, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(null, 0)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(undefined, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(0, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(undefined, 0)).toThrow(ArgumentNullException);

            expect(() => bitSet.setRange(0, 1, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.setRange(0, 1, undefined)).not.toThrow(ArgumentNullException);
        });

        it(`throws if range is not valid`, () => {
            expect(() => bitSet.setRange(-1, 1)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.setRange(0, -1)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.setRange(1, 0)).toThrow(RangeException);
        });
    });


    describe('#setAll()', () => {
        it(`sets all bits to given value`, () => {
            bitSet = new BitSet(3);

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
        });
    });


    describe('#setByMask()', () => {
        it(`throws if 'mask' argument is not defined`, () => {
            expect(() => bitSet.setByMask(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.setByMask(undefined)).toThrow(ArgumentNullException);
        });

        it(`sets all corresponding set bits in current bit set`, () => {
            let mask: BitSet = new BitSet(3);

            mask.set(0);
            mask.set(2);

            bitSet.setByMask(mask);

            expect(bitSet.length).toBe(3);
            expect(bitSet.get(0)).toBe(true);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(true);
        });
    });


    describe('#clear()', () => {
        it(`throws if 'bitIndex' argument is not defined`, () => {
            expect(() => bitSet.clear(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.clear(undefined)).toThrow(ArgumentNullException);
        });

        it(`throws if 'bitIndex' argument is lower than zero`, () => {
            expect(() => bitSet.clear(-1)).toThrow(IndexOutOfBoundsException);
        });

        it(`clears bit at given position`, () => {
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
        });

        it(`increases size of bit set`, () => {
            bitSet.clear(0);
            bitSet.clear(2);

            expect(bitSet.length).toBe(3);
            expect(bitSet.get(0)).toBe(false);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(false);
        });
    });


    describe('#clearRange()', () => {
        it(`throws if any of arguments is not defined`, () => {
            expect(() => bitSet.clearRange(null, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearRange(0, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearRange(null, 0)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearRange(undefined, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearRange(0, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearRange(undefined, 0)).toThrow(ArgumentNullException);
        });

        it(`throws if 'fromIndex' argument is lower than zero`, () => {
            expect(() => bitSet.clearRange(-1, 1)).toThrow(IndexOutOfBoundsException);
        });

        it(`throws if 'toIndex' argument is lower than zero`, () => {
            expect(() => bitSet.clearRange(0, -1)).toThrow(IndexOutOfBoundsException);
        });

        it(`clears specified amount of bits starting from given position`, () => {
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
        });

        it(`increases size of bit set`, () => {
            bitSet.clear(0);

            expect(bitSet.length).toBe(1);

            bitSet.clear(2);

            expect(bitSet.length).toBe(3);
            expect(bitSet.get(0)).toBe(false);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(false);
        });
    });


    describe('#clearAll()', () => {
        it(`clears all bits in set`, () => {
            bitSet.set(2);

            bitSet.clearAll();

            expect(bitSet.get(0)).toBe(false);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(false);
        });

        it(`does not decrements length of set`, () => {
            bitSet.set(2);

            bitSet.clearAll();

            expect(bitSet.length).toBe(3);
        });
    });


    describe('#clearByMask()', () => {
        it(`throws if 'mask' argument is not defined`, () => {
            expect(() => bitSet.clearByMask(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.clearByMask(undefined)).toThrow(ArgumentNullException);
        });

        it(`clears corresponding bits for whose value in mask is set`, () => {
            bitSet = BitSet.fromBits([false, true, true]);

            let mask: BitSet = BitSet.fromBits([false, false, true]);

            bitSet.clearByMask(mask);

            expect(bitSet.length).toBe(3);
            expect(bitSet.get(0)).toBe(false);
            expect(bitSet.get(1)).toBe(true);
            expect(bitSet.get(2)).toBe(false);
        });
    });


    describe('#findBits()', () => {
        it(`throws if 'bitValue' argument is not defined`, () => {
            expect(() => bitSet.findBits(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.findBits(undefined)).toThrow(ArgumentNullException);
        });

        it(`returns read-only collection of set bits' indexes`, () => {
            bitSet.set(0);
            bitSet.set(2);
            bitSet.set(4);

            let setBits: ReadOnlyCollection<number> = bitSet.findBits(true);

            expect(setBits.length).toEqual(3);
            expect(setBits.contains(0)).toBe(true);
            expect(setBits.contains(2)).toBe(true);
            expect(setBits.contains(4)).toBe(true);
        });

        it(`returns read-only collection of clear bits' indexes`, () => {
            bitSet = BitSet.fromBits([true, false, true, false, true, false]);

            let clearBits: ReadOnlyCollection<number> = bitSet.findBits(false);

            expect(clearBits.length).toEqual(3);
            expect(clearBits.contains(1)).toBe(true);
            expect(clearBits.contains(3)).toBe(true);
            expect(clearBits.contains(5)).toBe(true);
        });
    });


    describe('#invert()', () => {
        it(`throws if 'bitIndex' argument is not defined`, () => {
            expect(() => bitSet.invert(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.invert(undefined)).toThrow(ArgumentNullException);
        });

        it(`throws if 'bitIndex' argument has invalid range`, () => {
            expect(() => bitSet.invert(-1)).toThrow(IndexOutOfBoundsException);
        });

        it(`inverts value if specified bit to the opposite`, () => {
            bitSet.invert(2);

            expect(bitSet.get(0)).toBe(false);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(true);
        });

        it(`increments set length if necessary`, () => {
            bitSet.invert(2);

            expect(bitSet.length).toBe(3);
        });
    });


    describe('#invertRange()', () => {
        it(`throws if any of arguments is not defined`, () => {
            expect(() => bitSet.invertRange(null, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.invertRange(0, null)).toThrow(ArgumentNullException);
            expect(() => bitSet.invertRange(null, 0)).toThrow(ArgumentNullException);
            expect(() => bitSet.invertRange(undefined, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.invertRange(0, undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.invertRange(undefined, 0)).toThrow(ArgumentNullException);
        });

        it(`throws if arguments has invalid range`, () => {
            expect(() => bitSet.invertRange(-1, 1)).toThrow(IndexOutOfBoundsException);
            expect(() => bitSet.invertRange(1, -1)).toThrow(IndexOutOfBoundsException);
        });

        it(`inverts bits' values to the opposite in specified range`, () => {
            bitSet.invertRange(0, 2);

            expect(bitSet.get(0)).toBe(true);
            expect(bitSet.get(1)).toBe(true);
            expect(bitSet.get(2)).toBe(false);
        });

        it(`increments set length if necessary`, () => {
            bitSet.invertRange(0, 2);

            expect(bitSet.length).toBe(2);
        });
    });


    describe(`#invertAll()`, () => {
        it(`inverts values of all bits in set`, () => {
            bitSet = BitSet.fromBits([false, true, true]);

            bitSet.invertAll();

            expect(bitSet.get(0)).toBe(true);
            expect(bitSet.get(1)).toBe(false);
            expect(bitSet.get(2)).toBe(false);
        });

        it(`does not change length of set`, () => {
            expect(bitSet.length).toBe(0);

            bitSet.invertAll();

            expect(bitSet.length).toBe(0);

            bitSet = BitSet.fromBits([false, true, true]);

            bitSet.invertAll();

            expect(bitSet.length).toBe(3);
        });
    });


    describe(`#indexOf()`, () => {
        it(`throws if 'bitValue' argument is not defined`, () => {
            expect(() => bitSet.indexOf(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.indexOf(undefined)).toThrow(ArgumentNullException);
        });

        it(`does not throw if 'fromIndex' argument is not defined`, () => {
            expect(() => bitSet.indexOf(true, null)).not.toThrow(ArgumentNullException);
            expect(() => bitSet.indexOf(true, undefined)).not.toThrow(ArgumentNullException);
        });

        it(`throws if 'fromIndex' argument is lower than zero`, () => {
            expect(() => bitSet.indexOf(true, -1)).toThrow(IndexOutOfBoundsException);
        });

        it(`throws if 'fromIndex' argument is out of set range`, () => {
            expect(() => bitSet.indexOf(true, 1)).toThrow(IndexOutOfBoundsException);
        });

        it(`does not throws if 'fromIndex' argument equals to zero and set length is zero too`, () => {
            expect(() => bitSet.indexOf(true, 0)).not.toThrow(IndexOutOfBoundsException);
        });

        it(`returns index of first bit with specified value`, () => {
            bitSet = BitSet.fromBits([true, false, true, false]);

            expect(bitSet.indexOf(true)).toBe(0);
            expect(bitSet.indexOf(false)).toBe(1);
            expect(bitSet.indexOf(true, 1)).toBe(2);
            expect(bitSet.indexOf(false, 2)).toBe(3);
        });
    });


    describe(`#lastIndexOf()`, () => {
        it(`throws if 'bitValue' argument is not defined`, () => {
            expect(() => bitSet.lastIndexOf(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.lastIndexOf(undefined)).toThrow(ArgumentNullException);
        });

        it(`does not throw if 'fromIndex' argument is not defined`, () => {
            expect(() => bitSet.lastIndexOf(true, null)).not.toThrow(ArgumentNullException);
            expect(() => bitSet.lastIndexOf(true, undefined)).not.toThrow(ArgumentNullException);
        });

        it(`throws if 'fromIndex' argument is lower than zero`, () => {
            expect(() => bitSet.lastIndexOf(true, -1)).toThrow(IndexOutOfBoundsException);
        });

        it(`throws if 'fromIndex' argument is out of set range`, () => {
            expect(() => bitSet.lastIndexOf(true, 1)).toThrow(IndexOutOfBoundsException);
        });

        it(`does not throws if 'fromIndex' argument equals to zero and set length is zero too`, () => {
            expect(() => bitSet.lastIndexOf(true, 0)).not.toThrow(IndexOutOfBoundsException);
        });

        it(`returns index of last bit with specified value`, () => {
            bitSet = BitSet.fromBits([true, false, true, false]);

            expect(bitSet.lastIndexOf(true)).toBe(2);
            expect(bitSet.lastIndexOf(false)).toBe(3);
            expect(bitSet.lastIndexOf(true, 1)).toBe(0);
            expect(bitSet.lastIndexOf(false, 2)).toBe(1);
        });
    });


    describe(`#and(), #or(), #xor()`, () => {
        it(`throws if 'set' argument is not defined`, () => {
            expect(() => bitSet.and(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.or(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.xor(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.and(undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.or(undefined)).toThrow(ArgumentNullException);
            expect(() => bitSet.xor(undefined)).toThrow(ArgumentNullException);
        });

        it(`performs logical AND operation`, () => {
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
        });
    });


    describe(`#intersects()`, () => {
        it(`throws if 'other' argument is not defined`, () => {
            expect(() => bitSet.intersects(null)).toThrow(ArgumentNullException);
            expect(() => bitSet.intersects(undefined)).toThrow(ArgumentNullException);
        });

        it(`determines whether sets intersects #1`, () => {
            let one: BitSet = BitSet.fromBits([true]);
            let other: BitSet = BitSet.fromBits([true, false]);

            expect(one.intersects(other)).toBe(true);
        });

        it(`determines whether sets intersects #2`, () => {
            let one: BitSet = BitSet.fromBits([false]);
            let other: BitSet = BitSet.fromBits([true, false]);

            expect(one.intersects(other)).toBe(false);
        });

        it(`determines whether sets intersects #3`, () => {
            let one: BitSet = BitSet.fromBits([]);
            let other: BitSet = BitSet.fromBits([true, false]);

            expect(one.intersects(other)).toBe(false);
        });
    });


    describe(`#toString()`, () => {
        it(`returns string representation of bit set`, () => {
            expect(bitSet.toString()).toBe(`{}`);

            bitSet = BitSet.fromBits([false]);

            expect(bitSet.toString()).toBe(`{}`);

            bitSet = BitSet.fromBits([false, true]);

            expect(bitSet.toString()).toBe(`{1}`);

            bitSet = BitSet.fromBits([true, true]);

            expect(bitSet.toString()).toBe(`{0, 1}`);
        });
    });


    describe(`#toByteArray()`, () => {
        it(`creates byte array`, () => {
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

            let bytes: IEnumerable<number> = bitSet.toByteArray();

            expect(bytes).toEqual([255, 128]);
            expect(bytes.length).toEqual(2);
        });
    });


    describe(`#fromByteArray()`, () => {
        it(`creates new bit set byte array`, () => {
            bitSet = BitSet.fromBits([
                true, true, true, true, true, true, true, true,
                false, false, false, false, false, false, false, true
            ]);

            let bytes: IEnumerable<number> = bitSet.toByteArray();

            bitSet = BitSet.fromByteArray(bytes);

            expect(bitSet.toJSON()).toEqual([
                true, true, true, true, true, true, true, true,
                false, false, false, false, false, false, false, true
            ]);
        });
    });
});
