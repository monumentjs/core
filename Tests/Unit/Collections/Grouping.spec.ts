import {Grouping} from '../../../Source/Collections/Grouping';


describe(`Grouping`, () => {
    let instance: Grouping<string, string>;

    describe(`constructor()`, () => {
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
