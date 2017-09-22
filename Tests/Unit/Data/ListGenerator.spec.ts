import {ListGenerator} from '../../../Source/Data/Generation/ListGenerator';
import {IList} from '../../../Source/Collections/Abstraction/IList';
import {RangeException} from '../../../Source/Exceptions/RangeException';
import {ArgumentRangeException} from '../../../Source/Exceptions/ArgumentRangeException';


describe(`ListGenerator`, () => {

    describe(`repeat()`, () => {
        it(`returns new list containing specified amount of generated items`, () => {
            let list: IList<number> = ListGenerator.repeat(1, 3);

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual([1, 1, 1]);
        });
    });


    describe(`generate()`, () => {
        it(`throws if 'length' argument is out of bounds`, () => {
            expect(() => {
                ListGenerator.generate(() => 1, -1);
            }).toThrowError(ArgumentRangeException);
        });

        it(`returns new list containing specified amount of generated items`, () => {
            let numbers = ListGenerator.generate((index) => index, 3);

            expect(numbers.length).toBe(3);
            expect(numbers[0]).toBe(0);
            expect(numbers[1]).toBe(1);
            expect(numbers[2]).toBe(2);
        });
    });


    describe(`range()`, () => {
        it(`throws if range bounds are invalid`, () => {
            expect(() => {
                ListGenerator.range(0, -1);
            }).toThrowError(RangeException);
        });

        it(`returns new list containing specified amount of generated items`, () => {
            let numbers = ListGenerator.range(0, 3);

            expect(numbers.length).toBe(3);
            expect(numbers[0]).toBe(0);
            expect(numbers[1]).toBe(1);
            expect(numbers[2]).toBe(2);
        });
    });
});
