import {Collection} from '../../../Source/Collections/Collection';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';


describe('Collection', () => {
    let collection: Collection<string>;


    beforeEach(() => {
        expect(function () {
            collection = new Collection<string>();
        }).not.toThrow();
    });


    describe('constructor()', () => {
        it('creates new empty collection', () => {
            expect(collection).toBeInstanceOf(Collection);
            expect(collection.length).toBe(0);
        });

        it('creates new collection from existing list', () => {
            expect(() => {
                collection = new Collection(['one', 'two']);
            }).not.toThrow();

            expect(collection.length).toBe(2);
            expect(collection[0]).toBe('one');
            expect(collection[1]).toBe('two');
        });
    });


    describe('clone()', () => {
        it('creates a copy of collection', () => {
            let clone: Collection<string>;

            collection = new Collection(['one', 'two']);

            clone = collection.clone();

            expect(clone).toBeInstanceOf(Collection);
            expect(clone.length).toEqual(2);
            expect(clone[0]).toEqual('one');
            expect(clone[1]).toEqual('two');
        });
    });


    describe('add()', () => {
        it('adds item into collection', () => {
            expect(collection.length).toEqual(0);

            collection.add('one');

            expect(collection.length).toEqual(1);

            collection.add('two');

            expect(collection.length).toEqual(2);
        });
    });


    describe('contains()', () => {
        it(`throws if 'comparator' argument is null`, () => {
            expect(() => {
                collection.contains('one', undefined);
            }).not.toThrowError(ArgumentNullException);
        });

        it('detect is collection already contains specified item', () => {
            collection = new Collection(['one', 'two']);

            expect(collection.contains('one')).toEqual(true);
            expect(collection.contains('two')).toEqual(true);
            expect(collection.contains('three')).toEqual(false);
        });

        it('determines whether collection already contains specified item using custom equality comparator', () => {
            collection = new Collection(['one', 'two', 'THREE']);

            expect(collection.contains('One', IgnoreCaseComparator.instance)).toEqual(true);
            expect(collection.contains('TWO', IgnoreCaseComparator.instance)).toEqual(true);
            expect(collection.contains('three', IgnoreCaseComparator.instance)).toEqual(true);
        });
    });


    describe('remove()', () => {
        it(`returns 'false' if collection does not contains the item`, () => {
            expect(collection.remove('itemThatNotInCollection')).toEqual(false);
        });

        it(`returns 'true' if item was removed from collection`, () => {
            collection = new Collection(['one', 'two']);

            expect(collection.remove('two')).toEqual(true);
            expect(collection.length).toEqual(1);
            expect(collection[0]).toEqual('one');
            expect(collection[1]).toEqual(undefined);

            expect(collection.remove('one')).toEqual(true);
            expect(collection.length).toEqual(0);
            expect(collection[0]).toEqual(undefined);
            expect(collection[1]).toEqual(undefined);
        });
    });


    describe(`removeAll()`, () => {
        it(`removes items containing in both lists`, () => {
            collection = new Collection(['a', 'b', 'a', 'c', 'd', 'a']);

            collection.removeAll(['a', 'b']);

            expect(collection.length).toBe(2);
            expect(collection.toArray()).toEqual(['c', 'd']);
        });

        it(`removes items containing in both lists using custom equality comparator`, () => {
            collection = new Collection(['a', 'b', 'a', 'c', 'd', 'a']);

            collection.removeAll(['A', 'B']);

            expect(collection.length).toBe(6);

            collection.removeAll(['A', 'B'], IgnoreCaseComparator.instance);

            expect(collection.length).toBe(2);
            expect(collection.toArray()).toEqual(['c', 'd']);
        });
    });


    describe(`removeBy()`, () => {
        it(`removes items for whose predicate function returns 'true'`, () => {
            collection = new Collection(['a', 'b', 'a', 'c', 'd', 'a']);

            collection.removeBy((character: string): boolean => {
                return character === 'a';
            });

            expect(collection.length).toBe(3);
            expect(collection.toArray()).toEqual(['b', 'c', 'd']);
        });
    });


    describe(`retainAll()`, () => {
        it(`accepts empty lists`, () => {
            collection.addAll(['one', 'two', 'three', 'four', 'five']);

            expect(collection.retainAll([])).toBe(true);

            expect(collection.length).toBe(0);
            expect(collection.toArray()).toEqual([]);
        });

        it(`removes all items except those in specified list`, () => {
            collection.addAll(['one', 'two', 'three', 'One', 'Two', 'Three']);

            expect(collection.retainAll(['one', 'Three'])).toBe(true);

            expect(collection.length).toBe(2);
            expect(collection.toArray()).toEqual(['one', 'Three']);
        });

        it(`uses custom equality comparator`, () => {
            collection.addAll(['one', 'two', 'three', 'One', 'Two', 'Three']);

            expect(collection.retainAll(['one', 'Three'], IgnoreCaseComparator.instance)).toBe(true);

            expect(collection.length).toBe(4);
            expect(collection.toArray()).toEqual(['one', 'three', 'One', 'Three']);
        });
    });


    describe('clear()', () => {
        it('clears collection', () => {
            collection = new Collection(['one', 'two']);

            collection.clear();

            expect(collection.length).toEqual(0);
            expect(collection[0]).toEqual(undefined);
            expect(collection[1]).toEqual(undefined);
        });
    });
});
