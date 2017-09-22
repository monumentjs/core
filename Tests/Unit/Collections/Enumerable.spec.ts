import {Enumerable} from '../../../Source/Collections/Enumerable';
import {TestEnumerable} from './Mocks/TestEnumerable';


describe(`Enumerable`, () => {
    let instance: Enumerable<string>;


    beforeEach(() => {
        instance = new Enumerable<string>(['one', 'two', 'three']);
    });


    describe(`constructor()`, () => {
        it(`creates new instance of Enumerable`, () => {
            expect(instance).toBeInstanceOf(Enumerable);
        });

        it(`creates empty list`, () => {
            let list: Enumerable<string> = new Enumerable<string>();

            expect(list.length).toBe(0);
        });
    });


    describe('[index] getter/setter', () => {
        it(`gets item by index`, () => {
            expect(instance[0]).toEqual('one');
            expect(instance[1]).toEqual('two');
            expect(instance[2]).toEqual('three');
            expect(instance[3]).toEqual(undefined);
            expect(instance.length).toBe(3);
        });

        it(`sets item by index`, () => {
            instance[0] = 'three';

            expect(instance[0]).toEqual('three');
            expect(instance[1]).toEqual('two');
            expect(instance[2]).toEqual('three');
            expect(instance.length).toBe(3);
        });

        it(`does not update 'length' property because is's impossible to track that operation`, () => {
            // At the moment it's expected behavior.
            // You should avoid using custom collections this way.
            // Instead, please use such methods like 'add', 'insert' etc.

            instance[3] = 'four';

            expect(instance.length).toBe(3);
            expect(instance[3]).toBe('four');
        });
    });


    describe('for...of loop', () => {
        it('allows iteration', () => {
            let index: number = 0;

            for (let name of instance) {
                expect(name).toBe(instance[index]);

                index += 1;
            }
        });

        it('allows to break iteration', () => {
            let index: number = 0;

            for (let name of instance) {
                if (name === 'two') {
                    break;
                }

                index += 1;
            }

            expect(index).toEqual(1);
        });
    });


    describe(`getIterator()`, () => {
        it(`overwrites default behavior of iteration`, () => {
            let items: TestEnumerable = new TestEnumerable(['one', 'two', 'three']);
            let iteratorCallback = jest.fn();

            expect(items[0]).toBe('one');
            expect(items[1]).toBe('two');
            expect(items[2]).toBe('three');

            for (let word of items) {
                iteratorCallback(word);
            }

            expect(iteratorCallback).toHaveBeenCalledTimes(3);
            expect(iteratorCallback.mock.calls[0]).toEqual(['test-one']);
            expect(iteratorCallback.mock.calls[1]).toEqual(['test-two']);
            expect(iteratorCallback.mock.calls[2]).toEqual(['test-three']);
        });
    });


    describe('toJSON()', () => {
        it('returns pure JS array for JSON serialization', () => {
            expect(instance.toJSON()).toBeInstanceOf(Array);
            expect(instance.toJSON()).toEqual(['one', 'two', 'three']);
        });
    });


    describe('toArray()', () => {
        it('returns pure JS array', () => {
            expect(instance.toJSON()).toBeInstanceOf(Array);
            expect(instance.toJSON()).toEqual(['one', 'two', 'three']);
        });
    });
});
