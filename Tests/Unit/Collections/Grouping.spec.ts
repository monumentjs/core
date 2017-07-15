import {Grouping} from '../../../Source/Collections/Grouping';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';


describe(`Grouping`, () => {
    let instance: Grouping<string, string>;

    describe(`#constructor()`, () => {
        it(`throws if 'key' argument is not defined`, () => {
            expect(() => {
                instance = new Grouping<string, string>(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'key' argument is null`, () => {
            expect(() => {
                instance = new Grouping<string, string>(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'items' argument is null`, () => {
            expect(() => {
                instance = new Grouping<string, string>('fruits', null);
            }).toThrowError(ArgumentNullException);
        });

        it(`creates new instance empty`, () => {
            instance = new Grouping<string, string>('fruits');

            expect(instance.key).toBe('fruits');
            expect(instance.length).toBe(0);
        });

        it(`creates new instance with items`, () => {
            instance = new Grouping<string, string>('fruits', ['apple', 'banana']);

            expect(instance.key).toBe('fruits');
            expect(instance.length).toBe(2);
            expect(instance[0]).toBe('apple');
            expect(instance[1]).toBe('banana');
        });
    });

});
