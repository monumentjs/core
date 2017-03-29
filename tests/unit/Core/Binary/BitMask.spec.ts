import BitMask from '../../../../lib/Core/Binary/BitMask';
import ReadOnlyCollection from '../../../../lib/Core/Collections/ReadOnlyCollection';


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
            expect(bitMask.toNumber()).toEqual(7);
            expect(bitMask.get(0)).toEqual(true);
            expect(bitMask.get(1)).toEqual(true);
            expect(bitMask.get(2)).toEqual(true);
            expect(bitMask.get(3)).toEqual(false);
            expect(bitMask.get(4)).toEqual(false);
        });
    });


    describe('#setBitAt()', () => {
        it('sets value of the bit at the given position to 1', () => {
            expect(bitMask.toNumber()).toEqual(7);

            bitMask.set(3, true);

            expect(bitMask.toNumber()).toEqual(15);
            expect(bitMask.get(0)).toEqual(true);
            expect(bitMask.get(1)).toEqual(true);
            expect(bitMask.get(2)).toEqual(true);
            expect(bitMask.get(3)).toEqual(true);
            expect(bitMask.get(4)).toEqual(false);

            bitMask.set(0, false);

            expect(bitMask.toNumber()).toEqual(14);
            expect(bitMask.get(0)).toEqual(false);
            expect(bitMask.get(1)).toEqual(true);
            expect(bitMask.get(2)).toEqual(true);
            expect(bitMask.get(3)).toEqual(true);
            expect(bitMask.get(4)).toEqual(false);
        });
    });


    describe('#getEnabledBitsIndexes()', () => {
        it('returns list of indexes of bits with value equal to 1', () => {
            let enabledIndexes: ReadOnlyCollection<number> = bitMask.getEnabledBitsIndexes();

            expect(enabledIndexes).toBeInstanceOf(ReadOnlyCollection);
            expect(enabledIndexes.length).toEqual(3);
            expect(enabledIndexes.toArray()).toEqual([0, 1, 2]);
        });
    });


    describe('#getEnabledFlags()', () => {
        it('returns list of numbers representing values of bits with value equal to 1', () => {
            let enabledFlags: ReadOnlyCollection<number> = bitMask.getEnabledFlags();

            expect(enabledFlags).toBeInstanceOf(ReadOnlyCollection);
            expect(enabledFlags.length).toEqual(3);
            expect(enabledFlags.toArray()).toEqual([1, 2, 4]);

            bitMask.set(3, true);
            enabledFlags = bitMask.getEnabledFlags();

            expect(enabledFlags).toBeInstanceOf(ReadOnlyCollection);
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
            expect(flaggedBitMask.toNumber()).toEqual(16);
        });
    });
});