import { EqualsFunction } from '@monument/core';
import { RangeException } from '@monument/exceptions';
import {
  BitSet,
  IndexOutOfBoundsException,
  IterableEqualsFactory
} from '../../../index';

describe('BitSet', function() {
  const iterableEqualityComparator: EqualsFunction<Iterable<number | boolean>> = IterableEqualsFactory();

  it('constructor() create new instance of BitSet class', function() {
    const bitSet: BitSet = new BitSet();

    expect(bitSet.length).toBe(0);
    expect(bitSet.cardinality).toBe(0);
  });

  it('get cardinality returns number of set bits', function() {
    let bitSet: BitSet = new BitSet();

    expect(bitSet.length).toBe(0);
    expect(bitSet.cardinality).toBe(0);

    bitSet = BitSet.fromBits([false, false, false, false]);

    expect(bitSet.length).toBe(4);
    expect(bitSet.cardinality).toBe(0);

    bitSet = BitSet.fromBits([false, false, true, false]);

    expect(bitSet.length).toBe(4);
    expect(bitSet.cardinality).toBe(1);
  });

  it('get() throws if `bitIndex` argument is less than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.get(-1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('get() returns `false` when bit index is greater than set length', function() {
    const bitSet: BitSet = new BitSet();

    expect(bitSet.length).toBe(0);
    expect(bitSet.get(1)).toBe(false);
  });

  it('get() gets value of the bit at the given position', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.setRange(0, 3);

    expect(bitSet.get(0)).toBe(true);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(true);
    expect(bitSet.get(3)).toBe(false);
    expect(bitSet.get(4)).toBe(false);
  });

  it('getRange() throws if any of arguments is less than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.getRange(-1, 10);
    }).toThrow(IndexOutOfBoundsException);
    expect(() => {
      bitSet.getRange(0, -1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('getRange() throws if left bound is greater than right bound', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.getRange(10, 9);
    }).toThrow(RangeException);
  });

  it('getRange() returns range of bits', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(1);

    expect(bitSet.length).toBe(2);

    const slice: BitSet = bitSet.getRange(1, 2);

    expect(slice.length).toBe(1);
    expect(slice.get(0)).toBe(true);
  });

  it('set() throws if `bitIndex` argument is less than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.set(-1)).toThrow(IndexOutOfBoundsException);
    expect(() => bitSet.set(-1, true)).toThrow(IndexOutOfBoundsException);
    expect(() => bitSet.set(-1, false)).toThrow(IndexOutOfBoundsException);
  });

  it('set() sets value of the bit at the given position to `true`', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(3);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(true);

    bitSet.set(1);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(true);

    bitSet.set(3, false);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(false);
  });

  it('set() sets value of the bit at the given position to specified value', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(3);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(true);

    bitSet.set(1);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(true);

    bitSet.set(3, false);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
    expect(bitSet.get(3)).toBe(false);
  });

  it('set() increments set length if necessary', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(0);

    expect(bitSet.length).toBe(1);

    bitSet.set(1);

    expect(bitSet.length).toBe(2);

    bitSet.set(1, false);

    expect(bitSet.length).toBe(2);
  });

  it('setRange() throws if any of arguments is not defined', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.setRange(0, 1, undefined);
  });

  it('setRange() throws if range is not valid', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.setRange(-1, 1)).toThrow(IndexOutOfBoundsException);
    expect(() => bitSet.setRange(0, -1)).toThrow(IndexOutOfBoundsException);
    expect(() => bitSet.setRange(1, 0)).toThrow(RangeException);
  });

  it('setAll() sets all bits to given value', function() {
    const bitSet: BitSet = new BitSet(3);

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

  it('setByMask() sets all corresponding set bits in current bit set', function() {
    const bitSet: BitSet = new BitSet();
    const mask: BitSet = new BitSet(3);

    mask.set(0);
    mask.set(2);

    bitSet.setByMask(mask);

    expect(bitSet.length).toBe(3);
    expect(bitSet.get(0)).toBe(true);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(true);
  });

  it('clear() throws if `bitIndex` argument is lower than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.clear(-1)).toThrow(IndexOutOfBoundsException);
  });

  it('clear() clears bit at given position', function() {
    const bitSet: BitSet = new BitSet();

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

  it('clear() increases size of bit set', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.clear(0);
    bitSet.clear(2);

    expect(bitSet.length).toBe(3);
    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
  });

  it('clearRange() throws if `fromIndex` argument is lower than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.clearRange(-1, 1)).toThrow(IndexOutOfBoundsException);
  });

  it('clearRange() throws if `toIndex` argument is lower than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.clearRange(0, -1)).toThrow(IndexOutOfBoundsException);
  });

  it('clearRange() clears specified amount of bits starting from given position', function() {
    const bitSet: BitSet = new BitSet();

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

  it('clearRange() increases size of bit set', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.clear(0);

    expect(bitSet.length).toBe(1);

    bitSet.clear(2);

    expect(bitSet.length).toBe(3);
    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
  });

  it('clearAll() clears all bits in set', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(2);

    bitSet.clearAll();

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
  });

  it('clearRange() does not decrements length of set', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(2);

    bitSet.clearAll();

    expect(bitSet.length).toBe(3);
  });

  it('clearByMask() clears corresponding bits for whose value in mask is set', function() {
    const bitSet: BitSet = BitSet.fromBits([false, true, true]);
    const mask: BitSet = BitSet.fromBits([false, false, true]);

    bitSet.clearByMask(mask);

    expect(bitSet.length).toBe(3);
    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
  });

  it('findBits() returns read-only collection of set bits indexes', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.set(0);
    bitSet.set(2);
    bitSet.set(4);

    const setBits: number[] = [...bitSet.findBits(true)];

    expect(setBits.length).toBe(3);
    expect(setBits).toContain(0);
    expect(setBits).toContain(2);
    expect(setBits).toContain(4);
  });

  it('findBits() returns read-only collection of clear bits indexes', function() {
    const bitSet: BitSet = BitSet.fromBits([true, false, true, false, true, false]);
    const clearBits: number[] = [...bitSet.findBits(false)];

    expect(clearBits.length).toBe(3);
    expect(clearBits).toContain(1);
    expect(clearBits).toContain(3);
    expect(clearBits).toContain(5);
  });

  it('invert() throws if `bitIndex` argument has invalid range', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.invert(-1)).toThrow(IndexOutOfBoundsException);
  });

  it('invert() inverts value if specified bit to the opposite', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.invert(2);

    expect(bitSet.get(0)).toBe(false);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(true);
  });

  it('invert() increments set length if necessary', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.invert(2);

    expect(bitSet.length).toBe(3);
  });

  it('invertRange() throws if arguments has invalid range', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => bitSet.invertRange(-1, 1)).toThrow(IndexOutOfBoundsException);
    expect(() => bitSet.invertRange(1, -1)).toThrow(IndexOutOfBoundsException);
  });

  it('invertRange() inverts bits values to the opposite in specified range', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.invertRange(0, 2);

    expect(bitSet.get(0)).toBe(true);
    expect(bitSet.get(1)).toBe(true);
    expect(bitSet.get(2)).toBe(false);
  });

  it('invertRange() increments set length if necessary', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.invertRange(0, 2);

    expect(bitSet.length).toBe(2);
  });

  it('invertAll() inverts values of all bits in set', function() {
    const bitSet: BitSet = BitSet.fromBits([false, true, true]);

    bitSet.invertAll();

    expect(bitSet.get(0)).toBe(true);
    expect(bitSet.get(1)).toBe(false);
    expect(bitSet.get(2)).toBe(false);
  });

  it('invertAll() does not change length of set', function() {
    let bitSet: BitSet = new BitSet();

    expect(bitSet.length).toBe(0);

    bitSet.invertAll();

    expect(bitSet.length).toBe(0);

    bitSet = BitSet.fromBits([false, true, true]);

    bitSet.invertAll();

    expect(bitSet.length).toBe(3);
  });

  it('indexOf() does not throw if `fromIndex` argument is not defined', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.indexOf(true, undefined);
  });

  it('indexOf() throws if `fromIndex` argument is lower than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.indexOf(true, -1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('indexOf() throws if `fromIndex` argument is out of set range', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.indexOf(true, 1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('indexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.indexOf(true, 0);
  });

  it('indexOf() returns index of first bit with specified value', function() {
    const bitSet: BitSet = BitSet.fromBits([true, false, true, false]);

    expect(bitSet.indexOf(true)).toBe(0);
    expect(bitSet.indexOf(false)).toBe(1);
    expect(bitSet.indexOf(true, 1)).toBe(2);
    expect(bitSet.indexOf(false, 2)).toBe(3);
  });

  it('lastIndexOf() does not throw if `fromIndex` argument is not defined', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.lastIndexOf(true, undefined);
  });

  it('lastIndexOf() throws if `fromIndex` argument is lower than zero', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.lastIndexOf(true, -1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('lastIndexOf() throws if `fromIndex` argument is out of set range', function() {
    const bitSet: BitSet = new BitSet();

    expect(() => {
      bitSet.lastIndexOf(true, 1);
    }).toThrow(IndexOutOfBoundsException);
  });

  it('lastIndexOf() does not throws if `fromIndex` argument equals to zero and set length is zero too', function() {
    const bitSet: BitSet = new BitSet();

    bitSet.lastIndexOf(true, 0);
  });

  it('lastIndexOf() returns index of last bit with specified value', function() {
    const bitSet: BitSet = BitSet.fromBits([true, false, true, false]);

    expect(bitSet.lastIndexOf(true)).toBe(2);
    expect(bitSet.lastIndexOf(false)).toBe(3);
    expect(bitSet.lastIndexOf(true, 1)).toBe(0);
    expect(bitSet.lastIndexOf(false, 2)).toBe(1);
  });

  it('and(), or(), xor() performs logical AND operation', function() {
    const bits1: BitSet = new BitSet(16);
    const bits2: BitSet = new BitSet(16);

    // set some bits

    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) {
        bits1.set(i);
      }

      if (i % 5 !== 0) {
        bits2.set(i);
      }
    }

    bits2.and(bits1);

    expect(iterableEqualityComparator(bits2.findBits(true), [2, 4, 6, 8, 12, 14])).toBe(true);

    bits2.or(bits1);

    expect(iterableEqualityComparator(bits2.findBits(true), [0, 2, 4, 6, 8, 10, 12, 14])).toBe(true);

    bits2.xor(bits1);

    expect(iterableEqualityComparator(bits2.findBits(true), [])).toBe(true);
  });

  it('intersects() determines whether sets intersects 1', function() {
    const one: BitSet = BitSet.fromBits([true]);
    const other: BitSet = BitSet.fromBits([true, false]);

    expect(one.intersects(other)).toBe(true);
  });

  it('intersects() determines whether sets intersects 2', function() {
    const one: BitSet = BitSet.fromBits([false]);
    const other: BitSet = BitSet.fromBits([true, false]);

    expect(one.intersects(other)).toBe(false);
  });

  it('intersects() determines whether sets intersects 3', function() {
    const one: BitSet = BitSet.fromBits([]);
    const other: BitSet = BitSet.fromBits([true, false]);

    expect(one.intersects(other)).toBe(false);
  });

  it('toString() returns string representation of bit set', function() {
    let bitSet: BitSet = new BitSet();

    expect(bitSet.toString()).toBe(`{}`);

    bitSet = BitSet.fromBits([false]);

    expect(bitSet.toString()).toBe(`{}`);

    bitSet = BitSet.fromBits([false, true]);

    expect(bitSet.toString()).toBe(`{1}`);

    bitSet = BitSet.fromBits([true, true]);

    expect(bitSet.toString()).toBe(`{0, 1}`);
  });

  it('toByteArray() creates byte array', function() {
    let bitSet: BitSet = new BitSet();

    expect(bitSet.toByteArray()).toEqual([]);

    bitSet = BitSet.fromBits([false]);

    expect(bitSet.toByteArray()).toEqual([0]);

    bitSet = BitSet.fromBits([false, true]);

    expect(bitSet.toByteArray()).toEqual([2]);

    bitSet = BitSet.fromBits([true, true]);

    expect(bitSet.toByteArray()).toEqual([3]);

    bitSet = BitSet.fromBits([true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true]);

    const bytes = bitSet.toByteArray();

    expect(bytes).toEqual([255, 128]);
    expect(bytes.length).toBe(2);
  });

  it('equals() creates new bit set byte array', function() {
    let bitSet: BitSet = BitSet.fromBits([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);

    const bytes = bitSet.toByteArray();

    bitSet = BitSet.fromByteArray(bytes);

    expect(bitSet.toJSON()).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
  });
});
