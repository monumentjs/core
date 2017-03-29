import Collection from '../../../../lib/Core/Collections/Collection';
import ArgumentNullException from '../../../../lib/Core/Exceptions/ArgumentNullException';
import InvalidOperationException from '../../../../lib/Core/Exceptions/InvalidOperationException';


describe('Collection', () => {
    let collection: Collection<string> = null;


    beforeEach(() => {
        expect(function () {
            collection = new Collection<string>();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
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

        it(`throws if given list is not defined`, () => {
            expect(() => {
                return new Collection(null);
            }).toThrowError(ArgumentNullException);
        });
    });


    describe('for...of loop', () => {
        it('allows iteration', () => {
            let items: string[] = ['one', 'two'];

            collection = new Collection(items);

            expect(function () {
                let index = 0;

                for (let name of collection) {
                    expect(name).toBe(items[index]);

                    index += 1;
                }
            }).not.toThrow();
        });

        it('allows to break iteration', () => {
            let items: string[] = ['one', 'two'];
            let step: number = 0;

            collection = new Collection(items);

            expect(function () {
                for (let name of collection) {
                    if (name === 'two') {
                        break;
                    }

                    step += 1;
                }
            }).not.toThrow();

            expect(step).toEqual(1);
        });
    });


    describe('[index] getter/setter', () => {
        it(`gets item by index`, () => {
            collection = new Collection(['one', 'two']);

            expect(collection[0]).toEqual('one');
            expect(collection[1]).toEqual('two');
            expect(collection[2]).toEqual(undefined);
            expect(collection.length).toBe(2);
        });

        it(`sets item by index`, () => {
            collection = new Collection(['one', 'two']);

            collection[0] = 'three';

            expect(collection[0]).toEqual('three');
            expect(collection[1]).toEqual('two');
            expect(collection.length).toBe(2);
        });

        it(`does not update 'length' property because is's impossible to track that operation`, () => {
            // At the moment this is the expected behavior.
            // You should avoid using custom collections this way.
            // Instead, please use such methods like 'add', 'insert' etc.

            collection[0] = 'one';

            expect(collection.length).toBe(0);
            expect(collection[0]).toBe('one');
        });
    });


    describe('#clone()', () => {
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


    describe('#add()', () => {
        it(`throws if collection is read-only`, () => {
            Collection.setReadOnly(collection, true);

            expect(() => {
                collection.add('one');
            }).toThrowError(InvalidOperationException);
        });

        it('adds item into collection', () => {
            expect(collection.length).toEqual(0);

            collection.add('one');

            expect(collection.length).toEqual(1);

            collection.add('two');

            expect(collection.length).toEqual(2);
        });
    });


    describe('#contains()', () => {
        it('detect is collection already contains specified item', () => {
            collection = new Collection(['one', 'two']);

            expect(collection.contains('one')).toEqual(true);
            expect(collection.contains('two')).toEqual(true);
            expect(collection.contains('three')).toEqual(false);
        });
    });


    describe('#remove()', () => {
        it(`throws if collection is read-only`, () => {
            Collection.setReadOnly(collection, true);

            expect(() => {
                collection.remove('one');
            }).toThrowError(InvalidOperationException);
        });

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


    describe('#clear()', () => {
        it(`throws if collection is read-only`, () => {
            Collection.setReadOnly(collection, true);

            expect(() => {
                collection.clear();
            }).toThrowError(InvalidOperationException);
        });

        it('clear collection', () => {
            collection = new Collection(['one', 'two']);

            collection.clear();

            expect(collection.length).toEqual(0);
            expect(collection[0]).toEqual(undefined);
            expect(collection[1]).toEqual(undefined);
        });
    });


    describe('#toJSON()', () => {
        it('return pure JS array for JSON serialization', () => {
            collection = new Collection(['one', 'two']);

            expect(collection.toJSON()).toBeInstanceOf(Array);
            expect(collection.toJSON()).toEqual(['one', 'two']);
        });
    });
});
