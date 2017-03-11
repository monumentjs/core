import Collection from '../../../lib/Core/Collections/Collection';
import {ICollection} from '../../../lib/Core/Collections/ICollection';


describe('Collection', () => {
    describe('#constructor()', () => {
        it('create new instance of Collection class', () => {
            let collection: Collection<string> = null;

            expect(function () {
                collection = new Collection<string>();
            }).not.toThrow();

            expect(collection).toBeInstanceOf(Collection);
            expect(typeof collection.length).toBe('number');
        });
    });


    describe('for...of loop', () => {
        it('allow iteration', () => {
            let items: string[] = [];
            let collection: Collection<string> = new Collection<string>();

            collection.add('one');
            collection.add('two');

            expect(collection.length).toEqual(2);

            expect(function () {
                for (let name of collection) {
                    items.push(name);
                }
            }).not.toThrow();

            expect(items.length).toEqual(2);
            expect(items).toEqual(['one', 'two']);
        });


        it('allow to break iteration', () => {
            let items: string[] = [];
            let collection: Collection<string> = new Collection<string>();

            collection.add('one');
            collection.add('two');

            expect(collection.length).toEqual(2);

            expect(function () {
                for (let name of collection) {
                    if (name === 'two') {
                        break;
                    }

                    items.push(name);
                }
            }).not.toThrow();

            expect(items.length).toEqual(1);
            expect(items).toEqual(['one']);
        });


        it('[index] getter/setter', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);

            expect(collection[0]).toEqual('one');
            expect(collection[1]).toEqual('two');
            expect(collection[2]).toEqual(undefined);
        });
    });


    describe('#clone()', () => {
        it('create a copy of current instance', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);
            let clone: ICollection<string> = collection.clone();

            expect(clone).toBeInstanceOf(Collection);
            expect(clone).toBeInstanceOf(Collection);
            expect(clone.length).toEqual(2);
            expect(clone[0]).toEqual('one');
            expect(clone[1]).toEqual('two');
            expect(clone[2]).toEqual(undefined);
        });
    });


    describe('#add()', () => {
        it('add item into collection', () => {
            let collection: Collection<string> = new Collection<string>();

            expect(collection.length).toEqual(0);

            collection.add('one');

            expect(collection.length).toEqual(1);

            collection.add('two');

            expect(collection.length).toEqual(2);
        });
    });


    describe('#has()', () => {
        it('detect is collection already contains specified item', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);

            expect(collection.contains('one')).toEqual(true);
            expect(collection.contains('two')).toEqual(true);
            expect(collection.contains('three')).toEqual(false);
        });
    });


    describe('#remove()', () => {
        it('remove item from collection', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);

            expect(collection.length).toEqual(2);
            expect(collection[0]).toEqual('one');
            expect(collection[1]).toEqual('two');

            expect(collection.remove('itemThatNotInCollection')).toEqual(false);

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
        it('clear collection', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);

            collection.clear();

            expect(collection.length).toEqual(0);
            expect(collection[0]).toEqual(undefined);
            expect(collection[1]).toEqual(undefined);
        });
    });


    describe('#toJSON()', () => {
        it('return pure JS array for JSON serialization', () => {
            let collection: Collection<string> = new Collection<string>(['one', 'two']);

            expect(collection.toJSON()).toEqual(['one', 'two']);
        });
    });
});
