import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {RangeException} from '@monument/core/main/exceptions/RangeException';
import {BitSet} from '../../main/BitSet';
import {Collection} from '../../main/Collection';


export class BitSetTest {

    @Test
    public 'constructor() create new instance of BitSet class'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.equals(bitSet.length, 0);
        assert.equals(bitSet.cardinality, 0);
    }


    @Test
    public 'get cardinality returns number of set bits'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.equals(bitSet.length, 0);
        assert.equals(bitSet.cardinality, 0);

        bitSet = BitSet.fromBits([false, false, false, false]);

        assert.equals(bitSet.length, 4);
        assert.equals(bitSet.cardinality, 0);

        bitSet = BitSet.fromBits([false, false, true, false]);

        assert.equals(bitSet.length, 4);
        assert.equals(bitSet.cardinality, 1);
    }


    @Test
    public 'get() throws if `bitIndex` argument is less than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => {
            bitSet.get(-1);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'get() returns `false` when bit index is greater than set length'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.equals(bitSet.length, 0);
        assert.false(bitSet.get(1));
    }


    @Test
    public 'get() gets value of the bit at the given position'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.setRange(0, 3);

        assert.true(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.true(bitSet.get(2));
        assert.false(bitSet.get(3));
        assert.false(bitSet.get(4));
    }


    @Test
    public 'getRange() throws if any of arguments is less than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.getRange(-1, 10), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.getRange(0, -1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'getRange() throws if left bound is greater than right bound'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.getRange(10, 9), RangeException);
    }


    @Test
    public 'getRange() returns range of bits'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(1);

        assert.equals(bitSet.length, 2);

        let slice: BitSet = bitSet.getRange(1, 2);

        assert.equals(slice.length, 1);
        assert.true(slice.get(0));
    }


    @Test
    public 'set() throws if `bitIndex` argument is less than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.set(-1), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.set(-1, true), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.set(-1, false), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'set() sets value of the bit at the given position to `true`'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(3);

        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.true(bitSet.get(3));

        bitSet.set(1);

        assert.false(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.true(bitSet.get(3));

        bitSet.set(3, false);

        assert.false(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.false(bitSet.get(3));
    }


    @Test
    public 'set() sets value of the bit at the given position to specified value'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(3);

        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.true(bitSet.get(3));

        bitSet.set(1);

        assert.false(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.true(bitSet.get(3));

        bitSet.set(3, false);

        assert.false(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
        assert.false(bitSet.get(3));
    }


    @Test
    public 'set() increments set length if necessary'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);

        assert.equals(bitSet.length, 1);

        bitSet.set(1);

        assert.equals(bitSet.length, 2);

        bitSet.set(1, false);

        assert.equals(bitSet.length, 2);
    }


    @Test
    public 'setRange() throws if any of arguments is not defined'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.setRange(0, 1, undefined);
    }


    @Test
    public 'setRange() throws if range is not valid'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.setRange(-1, 1), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.setRange(0, -1), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.setRange(1, 0), RangeException);
    }


    @Test
    public 'setAll() sets all bits to given value'(assert: Assert) {
        let bitSet: BitSet = new BitSet(3);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));

        bitSet.setAll(true);

        assert.equals(bitSet.length, 3);
        assert.true(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.true(bitSet.get(2));

        bitSet.setAll(false);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'setByMask() sets all corresponding set bits in current bit set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();
        let mask: BitSet = new BitSet(3);

        mask.set(0);
        mask.set(2);

        bitSet.setByMask(mask);

        assert.equals(bitSet.length, 3);
        assert.true(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.true(bitSet.get(2));
    }


    @Test
    public 'clear() throws if `bitIndex` argument is lower than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.clear(-1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'clear() clears bit at given position'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);

        assert.equals(bitSet.length, 3);
        assert.true(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.true(bitSet.get(2));

        bitSet.clear(0);
        bitSet.clear(2);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'clear() increases size of bit set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.clear(0);
        bitSet.clear(2);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'clearRange() throws if `fromIndex` argument is lower than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.clearRange(-1, 1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'clearRange() throws if `toIndex` argument is lower than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.clearRange(0, -1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'clearRange() clears specified amount of bits starting from given position'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);

        bitSet.clearRange(0, 1);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.true(bitSet.get(2));

        bitSet.clearRange(2, 3);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'clearRange() increases size of bit set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.clear(0);

        assert.equals(bitSet.length, 1);

        bitSet.clear(2);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'clearAll() clears all bits in set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(2);

        bitSet.clearAll();

        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'clearRange() does not decrements length of set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(2);

        bitSet.clearAll();

        assert.equals(bitSet.length, 3);
    }


    @Test
    public 'clearByMask() clears corresponding bits for whose value in mask is set'(assert: Assert) {
        let bitSet: BitSet = BitSet.fromBits([false, true, true]);
        let mask: BitSet = BitSet.fromBits([false, false, true]);

        bitSet.clearByMask(mask);

        assert.equals(bitSet.length, 3);
        assert.false(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'findBits() returns read-only collection of set bits indexes'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.set(0);
        bitSet.set(2);
        bitSet.set(4);

        let setBits: Collection<number> = bitSet.findBits(true);

        assert.equals(setBits.length, 3);
        assert.true(setBits.contains(0));
        assert.true(setBits.contains(2));
        assert.true(setBits.contains(4));
    }


    @Test
    public 'findBits() returns read-only collection of clear bits indexes'(assert: Assert) {
        let bitSet: BitSet = BitSet.fromBits([true, false, true, false, true, false]);
        let clearBits: Collection<number> = bitSet.findBits(false);

        assert.equals(clearBits.length, 3);
        assert.true(clearBits.contains(1));
        assert.true(clearBits.contains(3));
        assert.true(clearBits.contains(5));
    }


    @Test
    public 'invert() throws if `bitIndex` argument has invalid range'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.invert(-1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'invert() inverts value if specified bit to the opposite'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.invert(2);

        assert.false(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.true(bitSet.get(2));
    }


    @Test
    public 'invert() increments set length if necessary'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.invert(2);

        assert.equals(bitSet.length, 3);
    }


    @Test
    public 'invertRange() throws if arguments has invalid range'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.invertRange(-1, 1), ArgumentIndexOutOfBoundsException);
        assert.throws(() => bitSet.invertRange(1, -1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'invertRange() inverts bits values to the opposite in specified range'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.invertRange(0, 2);

        assert.true(bitSet.get(0));
        assert.true(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'invertRange() increments set length if necessary'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.invertRange(0, 2);

        assert.equals(bitSet.length, 2);
    }


    @Test
    public 'invertAll() inverts values of all bits in set'(assert: Assert) {
        let bitSet: BitSet = BitSet.fromBits([false, true, true]);

        bitSet.invertAll();

        assert.true(bitSet.get(0));
        assert.false(bitSet.get(1));
        assert.false(bitSet.get(2));
    }


    @Test
    public 'invertAll() does not change length of set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.equals(bitSet.length, 0);

        bitSet.invertAll();

        assert.equals(bitSet.length, 0);

        bitSet = BitSet.fromBits([false, true, true]);

        bitSet.invertAll();

        assert.equals(bitSet.length, 3);
    }


    @Test
    public 'indexOf() does not throw if `fromIndex` argument is not defined'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.indexOf(true, undefined);
    }


    @Test
    public 'indexOf() throws if `fromIndex` argument is lower than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.indexOf(true, -1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'indexOf() throws if `fromIndex` argument is out of set range'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.indexOf(true, 1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'indexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.indexOf(true, 0);
    }


    @Test
    public 'indexOf() returns index of first bit with specified value'(assert: Assert) {
        let bitSet: BitSet = BitSet.fromBits([true, false, true, false]);

        assert.equals(bitSet.indexOf(true), 0);
        assert.equals(bitSet.indexOf(false), 1);
        assert.equals(bitSet.indexOf(true, 1), 2);
        assert.equals(bitSet.indexOf(false, 2), 3);
    }


    @Test
    public 'lastIndexOf() does not throw if `fromIndex` argument is not defined'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.lastIndexOf(true, undefined);
    }


    @Test
    public 'lastIndexOf() throws if `fromIndex` argument is lower than zero'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.lastIndexOf(true, -1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'lastIndexOf() throws if `fromIndex` argument is out of set range'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.throws(() => bitSet.lastIndexOf(true, 1), ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'lastIndexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        bitSet.lastIndexOf(true, 0);
    }


    @Test
    public 'lastIndexOf() returns index of last bit with specified value'(assert: Assert) {
        let bitSet: BitSet = BitSet.fromBits([true, false, true, false]);

        assert.equals(bitSet.lastIndexOf(true), 2);
        assert.equals(bitSet.lastIndexOf(false), 3);
        assert.equals(bitSet.lastIndexOf(true, 1), 0);
        assert.equals(bitSet.lastIndexOf(false, 2), 1);
    }


    @Test
    public 'and(), or(), xor() performs logical AND operation'(assert: Assert) {
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

        assert.identical(bits2.findBits(true).toArray(), [2, 4, 6, 8, 12, 14]);

        bits2.or(bits1);

        assert.identical(bits2.findBits(true).toArray(), [0, 2, 4, 6, 8, 10, 12, 14]);

        bits2.xor(bits1);

        assert.identical(bits2.findBits(true).toArray(), []);
    }


    @Test
    public 'intersects() determines whether sets intersects 1'(assert: Assert) {
        let one: BitSet = BitSet.fromBits([true]);
        let other: BitSet = BitSet.fromBits([true, false]);

        assert.true(one.intersects(other));
    }


    @Test
    public 'intersects() determines whether sets intersects 2'(assert: Assert) {
        let one: BitSet = BitSet.fromBits([false]);
        let other: BitSet = BitSet.fromBits([true, false]);

        assert.false(one.intersects(other));
    }


    @Test
    public 'intersects() determines whether sets intersects 3'(assert: Assert) {
        let one: BitSet = BitSet.fromBits([]);
        let other: BitSet = BitSet.fromBits([true, false]);

        assert.false(one.intersects(other));
    }


    @Test
    public 'toString() returns string representation of bit set'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.equals(bitSet.toString(), `{}`);

        bitSet = BitSet.fromBits([false]);

        assert.equals(bitSet.toString(), `{}`);

        bitSet = BitSet.fromBits([false, true]);

        assert.equals(bitSet.toString(), `{1}`);

        bitSet = BitSet.fromBits([true, true]);

        assert.equals(bitSet.toString(), `{0, 1}`);
    }


    @Test
    public 'toByteArray() creates byte array'(assert: Assert) {
        let bitSet: BitSet = new BitSet();

        assert.identical(bitSet.toByteArray(), []);

        bitSet = BitSet.fromBits([false]);

        assert.identical(bitSet.toByteArray(), [0]);

        bitSet = BitSet.fromBits([false, true]);

        assert.identical(bitSet.toByteArray(), [2]);

        bitSet = BitSet.fromBits([true, true]);

        assert.identical(bitSet.toByteArray(), [3]);

        bitSet = BitSet.fromBits([
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);

        let bytes = bitSet.toByteArray();

        assert.identical(bytes, [255, 128]);
        assert.equals(bytes.length, 2);
    }


    @Test
    public 'equals() creates new bit set byte array'(assert: Assert) {

        let bitSet: BitSet = BitSet.fromBits([
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);

        let bytes = bitSet.toByteArray();

        bitSet = BitSet.fromByteArray(bytes);

        assert.identical(bitSet.toJSON(), [
            true, true, true, true, true, true, true, true,
            false, false, false, false, false, false, false, true
        ]);
    }
}
