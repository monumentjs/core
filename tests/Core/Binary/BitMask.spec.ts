import BitMask from '../../../lib/Core/Binary/BitMask';
import List from "../../../lib/Core/Collections/List";


describe('BitMask', () => {
    let bitMask: BitMask = null;

    beforeEach(() => {
        expect(function () {
            bitMask = new BitMask(7);
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('create new instance of BitMask class', () => {
            expect(bitMask).toBeInstanceOf(BitMask);
        });
    });


    describe('#getBitAt()', () => {
        it('gets value of the bit at the given position', () => {
            expect(bitMask.value).toEqual(7);
            expect(bitMask.getBitAt(0)).toEqual(true);
            expect(bitMask.getBitAt(1)).toEqual(true);
            expect(bitMask.getBitAt(2)).toEqual(true);
            expect(bitMask.getBitAt(3)).toEqual(false);
            expect(bitMask.getBitAt(4)).toEqual(false);
        });
    });


    describe('#setBitAt()', () => {
        it('sets value of the bit at the given position to 1', () => {
            expect(bitMask.value).toEqual(7);

            bitMask.setBitAt(3, true);

            expect(bitMask.value).toEqual(15);
            expect(bitMask.getBitAt(0)).toEqual(true);
            expect(bitMask.getBitAt(1)).toEqual(true);
            expect(bitMask.getBitAt(2)).toEqual(true);
            expect(bitMask.getBitAt(3)).toEqual(true);
            expect(bitMask.getBitAt(4)).toEqual(false);

            bitMask.setBitAt(0, false);

            expect(bitMask.value).toEqual(14);
            expect(bitMask.getBitAt(0)).toEqual(false);
            expect(bitMask.getBitAt(1)).toEqual(true);
            expect(bitMask.getBitAt(2)).toEqual(true);
            expect(bitMask.getBitAt(3)).toEqual(true);
            expect(bitMask.getBitAt(4)).toEqual(false);
        });
    });


    describe('#getEnabledBitsIndexes()', () => {
        it('returns list of indexes of bits with value equal to 1', () => {
            let enabledIndexes: List<number> = bitMask.getEnabledBitsIndexes();

            expect(enabledIndexes).toBeInstanceOf(List);
            expect(enabledIndexes.length).toEqual(3);
            expect(enabledIndexes.toArray()).toEqual([0, 1, 2]);
        });
    });


    describe('#getEnabledFlags()', () => {
        it('returns list of numbers representing values of bits with value equal to 1', () => {
            let enabledFlags: List<number> = bitMask.getEnabledFlags();

            expect(enabledFlags).toBeInstanceOf(List);
            expect(enabledFlags.length).toEqual(3);
            expect(enabledFlags.toArray()).toEqual([1, 2, 4]);

            bitMask.setBitAt(3, true);
            enabledFlags = bitMask.getEnabledFlags();

            expect(enabledFlags).toBeInstanceOf(List);
            expect(enabledFlags.length).toEqual(4);
            expect(enabledFlags.toArray()).toEqual([1, 2, 4, 8]);
        });
    });


    describe('#fromFlags()', () => {
        it('creates new instance of BitMask from list of flags', () => {
            let flaggedBitMask: BitMask = BitMask.fromFlags([
                1 << 4
            ]);

            expect(flaggedBitMask).toBeInstanceOf(BitMask);
            expect(flaggedBitMask.value).toEqual(16);
        });
    });
});